document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureBtn = document.getElementById('capture-btn');
    const resultContainer = document.getElementById('result-container');
    const capturedImage = document.getElementById('captured-image');
    const retryBtn = document.getElementById('retry-btn');
    const sendBtn = document.getElementById('send-btn');
    const statusMessage = document.getElementById('status');
    
    // Image data storage
    let imageData = null;
    
    // Initialize the webcam
    async function initCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: 'user'
                },
                audio: false
            });
    
            video.srcObject = stream;
    
            // Wait for video to be ready
            video.onloadedmetadata = () => {
                captureBtn.disabled = false;
    
                // Set canvas size to match video
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
            };
    
        } catch (err) {
            console.error('Error accessing webcam:', err);
            alert('Error accessing webcam. Please ensure you have granted camera permissions.');
        }
    }
    
    // Capture photo
    function capturePhoto() {
        // Draw current video frame to canvas
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
        // Get image data and display it
        imageData = canvas.toDataURL('image/jpeg');
        capturedImage.src = imageData;
    
        // Show result container
        resultContainer.style.display = 'block';
    
        // Hide camera view (optional - remove if you want to keep the camera visible)
        document.querySelector('.camera-container').style.display = 'none';
        captureBtn.style.display = 'none';
    }
    
    // Retry - return to camera view
    function retryCapture() {
        // Reset UI
        resultContainer.style.display = 'none';
        document.querySelector('.camera-container').style.display = 'block';
        captureBtn.style.display = 'block';
        statusMessage.textContent = '';
    
        // Clear previous image data
        imageData = null;
    }
    
    // Send photo (placeholder for future implementation)
    function sendPhoto() {
        if (!imageData) {
            statusMessage.textContent = 'No image to send. Please take a photo first.';
            return;
        }
    
        statusMessage.textContent = 'Preparing to send photo... (POST request not implemented yet)';
    
        // The following code would be used for implementation of a POST request:
        /*
        const formData = new FormData();
        // Convert base64 image data to blob
        const blob = dataURItoBlob(imageData);
        formData.append('photo', blob, 'captured_image.jpg');
    
        fetch('your-api-endpoint', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            statusMessage.textContent = 'Photo uploaded successfully!';
            console.log('Success:', data);
        })
        .catch(error => {
            statusMessage.textContent = 'Failed to upload photo. Please try again.';
            console.error('Error:', error);
        });
        */
    
        // Helper function to convert base64 to blob
        function dataURItoBlob(dataURI) {
            const byteString = atob(dataURI.split(',')[1]);
            const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
    
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
    
            return new Blob([ab], { type: mimeString });
        }
    }
    
    // Event listeners
    // captureBtn.addEventListener('click', capturePhoto);
    // retryBtn.addEventListener('click', retryCapture);
    // sendBtn.addEventListener('click', sendPhoto);
    
    // Start camera when page loads
    window.addEventListener('load', initCamera);
});