// Wait for the HTML document to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    const recordBtn = document.getElementById('recordBtn');
    const statusText = document.getElementById('status');

    let mediaRecorder;
    let audioChunks = [];
    let isRecording = false;

    recordBtn.addEventListener('click', async () => {
        if (!isRecording) {
            // --- START RECORDING ---
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                
                mediaRecorder = new MediaRecorder(stream);
                audioChunks = [];

                mediaRecorder.addEventListener("dataavailable", event => {
                    audioChunks.push(event.data);
                });

                mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                    uploadAudio(audioBlob);
                    
                    // Stop the microphone
                    stream.getTracks().forEach(track => track.stop());
                });

                mediaRecorder.start();
                isRecording = true;
                recordBtn.textContent = "Stop Recording";
                statusText.textContent = "Status: Recording...";

            } catch (err) {
                console.error("Microphone error:", err);
                statusText.textContent = "Error: Could not access microphone.";
            }
        } else {
            // --- STOP RECORDING ---
            mediaRecorder.stop();
            isRecording = false;
            recordBtn.textContent = "Start Recording";
            statusText.textContent = "Status: Processing...";
        }
    });

    // Function to send the audio to FastAPI
    async function uploadAudio(audioBlob) {
        const formData = new FormData();
        
        // "audio" must match the parameter name in your FastAPI route
        formData.append("audio", audioBlob, "feedback.webm");

        try {
            const response = await fetch("http://127.0.0.1:8000/upload_feedback", {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            
            if (response.ok) {
                statusText.textContent = `Success! Feedback ID: ${result.feedback_id}`;
            } else {
                statusText.textContent = `Error: ${result.detail}`;
            }
        } catch (error) {
            console.error("Upload failed:", error);
            statusText.textContent = "Error: Failed to connect to server.";
        }
    }
});