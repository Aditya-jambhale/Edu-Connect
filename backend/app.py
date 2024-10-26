from flask import Flask, render_template, jsonify, request
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from dotenv import load_dotenv
import os
from datetime import timedelta
from routes.upload_image import upload_bp
from routes.user_routes import user_bp
from routes.professional_routes import professional_bp
from routes.quiz_routes import quiz_bp
from routes.career_path_routes import career_bp
from routes.ai_routes import ai_routes
from studdybuddy.chatbot import StudyBuddyChatbot
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from genai.chatl import generate_response

load_dotenv()

app = Flask(__name__)

# Comprehensive CORS configuration
cors = CORS(app, resources={
    r"/*": {
        "origins": ["http://127.0.0.1:3000"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization", "Access-Control-Allow-Credentials"],
        "supports_credentials": True,
        "expose_headers": ["Content-Range", "X-Content-Range"]
    }
})

# Initialize SocketIO with CORS support
# Using default async_mode and allowing CORS
socketio = SocketIO(app, 
                   cors_allowed_origins="http://127.0.0.1:3000",
                   ping_timeout=60,
                   ping_interval=25,
                   logger=True,
                   engineio_logger=True)

# Register Blueprints
app.register_blueprint(upload_bp, url_prefix='/image')
app.register_blueprint(user_bp, url_prefix='/user')
app.register_blueprint(professional_bp, url_prefix='/professional')
app.register_blueprint(quiz_bp, url_prefix='/quizes')
app.register_blueprint(career_bp, url_prefix='/career')
app.register_blueprint(ai_routes)

# App configuration
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=30)

# Add CORS-related headers to all responses
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

# Initialize database and JWT
mongo = PyMongo(app)
jwt = JWTManager(app)

# Database setup
db = mongo.db
users_collection = db["users"]
login_details = db["logins"]
users_collection.create_index("email", unique=True)
users_collection.create_index("username", unique=True)
login_details.create_index("username", unique=True)

# Initialize chatbot with API key
chatbot = StudyBuddyChatbot(os.getenv("API_KEY"))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ask', methods=['POST', 'OPTIONS'])
def ask_ai():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
        
    try:
        data = request.json
        topic = data.get('topic')
        
        if not topic:
            return jsonify({'error': 'No topic provided'}), 400
        
        response = generate_response(topic)
        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('send_message')
def handle_message(data):
    try:
        user_message = data.get('message')
        print(f"Received message: {user_message}")
        
        chatbot_response = chatbot.send_message(user_message)
        print(f"Chatbot response: {chatbot_response}")
        
        emit('response_message', {'response': chatbot_response})
    except Exception as e:
        print(f"Error in handle_message: {str(e)}")
        emit('error', {'message': 'An error occurred processing your message'})


if __name__ == '__main__':
    # Run the app with SocketIO
    socketio.run(app, host='0.0.0.0', port=5000, debug=True, allow_unsafe_werkzeug=True)