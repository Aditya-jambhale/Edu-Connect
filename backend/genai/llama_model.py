from transformers import LlamaTokenizer, LlamaForCausalLM

class TeachingAssistant:
    def __init__(self):
        # Load LLaMA tokenizer and model
        self.tokenizer = LlamaTokenizer.from_pretrained("meta-llama/Llama-2-7b")
        self.model = LlamaForCausalLM.from_pretrained("meta-llama/Llama-2-7b")

    def generate_response(self, topic, student_level):
        # Creating the teaching prompt
        prompt = f"Explain the following topic: {topic} to a {student_level} level student."
        
        # Tokenize input
        inputs = self.tokenizer(prompt, return_tensors="pt")
        
        # Generate response from LLaMA model
        outputs = self.model.generate(inputs.input_ids, max_length=300, temperature=0.7, top_p=0.9)
        
        # Decode and return explanation
        return self.tokenizer.decode(outputs[0], skip_special_tokens=True)
