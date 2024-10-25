from gtts import gTTS
import speech_recognition as sr
from llama_model import TeachingAssistant

def listen_to_question():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening for a question...")
        audio = recognizer.listen(source)
    
    try:
        question = recognizer.recognize_google(audio)
        print(f"Recognized question: {question}")
        return question
    except sr.UnknownValueError:
        return "Sorry, I could not understand."

def provide_explanation(topic):
    assistant = TeachingAssistant()
    explanation = assistant.generate_response(topic, "high school")  # Set desired level here
    tts = gTTS(explanation)
    tts.save("explanation.mp3")
    return explanation, "explanation.mp3"
