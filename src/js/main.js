'use strict';

//Query Selector

const characterInput = document.querySelector('.js__characterInput');
const characterBtn = document.querySelector('.js__characterBtn');
const characterList = document.querySelector('.js__characterList');
const favouritesList = document.querySelector('.js__favouritesList');

//Datos

let charactersData = [];
let favouritesData = [];

//Funciones

function displayCharacter(objElement){
    let html = '';

    if(objElement.imageUrl !== undefined){
        html = `<li>
                    <div class = 'character__container js__characterContainer' data-id = '${objElement._id}'>
                        <img class = 'character__img' src= '${objElement.imageUrl}' alt = 'Imagen de ${objElement.name}'>
                        <p class = 'character__name'>${objElement.name}</p>
                    </div>                
                </li>`

    } else {
        html = `<li>
                    <div class = 'character__container js__characterContainer' data-id = '${objElement._id}'>
                        <img class = 'character__img' src= 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney' alt = 'Imagen de ${objElement.name}'>
                        <p class = 'character__name'>${objElement.name}</p>
                    </div>                
                </li>`
    }

    
    return html;
}

function displayFavouriteCharacter(objElement){
    let html = '';

    if(objElement.imageUrl !== undefined){
        html = `<li>
                    <div class = 'favourite__container js__characterContainer selected' data-id = '${objElement._id}'>
                        <p class = 'closing__favourite__container js__closingFavouriteContainer' data-id = '${objElement._id}'>X</p>
                        <img class = 'favourite__img' src= '${objElement.imageUrl}' alt = 'Imagen de ${objElement.name}'>
                        <p class = 'favourite__name'>${objElement.name}</p>
                    </div>                
                </li>`

    } else {
        html = `<li>
                    <div class = 'favourite__container js__characterContainer selected' data-id = '${objElement._id}'>
                        <div class = 'closing__favourite__container js__closingFavouriteContainer' data-id = '${objElement._id}'>X</div>
                        <img class = 'favourite__img' src= 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney' alt = 'Imagen de ${objElement.name}'>
                        <p class = 'favourite__name'>${objElement.name}</p>
                    </div>                
                </li>`
    }

    return html;
}

function displayAllCharacters(objectList){
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

    const allClosingButtons = document.querySelectorAll('.js__closingFavouriteContainer');

    for (const closingBtn of allClosingButtons){
        closingBtn.addEventListener('click', handleRemoveFavourite);
    }

}


function handleEachfavouriteCharacter(ev){
    const clickedCharacter = ev.currentTarget.dataset.id;

    const favouriteObject = charactersData.find(objElement => parseInt(objElement._id) === parseInt(clickedCharacter));

    const characterPosition = favouritesData.findIndex(objElement => (parseInt(objElement._id)) === parseInt(clickedCharacter));

    if (characterPosition === -1){
        favouritesData.push(favouriteObject);

        localStorage.setItem('favs', JSON.stringify(favouritesData) );
    } else {
        favouritesData.splice(characterPosition, 1);

        localStorage.setItem('favs', JSON.stringify(favouritesData) );
    }
    
    displayAllFavouriteCharacters(favouritesData);
}


//Funciones con eventos

function filterCharacter(){
    const characterName = characterInput.value;
    
    fetch(`https://api.disneyapi.dev/character?pageSize=50&name=${characterName}`)
        .then((response) => response.json())
        .then((data) => {
            charactersData = data.data;

        displayAllCharacters(charactersData);
});
}

function handleRemoveFavourite (ev){
    const clickedCharacter = ev.currentTarget.dataset.id;

    const characterPosition = favouritesData.findIndex(objElement => (parseInt(objElement._id)) === parseInt(clickedCharacter));

    favouritesData.splice(characterPosition, 1);

    localStorage.setItem('favs', JSON.stringify(favouritesData) );

    displayAllFavouriteCharacters(favouritesData);
}


//Eventos

characterBtn.addEventListener('click', filterCharacter);



//Código cuando carga la página

fetch('https://api.disneyapi.dev/character?pageSize=50')
  .then((response) => response.json())
  .then((data) => {
    charactersData = data.data;

    displayAllCharacters(charactersData);
});

const favsFromLS = JSON.parse(localStorage.getItem('favs'));

if( favsFromLS !== null ) {
  favouritesData = favsFromLS;

  displayAllFavouriteCharacters(favouritesData);
}



















