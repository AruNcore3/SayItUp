document.addEventListener('DOMContentLoaded', () => {
    const recordBtn = document.getElementById('recordBtn');
    const instructionText = document.getElementById('instructionText');
    const subText = document.getElementById('subText');
    
    let isRecording = false;

    recordBtn.addEventListener('click', () => {
        // Toggle state
        isRecording = !isRecording;

        if (isRecording) {
            // State: Recording
            recordBtn.classList.add('recording-active');
            instructionText.textContent = "Recording...";
            subText.textContent = "Tap again to stop";
            
            // Change text color to brand red
            instructionText.classList.add('text-brand-red');
            instructionText.classList.remove('text-gray-900');
        } else {
            // State: Stopped
            recordBtn.classList.remove('recording-active');
            instructionText.textContent = "Tap to start recording";
            subText.textContent = "No sign-up needed";
            
            // Revert text color
            instructionText.classList.remove('text-brand-red');
            instructionText.classList.add('text-gray-900');
        }
    });
});