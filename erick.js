let button = document.getElementById('run');
let input = document.getElementById("pokemon");

button.addEventListener('click', function () {

    fetch('https://pokeapi.co/api/v2/pokemon/' + input.value + '')
        .then(link => link.json())
        .then(data => {
            console.log(data);

            // poke name
            let pokeName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            //console.log(pokeName);
            document.getElementById('pokeName').innerHTML = pokeName;

            // weight
            let pokeWeight = data.weight;
            document.getElementById('weightPoke').innerHTML = ('Weight: ' + pokeWeight);

            // abilities
            let abilitiesNewArray = [];
            let pokeAbilities;

            for (let i = 0; i < data.abilities.length; i++) { // to get all elements from the array
                pokeAbilities = abilitiesNewArray.push(data.abilities[i].ability.name); // to add new array + to select abilities specifically from the array
                pokeAbilities = abilitiesNewArray[Math.floor(Math.random() * abilitiesNewArray.length)]; // to make the selection randomly
                document.getElementById('abilitiesPoke').innerHTML = ('Abilities: ' + pokeAbilities); // to get element id from the html and display new array
            }

            // types

            var pokeTypes1 = data.types[0].type.name;

            if (data.types.length ===1) {
                document.getElementById("pokeTypes1").innerHTML= pokeTypes1;
                document.getElementById("pokeTypes2").innerHTML= " ";
            } else {
                var pokeTypes2 = data.types[1].type.name;
                document.getElementById("pokeTypes1").innerHTML= pokeTypes1;
                document.getElementById("pokeTypes2").innerHTML= pokeTypes2;
            }

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
                //console.log(randomFourMoves);
                document.getElementById('pokeMove' + (i + 1) + '').innerHTML = randomFourMoves;
            }


        });
});

/*

// let fourRandomMoves = pokeMovesNewArray.push[Math.floor(Math.random()*pokeMoves)];
// console.log(fourRandomMoves);

let fourPokeVar = pokeMovesNewArray.push(data.moves[i].move.name);
fourPokeMoves.push[Math.floor(Math.random()*fourPokeVar)];


let button = document.getElementById('run');
let input = document.getElementById("pokemon");

input.addEventListener('keyup', function (event) {
    if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById('button').click();


*/