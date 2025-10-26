document.addEventListener('DOMContentLoaded', () => {
    // Get all media buttons with images
    const mediaButtons = document.querySelectorAll('.media button');
    
    // Image descriptions - you can customize these
    const descriptions = {
        "Low Poly Goose": "A low-poly illustration of a goose created in Adobe Illustrator.",
        "Experimental": "A video where I experimented with programming my own VFX, and I created these really cool glitch effects.",
        "Self Portrait": "A video self portrait about myself.",
        "Engineer": "Stylized collage contaning different object which I personaly use. Items were scanned into Photoshop where they were arranged.",
        "Dissection": "An illustration of a made up design for a VR headset. The artwork is inspired by technical patent-papers and how they illustrate designs.",
        "Convery Emotion": "Abstract digital artwork exploring emotional expression through color and form. Models were imported to Blender and arranged before being moved to Photoshop for post-processing.",
        "Space Cowboy": "An animation created in Blender about a rover on mars.",
        "Pushing The Limits": "A physical and digital artwork that features a physical painting of a painting in an art gallary, with the encoded form of another artwork being displayed in the painting.",
        "3 Bears": "Illustrations of 3 bears. The bears were made to be printed on the back of a t-shirt for my digital art class.",
        "Component Cards": "A set of cards designed for a board game where players design circuits electronic.",
        "Quick n' Clean": "A product designed for Shark Tank. The product is a washing machine and dryer combo that is designed to reduce human labor and time spent on laundry. The product is designed to be compact and easy to use, with a sleek and modern design.",
        "Storytelling": "The story of two spartans. A collage made from photos of resin printed spartan figurines, pictures of Roman ruins, and other elements."
    };


    const youtubeiFrames = {
        "Self Portrait": `<iframe width="560" height="315" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        "Experimental": `<iframe width="560" height="315" src="https://www.youtube.com/embed/2sgk2SVO2kA?si=trEfxTq82QPyFw-m" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        "Space Cowboy": `<iframe width="560" height="315" src="https://www.youtube.com/embed/tqNYm1sU_jw?si=DzO6xfb-p8BhItAU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    
    };
    
    // Add click event listeners to each button
    mediaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const img = button.querySelector('img');
            const imgSrc = img.src;
            const imgAlt = img.alt;
            const description = descriptions[imgAlt] || "No description available";
            
            // Check if this is a video (using data attribute)
            if (img.dataset.type === 'video') {
                createFullscreenVideoView(img.alt, description);
            } else {
                // Regular image
                createFullscreenView(imgSrc, description);
            }
        });
    });
    
    // Function to create fullscreen view for images
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

    
    
    // Function to create fullscreen view for YouTube videos
    function createFullscreenVideoView(videoId, description) {
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
        
        // Create YouTube embed iframe
        const videoContainer = document.createElement('div');
        videoContainer.style.width = '80%';
        videoContainer.style.maxWidth = '960px';
        videoContainer.style.aspectRatio = '16/9';
        
        const iframe = document.createElement('iframe');
        iframe.src = youtubeiFrames[videoId] ? 
            youtubeiFrames[videoId].match(/src="([^"]+)"/)[1] : 
            `https://www.youtube.com/embed/${videoId}`;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '8px';
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        
        videoContainer.appendChild(iframe);
        
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
        
        // Also close when clicking outside the video
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
        
        // Append elements to overlay
        overlay.appendChild(videoContainer);
        overlay.appendChild(descElement);
        overlay.appendChild(closeButton);
        
        // Add overlay to body
        document.body.appendChild(overlay);
    }
});
