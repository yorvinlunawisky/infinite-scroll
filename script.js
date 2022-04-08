//Unsplash API
const count = 10;
const apiKey = 'iA8oXVUfz2FHlLdHumv9GgAhPICqs5kJN6lyzJTgFBA';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Get pictures from Unsplash API

async function getPictures() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    } catch {
        //Catch error here
    }
}

//On load
getPictures();