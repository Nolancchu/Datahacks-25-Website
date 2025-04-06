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

    const images = document.getElementsByTagName('img');
    
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
        resultContainer.style.display = 'flex';
        resultContainer.style.flexDirection = 'column';
    
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
    async function sendPhoto() {
        if (!imageData) {
            statusMessage.textContent = 'No image to send. Please take a photo first.';
            return;
        }
        
        statusMessage.textContent = `Preparing to send photo with url ${capturedImage.src} POST request not implemented yet)`;
    
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
        let base64Image = capturedImage.src.split('base64,')[1];
        console.log(base64Image);

        try {
            const response = await fetch('https://facialrec.gavmere.me/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'image': base64Image,
                    'top_n': 3,
                    'min_similarity': 0.01
                }),
            });

            // Retrieve result data from API
            // const results = response.json();
            const results = await response.json();
            localStorage.setItem('results', JSON.stringify(results));
            localStorage.setItem('you', base64Image);
            console.log(results);

            // const topMatchImg = results[0].Image;
            // const topMatchName = results[0].FirstName + ' ' + results[0].LastName;
            // const secondMatchImg = results[1].Image;
            // const secondMatchName = results[1].FirstName + ' ' + results[1].LastName;
            // const thirdMatchImg = results[2].Image;
            // const thirdMatchName = results[2].FirstName + ' ' + results[2].LastName;

            // images[0].src = topMatchImg;
            // images[1].src = secondMatchImg;
            // images[2].src = thirdMatchImg
            // images[3].src = capturedImage.src;

            // document.getElementById('name1').textContent = topMatchName;
            // document.getElementById('name2').textContent = secondMatchName;
            // document.getElementById('name3').textContent = thirdMatchName;


        } catch (err) {
            statusMessage.textContent = 'Failed to upload photo. Please try again.';
            console.error('Error:', err);
        }

        window.location.href = './output.html';
    }
    
    // Event listeners
    captureBtn.addEventListener('click', capturePhoto);
    retryBtn.addEventListener('click', retryCapture);
    sendBtn.addEventListener('click', sendPhoto);
    
    // Start camera when page loads
    window.addEventListener('load', initCamera);
});