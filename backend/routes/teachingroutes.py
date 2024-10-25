from flask import Blueprint, request, jsonify
from genai.llama_model import TeachingAssistant

teaching_bp = Blueprint('teaching', __name__)

@teaching_bp.route('/generate_explanation', methods=['POST'])
def generate_explanation():
    data = request.get_json()
    topic = data.get('topic')
    student_level = data.get('student_level', 'high school')  # Default level

    assistant = TeachingAssistant()
    explanation = assistant.generate_response(topic, student_level)
    
    return jsonify({"explanation": explanation})
