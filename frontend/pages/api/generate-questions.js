// pages/api/generate-questions.js

export default async function handler(req, res) {
    const { topic, numQuestions } = req.body;
    const apiKey = process.env.REPLICATE_API_KEY; // Ensure this key is set in your environment variables

    // Define the input for the Replicate model
    const input = {
        prompt: `Generate ${numQuestions} quiz questions on the topic: ${topic}. Provide each question with four options and mark the correct answer.`,
        max_length: 150 * numQuestions, // Adjust as necessary for the model's requirements
        num_questions: numQuestions,
    };

    try {
        const response = await fetch('https://api.replicate.com/v1/predictions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${apiKey}`, // Use Token for Replicate
            },
            body: JSON.stringify({
                // Specify the model ID for the question generation
                version: "your-model-version-id", // Replace with your actual model version ID
                input: input,
            }),
        });

        const data = await response.json();

        // Process the data according to Replicate's response format
        if (data && data.output) {
            const questions = data.output.map((item) => {
                const [question, ...options] = item.split("?"); // Adjust parsing logic as needed
                return {
                    question: question.trim() + "?",
                    options: options.map((opt) => opt.trim()),
                    correct: 0, // Adjust logic for determining the correct answer
                };
            });
            res.status(200).json({ questions });
        } else {
            throw new Error('No questions generated.');
        }
    } catch (error) {
        console.error("Error generating questions:", error);
        res.status(500).json({ error: "Failed to generate questions" });
    }
}
