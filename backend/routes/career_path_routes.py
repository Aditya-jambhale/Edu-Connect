from flask import request, jsonify, Blueprint
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import datetime as dt
from genai import career_pathway

career_bp = Blueprint('career',__name__)

@career_bp.route('/get_routes', methods=['POST'])
def get_carrier_guidance():
    data = request.get_json()
    user_intrests = {
    "interests": data['interests'],
    "skills": data['skills'],
    "career_goals": data['goals']
    }
    resposne  = career_pathway.get_carrier_guidance(user_data=user_intrests)
    return jsonify({"response":resposne})
