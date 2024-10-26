from flask import Blueprint, request, jsonify
import requests
import time

ai_routes = Blueprint('ai_routes', __name__)

@ai_routes.route('/ask', methods=['POST'])
def ask_ai():
    data = request.json
    topic = data.get('topic')

    # Setup headers and payload for the API request
    hf_token = "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"
    headers = {
        "Authorization": f"Bearer {hf_token}",  # Replace with your actual token
    }
    payload = {
        "inputs": topic,  # Your question/topic here
    }

    url = "https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B"
    max_retries = 5
    retry_delay = 5  # seconds

    for attempt in range(max_retries):
        response = requests.post(url, headers=headers, json=payload)
        response_data = response.json()

        if "error" in response_data and "currently loading" in response_data["error"]:
            print(f"Model is loading. Attempt {attempt + 1} of {max_retries}. Retrying in {retry_delay} seconds...")
            time.sleep(retry_delay)
        else:
            return jsonify({'response': response_data})
            break
    else:
        return jsonify({'error': "Max retries reached. Model is still loading."}), 503
