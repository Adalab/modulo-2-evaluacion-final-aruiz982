'use strict';

//Query Selector

const characterInput = document.querySelector('.js__characterInput');
const characterBtn = document.querySelector('.js__characterBtn');
const characterList = document.querySelector('.js__characterList');
const favouritesList = document.querySelector('.favouritesList');

//Datos

let charactersData = [];
let favouritesData = [];

//Funciones

function displayCharacter(objElement){
    let html = '';

    html = `<li>
                <div class = 'characterContainer js__characterContainer' data-id = '${objElement._id}'>
                    <img src= '${objElement.imageUrl}' alt = 'Imagen de ${objElement.name}'>
                    <p>${objElement.name}</p>
                </div>                
            </li>`
    
    return html;
}

function displayAllCharacter(objectList){
    let html = '';

    for (const objElement of objectList){
        html += displayCharacter(objElement);        
    }

    characterList.innerHTML = html;

    const allCharactersContainers = document.querySelectorAll('.js__characterContainer');
    
    for (const characterContainer of allCharactersContainers){
        characterContainer.addEventListener('click', handleEachfavouriteCharacter);
    }
}

function displayAllFavouriteCharacters(objectList){
    let html = '';

    for (const objElement of objectList){
        html += displayCharacter(objElement);        
    }

    favouritesList.innerHTML = html;

    /* const allCharactersContainers = document.querySelectorAll('.js__characterContainer');
    
    for (const characterContainer of allCharactersContainers){
        characterContainer.addEventListener('click', handleEachfavouriteCharacter);
    } */
}

function handleEachfavouriteCharacter(ev){
    const clickedCharacter = ev.currentTarget.dataset.id;

    const favouriteObject = charactersData.find(objElement => parseInt(objElement._id) === parseInt(clickedCharacter));

    const characterPosition = favouritesData.findIndex(objElement => (parseInt(objElement._id)) === parseInt(clickedCharacter));

    if (characterPosition === -1){
        favouritesData.push(favouriteObject);
        console.log(favouritesData);
    } else {
        console.log('Mal');
    }
    
    displayAllFavouriteCharacters(favouritesData);
}




//Funciones con eventos

//Eventos

//Código cuando carga la página

fetch('https://api.disneyapi.dev/character?pageSize=50')
  .then((response) => response.json())
  .then((data) => {
    charactersData = data.data;

    displayAllCharacter(charactersData);
});








