const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// A helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links and photos. Add them to DOM.
function displayPhotos() {
    //Run fucntion for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Create an image for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

//Unsplash API
const count = 10;
const apiKey = 'iA8oXVUfz2FHlLdHumv9GgAhPICqs5kJN6lyzJTgFBA';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Get pictures from Unsplash API

async function getPictures() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch {
        //Catch error here
    }
}

//On load
getPictures();