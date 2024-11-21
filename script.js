// catturare contenitore swiper cards
let showDeck = document.querySelector('#showDeck');

// recuperare una lista di pokemon
async function getListPokemon() {
    try {
        // fare request una lista di 4 pokemon
        let result = await fetch('https://pokeapi.co/api/v2/pokemon?limit=4&offset=0');

        // recuperare la response (sotto forma di Promise) e estrapolare i dati del corpo della response tramite il metodo json()
        let data = await result.json();

        // salvare i pokemons
        let pokemons = data.results;
        console.log(pokemons);

        // creare ogni singolo pokemon andando a recuperare il nome e tutte le info attraverso la funzione getPokemon()
        pokemons.forEach(pokemon => {
            let name = pokemon.name;

            getPokemon(name);

        });
        

    } catch (error) {
        console.log(error)
    }
}

// Invocare la funzione getListPokemon
getListPokemon();

// recuperare tutte le informazioni di un pokemon specifico
async function getPokemon(name) {
    try {
        // Request per recuperare le info di un pokemon mediante il suo nome
        let result = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

        // recuperare la response (sotto forma di Promise) e estrapolare i dati del corpo della response tramite il metodo json()
        let data = await result.json();

        // salvare un'immagine del pokemon
        let sprite = data.sprites.front_default;

        // salvare il percorso del file audio del grido di battaglia del pokemon
        let cries = data.cries.latest;

        // salvare il livello di esperienza base del pokemon
        let baseExperience = data.base_experience;

        console.log(data);

        // creare la slide per l'effetto cards di Swiper
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





