
// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const image1Element = document.getElementById('image1');
    const image2Element = document.getElementById('image2');
    const image3Element = document.getElementById('image3');
    const imageYouElement = document.getElementById('imageYou');
    const name1Element = document.getElementById('name1');
    const name2Element = document.getElementById('name2');
    const name3Element = document.getElementById('name3');

    let captureWidth = document.getElementById("screen-capture").offsetWidth;

    document.getElementById("button-container").style.width = captureWidth + "px";

    let results = JSON.parse(localStorage.getItem('results')).results;

    image1Element.src = `data:image/png;base64,${results[0].Image}`;
    name1Element.textContent = `1. ${results[0].FirstName + ' ' + results[0].LastName || 'Person 1'}`;
    
    image2Element.src = `data:image/png;base64,${results[1].Image}`;
    name2Element.textContent = `2. ${results[1].FirstName + ' ' + results[1].LastName || 'Person 2'}`;
    
    image3Element.src = `data:image/png;base64,${results[2].Image}`;
    name3Element.textContent = `3. ${results[2].FirstName + ' ' + results[2].LastName || 'Person 3'}`;
    
    imageYouElement.src = `data:image/png;base64,${localStorage.getItem('you')}`;

    document.getElementById("saveButton").addEventListener("click", function() {
        var captureSection = document.getElementById("screen-capture");
        document.getElementById('blur').style.display = 'block';

        html2canvas(captureSection, { scale: 1 }).then(function(canvas) {
            // Create an image from the canvas
            var image = canvas.toDataURL("image/png");

            document.getElementById('resultsImage').src = image;
            document.getElementById('resultsImageContainer').style.display = 'flex';
        });
    });

    document.getElementById('blur').addEventListener('click', function() {
        document.getElementById('blur').style.display = 'none';
        document.getElementById('resultsImageContainer').style.display = 'none';
    });
});