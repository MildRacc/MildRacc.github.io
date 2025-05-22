document.addEventListener('DOMContentLoaded', () => {
    // Get all media buttons with images
    const mediaButtons = document.querySelectorAll('.media button');
    
    // Image descriptions - you can customize these
    const descriptions = {
        "Low Poly Goose": "A low-poly illustration of a goose.",
        "Engineer": "Stylized collage contaning different object which I personaly use.",
        "Dissection Proj Final": "An illustration of a made up design for a VR headset. The artwork is inspired by technical patent-papers and how they illustrate designs.",
        "Idk": "Abstract digital artwork exploring emotional expression through color and form.",
        "": "A visual experiment pushing the boundaries of digital media, focusing on texture and contrast."
    };
    
    // Add click event listeners to each button
    mediaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const img = button.querySelector('img');
            const imgSrc = img.src;
            const imgAlt = img.alt;
            const description = descriptions[imgAlt] || "No description available";
            
            createFullscreenView(imgSrc, description);
        });
    });
    
    // Function to create fullscreen view
    function createFullscreenView(imgSrc, description) {
        // Create overlay container
        const overlay = document.createElement('div');
        overlay.className = 'fullscreen-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '1000';
        
        // Create image element
        const fullImg = document.createElement('img');
        fullImg.src = imgSrc;
        fullImg.style.maxWidth = '80%';
        fullImg.style.maxHeight = '70%';
        fullImg.style.objectFit = 'contain';
        fullImg.style.borderRadius = '8px';
        
        // Create description element
        const descElement = document.createElement('p');
        descElement.textContent = description;
        descElement.style.color = 'white';
        descElement.style.fontFamily = 'GTWalsheim, sans-serif';
        descElement.style.fontSize = '1.2rem';
        descElement.style.maxWidth = '80%';
        descElement.style.textAlign = 'center';
        descElement.style.margin = '20px 0';
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.style.padding = '10px 20px';
        closeButton.style.backgroundColor = '#222244';
        closeButton.style.color = 'white';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '4px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.fontFamily = 'GTWalsheim, sans-serif';
        closeButton.style.fontSize = '1rem';
        
        // Add click event to close overlay
        closeButton.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        
        // Also close when clicking outside the image
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
        
        // Append elements to overlay
        overlay.appendChild(fullImg);
        overlay.appendChild(descElement);
        overlay.appendChild(closeButton);
        
        // Add overlay to body
        document.body.appendChild(overlay);
    }
});