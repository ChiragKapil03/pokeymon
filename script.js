let pokemonContainer = document.querySelector("#pokemon_card_container");
let searchInput = document.getElementById("search");
let filterBtn = document.getElementById("filter");
let type = document.getElementById("type");

async function fetchPokemOnData(i) {
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    let result = await data.json();
    return result;
}

function createCard(pokemon) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <img src='${pokemon.sprites.front_default}' class="image"/>
                <div class="name">${pokemon.name.toUpperCase()}</div>
                <div class="types">${pokemon.types[0].type.name}</div>
                <div class="ability">
                    <div class="ability-box">Hp: ${pokemon.stats[0].base_stat}</div>
                    <div class="ability-box">Att: ${pokemon.stats[1].base_stat}</div>  
                    <div class="ability-box">Def: ${pokemon.stats[2].base_stat} </div>
                </div>
            </div>
            <div class="card-back">
                <img src='${pokemon.sprites.back_default}' class="backImage"/>
                <div class="name">${pokemon.name}</div>
                <div class="types">${pokemon.types[0].type.name}</div>
            </div>
        </div>
    `;
    return card;
}

filterBtn.addEventListener("click", function(){
    let allCards = document.querySelectorAll(".card");
    allCards.forEach((card)=>{
        let cardType = card.querySelector(".types").textContent;
        
        if(cardType === type.value){
            card.style.display = "block";
        } else {
            card.style.display = "none";
        } 
    });
});

searchInput.addEventListener('keyup', function(){
    let searchValue = searchInput.value.toUpperCase();
    let allCards = document.querySelectorAll(".card");
    allCards.forEach(function(card){
        let cardName = card.querySelector(".name").textContent;

        if(cardName.startsWith(searchValue)){
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    }); 
});

async function fetchNPokemons() {
    for (let i = 1; i <= 204; i++) {
        let pokemon = await fetchPokemOnData(i);
        let cardElement = createCard(pokemon);
        pokemonContainer.appendChild(cardElement);
    }
}

fetchNPokemons();