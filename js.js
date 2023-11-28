const charactersEl = document.getElementById('characters');
const nameFilterEl = document.getElementById('name-filter');
const statusFilterEl = document.getElementById('status-filter');




async function getCharacters (name, status){

    let url = 'https://rickandmortyapi.com/api/character/';

    if (name || status){
        url += '?';
        if(name){
            url += `name=${name}&`;
        }

        if(status){
            url += `status=${status}`;
        }
    }


    const response = await fetch(url);
    const data = await response.json(); 

    return data.results;

}


async function displayCharacters (name, status) {
    
  
    const characters = await getCharacters(name, status);
    
    charactersEl.innerHTML = '';

    for( let character of characters ){
        const card = document.createElement('div');
        card.classList.add('character-card');

        card.innerHTML = `
            <img src="${character.image}" />
            <h2> ${character.name} </h2>
            <p> Status: ${character.status} </p>
            <p> Especie: ${character.species} </p>
            <p> Location: ${character.location.name} </p>
        `;

        charactersEl.appendChild(card);

    }

}

displayCharacters();


nameFilterEl.addEventListener('input', () => {
    displayCharacters(nameFilterEl.value, statusFilterEl.value );
});

statusFilterEl.addEventListener('change', () => {
    displayCharacters(nameFilterEl.value, statusFilterEl.value );
});




function moveCarousel(direction) {
    const elementWidth = charactersEl.scrollWidth /  charactersEl.children.length;
    const newPosition = charactersEl.scrollLeft + direction * elementWidth;

    charactersEl.scrollTo({
        left: newPosition,
        behavior: 'smooth'
    });
}

const card = document.querySelector(".charactersEl")
const arrows = document.querySelectorAll("box-icon");

arrows.forEach(icon => {
    icon.addEventListener("click", () => {
        const isLeftArrow = icon.getAttribute("name") === "left-arrow-circle";
        const direction = isLeftArrow ? -1 : 1;

        moveCarousel(direction);
    })
})

function autoMoveCarousel() {
    moveCarousel(1); 
}

const autoMoveInterval = setInterval(autoMoveCarousel, 6000);

card.addEventListener("mousedown", () => {
    clearInterval(autoMoveInterval);
});

card.addEventListener("touchstart", () => {
    clearInterval(autoMoveInterval);
});
