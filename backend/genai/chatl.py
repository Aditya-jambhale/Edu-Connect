import requests

HUGGING_FACE_TOKEN = "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"  # Your access token

def get_huggingface_response(topic):
    headers = {
        "Authorization": f"Bearer {HUGGING_FACE_TOKEN}",
        "Content-Type": "application/json",
    }
    data = {"inputs": topic}
    
    # Replace the URL with the model you are using
    response = requests.post("https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b", headers=headers, json=data)
    
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": response.text}

def generate_response(topic):
    # Call the Hugging Face API to get the response
    result = get_huggingface_response(topic)
    if "error" in result:
        return "Error: " + result["error"]
    return result.get("generated_text", "No response generated.")
