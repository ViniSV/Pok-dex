const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const card = document.querySelector('.card_body');
const searchResults = document.getElementById('searchResults');

const buttonShiny = document.querySelector('.btn-shiny');
const buttonAdd = document.querySelector('btn-add');

const addPokemonToFavorites = (pokemon) => {
    const favoritesList = document.getElementById('favoritesList');
    
    // Cria um novo item na lista de favoritos
    const listItem = document.createElement('li');
    listItem.textContent = `${pokemon.name} (#${pokemon.id}) `;
    
    // Botão para remover o Pokémon dos favoritos
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover dos Favoritos';
    removeButton.addEventListener('click', () => {
        favoritesList.removeChild(listItem);
    });

    // Adiciona o botão de remover ao item da lista
    listItem.appendChild(removeButton);
    
    // Adiciona o item à lista de favoritos
    favoritesList.appendChild(listItem);

    buttonAdd.addEventListener('click', (event) => {
        console.log(buttonAdd);
        addPokemonToFavorites(pokemon.name);
    });
    listItem.appendChild(buttonAdd);
    console.log(pokemon);
};

let searchPokemon = 1;
let currentPokemon = null;

// Função para buscar dados do Pokémon na PokeAPI
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}
//função pra renderizar o pokemon na tela
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
//mostra o pokemon pelo valor do input
form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    input.value = '';
});
buttonShiny.addEventListener('click', (event) => {
    console.log(currentPokemon.name);
    renderPokemon(currentPokemon.name, 'front_shiny');
 });


console.log(searchPokemon);
console.log(currentPokemon);
renderPokemon('1');
/*botão para adicionar pegando o nome ou número*/