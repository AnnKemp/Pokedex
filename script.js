let button = document.getElementById('run');
let input = document.getElementById("pokemon");
let pokemonImage = document.getElementById('pokeImg');
let evoImage = document.getElementById('evoImg');
let shinyImage = document.getElementById('shinyImg');
let nextImage = document.getElementById('nextImg');

button.addEventListener('click', function () {

    getPrevo();
    getShiny();
    fetch('https://pokeapi.co/api/v2/pokemon/' + input.value.toLowerCase() + '')
        .then(link => link.json())
        .then(data => {

            //console.log(data.name);
            // console.log(data.sprites.front_default);
            let pokeImageSource = (data.sprites.front_default);
            pokemonImage.setAttribute('src', pokeImageSource);
            let id = data.id;
            document.getElementById("pokeId").innerHTML = id;

            let pokeName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            // console.log(pokeName);
            document.getElementById('pokeName').innerHTML = pokeName;
            let pokemonId = document.getElementById("pokeId").innerText;

            // poke moves
            let pokeMovesNewArray = []; // empty array for poke moves

            for (let i = 0; i < data.moves.length; i++) {
                pokeMovesNewArray.push(data.moves[i].move.name);
            }

            let randomMove;
            let randomFourMoves;

            for (let i = 0; i < 4; i++) {
                randomMove = Math.floor(Math.random() * pokeMovesNewArray.length);
                randomFourMoves = pokeMovesNewArray[randomMove];
                // console.log(randomFourMoves);
                document.getElementById('pokeMove' + (i + 1) + '').innerHTML = randomFourMoves;
            }

            let pokeWeight = data.weight;
            document.getElementById('weightPoke').innerHTML = ('Weight: ' + pokeWeight);


            // abilities
            let abilitiesNewArray = [];
            let pokeAbilities;

            for (let i = 0; i < data.abilities.length; i++) { // to get all elements from the array
                pokeAbilities = abilitiesNewArray.push(data.abilities[i].ability.name); // to add new array + to select abilities specifically from the array
                pokeAbilities = abilitiesNewArray[Math.floor(Math.random() * abilitiesNewArray.length)]; // to make the selection randomly
                document.getElementById('abilitiesPoke').innerHTML = ('Ability: ' + pokeAbilities); // to get element id from the html and display new array
            }
            if (isNaN(input.value) == false) {
                input.value = data.name;
            }
            console.log(input.value);
        })


});


// DISCLAIMER I forgot that I could just print the entire chain so I wrote this madness instead


async function getPrevo() {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${input.value.toLowerCase()}`);
    let evolutionData = await response.json();

    if (evolutionData.evolves_from_species == null) {
        document.getElementById('prevEvolution').innerHTML = "";
        evoImage.setAttribute("src", "")
    } else {
        const preName = evolutionData.evolves_from_species.name;
        document.getElementById('prevEvolution').innerHTML = "previous evolution: " + preName;
        preForm(preName);
    }

    nextEvo = evolutionData.evolution_chain.url;
    getNext(nextEvo);
}

async function preForm(prevolution) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${prevolution}`);
    let preData = await response.json();
    //console.log(preData.sprites);
    let pokemonSprite = preData.sprites.front_default;

    evoImage.setAttribute("src", pokemonSprite);
    // console.log(pokemonSprite);
}


async function getShiny() {


    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.value.toLowerCase()}`);
    let shinyData = await response.json();
    let shinySprite = shinyData.sprites.front_shiny;
    shinyImage.setAttribute("src", shinySprite);


}

async function getNext(speciesUrl) {
    //console.log(speciesUrl);

    let nextForm;
    let response = await fetch(speciesUrl);
    let nextData = await response.json();
    //console.log(nextData);
    console.log(nextData.chain.evolves_to[0]);


    if (nextData.chain.evolves_to[0] == undefined) {
        nextForm = "";
    }
    //checks for BABY pokemon
    else if (input.value == nextData.chain.species.name) {
        console.log("sameName");
        nextForm = nextData.chain.evolves_to[0].species.name;
        console.log(nextForm);
    }

    //checks for NO NEXT evolution in 2FORM pokemon
    else if (nextData.chain.evolves_to[0].evolves_to[0] == undefined) {
        console.log("no next");
        nextForm = "";
    } else if (input.value == nextData.chain.evolves_to[0].species.name) {
        nextForm = nextData.chain.evolves_to[0].evolves_to[0].species.name;
    } else {

        nextForm = "";
    }

    setNext(nextForm)
}

async function setNext(nextName) {

    if (nextName == "") {
        nextImage.setAttribute("src", "");
    }

    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nextName.toLowerCase()}`);
    let setNextData = await response.json();
    let nextSprite = setNextData.sprites.front_default;
    nextImage.setAttribute("src", nextSprite);


}
