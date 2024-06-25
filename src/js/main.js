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

    if(objElement.imageUrl !== undefined){
        html = `<li>
                    <div class = 'characterContainer js__characterContainer' data-id = '${objElement._id}'>
                        <img class = 'characterImg' src= '${objElement.imageUrl}' alt = 'Imagen de ${objElement.name}'>
                        <p class = 'characterName'>${objElement.name}</p>
                    </div>                
                </li>`

    } else {
        html = `<li>
                    <div class = 'characterContainer js__characterContainer' data-id = '${objElement._id}'>
                        <img class = 'characterImg' src= 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney' alt = 'Imagen de ${objElement.name}'>
                        <p class = 'characterName'>${objElement.name}</p>
                    </div>                
                </li>`
    }

    
    return html;
}

function displayFavouriteCharacter(objElement){
    let html = '';

    if(objElement.imageUrl !== undefined){
        html = `<li>
                    <div class = 'favouriteContainer js__characterContainer selected' data-id = '${objElement._id}'>
                        <img class = 'favouriteImg' src= '${objElement.imageUrl}' alt = 'Imagen de ${objElement.name}'>
                        <p class = 'favouriteName'>${objElement.name}</p>
                    </div>                
                </li>`

    } else {
        html = `<li>
                    <div class = 'favouriteContainer js__characterContainer selected' data-id = '${objElement._id}'>
                        <img class = 'favouriteImg' src= 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney' alt = 'Imagen de ${objElement.name}'>
                        <p class = 'favouriteName'>${objElement.name}</p>
                    </div>                
                </li>`
    }

    
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
        html += displayFavouriteCharacter(objElement);        
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
        favouritesData.splice(characterPosition, 1);
    }
    
    displayAllFavouriteCharacters(favouritesData);

    //ev.currentTarget.classList.toggle('selected');
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


characterBtn.addEventListener('click', filterCharacter);

function filterCharacter(){
    const characterName = characterInput.value;
    
    fetch(`https://api.disneyapi.dev/character?pageSize=50&name=${characterName}`)
        .then((response) => response.json())
        .then((data) => {
            charactersData = data.data;

        displayAllCharacter(charactersData);
});
}








