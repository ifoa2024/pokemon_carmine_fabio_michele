
// fetch('https://pokeapi.co/api/v2/pokemon/ditto')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json(); // Parse JSON data from the response
//   })
//   .then(data => console.log(data))
//   .catch(error => console.error('Error:', error));

let showDeck = document.querySelector('#showDeck');

async function getListPokemon() {
    try {
        let result = await fetch('https://pokeapi.co/api/v2/pokemon?limit=4&offset=0');

        let data = await result.json();
        let pokemons = data.results;
        console.log(pokemons);

        pokemons.forEach(pokemon => {
            let name = pokemon.name;

            getPokemon(name);

        });
        

    } catch (error) {
        console.log(error)
    }
}

getListPokemon();


async function getPokemon(name) {
    try {
        let result = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

        let data = await result.json();

        let sprite = data.sprites.front_default;
        let cries = data.cries.latest;
        let baseExperience = data.base_experience;

        console.log(data);

        let card = document.createElement('swiper-slide');
        card.innerHTML = `
            <h2>${name}</h2>
            <img src="${sprite}" />
            <p>${baseExperience} <i class="bi bi-heart-fill"></i></p>

            <audio controls style="width: 200px;">
                <source src="${cries}" type="audio/ogg">
                <source src="horse.mp3" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        `;
        showDeck.appendChild(card);

    } catch (error) {
        
    }
}





