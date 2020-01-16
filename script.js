let button = document.getElementById('run');
let input = document.getElementById("pokemon");
let pokemonImage = document.getElementById('pokeImg');
let evoImage = document.getElementById('evoImg');
let shinyImage = document.getElementById('shinyImg');

button.addEventListener('click', function () {

    getPrevo();
    getShiny();
    fetch('https://pokeapi.co/api/v2/pokemon/' + input.value.toLowerCase() + '')
        .then(link => link.json())
        .then(data => {
            //console.log(data);
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


        })


});


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
}

async function preForm(prevolution) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${prevolution}`);
    let preData = await response.json();
    //console.log(preData.sprites);
    let pokemonSprite = preData.sprites.front_default;

    evoImage.setAttribute("src", pokemonSprite);
    console.log(pokemonSprite);
}


async function getShiny() {


    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.value.toLowerCase()}`);
    let shinyData = await response.json();
    let shinySprite = shinyData.sprites.front_shiny;
    shinyImage.setAttribute("src", shinySprite);


}


// //fetch next evo
// fetch(evolutionUrl)
//     .then(link => link.json())
//     .then(data => {
//
//
//         //console.log(data);
//         //console.log(data.chain);
//         // final evolution
//         console.log(data.chain.evolves_to[0].evolves_to[0].species)
//
//
//
//     });