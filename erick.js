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

        // poke moves
        let pokeMovesNewArray= []; // empty array for poke moves

        for (let i = 0; i < data.moves.length; i++) {
           pokeMovesNewArray.push(data.moves[i].move.name);
            }

        for (let i = 0; i < 4; i++) {
            let randomMove= Math.floor(Math.random()*pokeMovesNewArray.length);
            let randomFourMoves = pokeMovesNewArray[randomMove];
            document.getElementById('pokeMoves').innerHTML = randomFourMoves;
            }


        });

});

/*

// let fourRandomMoves = pokeMovesNewArray.push[Math.floor(Math.random()*pokeMoves)];
// console.log(fourRandomMoves);

let fourPokeVar = pokeMovesNewArray.push(data.moves[i].move.name);
fourPokeMoves.push[Math.floor(Math.random()*fourPokeVar)];
 */