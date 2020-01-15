let button = document.getElementById('run');
let input = document.getElementById("pokemon");



button.addEventListener('click', function () {

    fetch('https://pokeapi.co/api/v2/pokemon/'+input.value +'')
        .then(link => link.json())
        .then(data => {
            console.log(data);

        // poke name
        let pokeName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        console.log(pokeName);
        document.getElementById('pokeName').innerHTML = pokeName;

        // weight
        let pokeWeight = data.weight;
        document.getElementById('weightPoke').innerHTML= ('Weight: ' + pokeWeight);

        // abilities
            for (let i = 0; i < data.abilities.length; i++) {
                let abilitiesPokeVar = data.abilities[i].ability.name;
                document.getElementById('abilitiesPoke').innerHTML = abilitiesPokeVar;
            }

        // poke moves
        let pokeMovesNewArray= []; // empty array for poke moves

        for (let i = 0; i < data.moves.length; i++) {
           pokeMovesNewArray.push(data.moves[i].move.name);
            }

        let randomMove;
        let randomFourMoves;

            for (let i = 0; i < 4; i++) {
                randomMove= Math.floor(Math.random()*pokeMovesNewArray.length);
                randomFourMoves = pokeMovesNewArray[randomMove];
                console.log(randomFourMoves);
                document.getElementById('pokeMove'+(i+1)+'').innerHTML = randomFourMoves;
        }


        });

});

/*

// let fourRandomMoves = pokeMovesNewArray.push[Math.floor(Math.random()*pokeMoves)];
// console.log(fourRandomMoves);

let fourPokeVar = pokeMovesNewArray.push(data.moves[i].move.name);
fourPokeMoves.push[Math.floor(Math.random()*fourPokeVar)];
 */