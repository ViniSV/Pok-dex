const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonShiny = document.querySelector('.btn-shiny');

let searchPokemon = 1;
let currentPokemon = null;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon, shiny = 'front_default') => { 

    pokemonName.innerHTML ='Loading...';
    pokemonNumber.innerHTML = '';

    console.log(buttonShiny);

    const data = await fetchPokemon(pokemon);
    console.log(data.sprites[shiny]);
    if (data) {
        console.log(shiny);
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data.sprites[shiny];
        input.value = '';
        searchPokemon = data.id;
        currentPokemon = data;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :(';
        pokemonNumber.innerHTML = '';
    }


}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    input.value = '';
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});
buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
 });
buttonShiny.addEventListener('click', (event) => {
    console.log(currentPokemon);
    renderPokemon(currentPokemon.name, 'front_shiny');
 });

renderPokemon('1');