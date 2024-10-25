let mediaRecorder;
let audioChunks = [];

document.getElementById('startRecording').addEventListener('click', async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
    };
    
    mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks);
        const formData = new FormData();
        formData.append('audio', audioBlob);
        
        try {
            const response = await fetch('/api/record-teacher', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (result.success) {
                alert('Teacher voice recorded successfully!');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        
        audioChunks = [];
    };
    
    mediaRecorder.start();
    document.getElementById('startRecording').disabled = true;
    document.getElementById('stopRecording').disabled = false;
});

document.getElementById('stopRecording').addEventListener('click', () => {
    mediaRecorder.stop();
    document.getElementById('startRecording').disabled = false;
    document.getElementById('stopRecording').disabled = true;
});

document.getElementById('askQuestion').addEventListener('click', async () => {
    const question = document.getElementById('questionInput').value;
    
    try {
        const response = await fetch('/api/get-explanation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                topic: question,
                context: {
                    level: 'intermediate',
                    style: 'detailed'
                }
            })
        });
        
        const result = await response.json();
        
        // Display text response
        document.getElementById('textResponse').textContent = result.text;
        
        // Create audio from response
        const audioBlob = new Blob([new Float32Array(result.audio)], { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audioPlayer = document.getElementById('audioResponse');
        audioPlayer.src = audioUrl;
        
        // Show response section
        document.getElementById('responseSection').classList.remove('hidden');
        
    } catch (error) {
        console.error('Error:', error);
    }
});