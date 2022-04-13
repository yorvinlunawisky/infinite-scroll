const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;


    // Unsplash API
    let count = 5;
    const apiKey = 'iA8oXVUfz2FHlLdHumv9GgAhPICqs5kJN6lyzJTgFBA';
    let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
     
    // Check if all images were loaded
    function imageLoaded() {
      imagesLoaded++;
      if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30
        apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
      }
    }

// A helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links and photos. Add them to DOM.
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
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

        //Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

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

// Check if scrolling near bottom of page to load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPictures();
    }
});

//On load
getPictures();