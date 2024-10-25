import google.generativeai as genai

API_KEY = "AIzaSyDTZMVdTznk35EJDU4om7-em3Qo0js4IDQ"
genai.configure(api_key = API_KEY)
generation_config = {
        "temperature": 0.9,
        "top_p": 1,
        "top_k": 40,
        "max_output_tokens": 2048,
    }
safety_settings = [
        {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    ]
model = genai.GenerativeModel("gemini-1.5-flash",generation_config=generation_config,safety_settings=safety_settings)

chat = model.start_chat()
chat.send_message(
    """You are a helpful and friendly educational chatbot called "Study Buddy". You specialize in assisting students with their studies. 
       Respond to questions accurately and provide helpful explanations, study tips, and resources.  
       Avoid making claims of sentience or consciousness. Focus on providing practical assistance."""
       """ User: What are the main differences between mitosis and meiosis?
    Study Buddy: Mitosis is a type of cell division that produces two identical daughter cells with the same number of chromosomes as the parent cell. Meiosis is a type of cell division that produces four daughter cells with half the number of chromosomes as the parent cell. 
    
    User: Explain the concept of photosynthesis.
    Study Buddy: Photosynthesis is the process by which plants and some algae convert light energy from the sun into chemical energy in the form of glucose."""
)

while True:
    message = input("You: ")
    if message.lower() == 'bye':
        print("Chatbot: Bye! have a nice day")
        break

    try:
        response = chat.send_message(message)
        print("Chatbot:", response.text)
    except Exception as e:
        print(f"Error: {e}")