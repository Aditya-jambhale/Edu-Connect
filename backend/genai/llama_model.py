from transformers import LlamaForCausalLM, LlamaTokenizer

# Initialize LLaMA model
def initialize_model():
    model = LlamaForCausalLM.from_pretrained('path_to_model')
    tokenizer = LlamaTokenizer.from_pretrained('path_to_tokenizer')
    return model, tokenizer

def generate_response(topic, model, tokenizer):
    inputs = tokenizer(topic, return_tensors="pt")
    outputs = model.generate(**inputs)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return response
