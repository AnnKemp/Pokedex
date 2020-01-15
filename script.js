let button = document.getElementById('run');
let input = document.getElementById("pokemon");
let pokemonImage = document.getElementById('pokeImg');



button.addEventListener('click', function () {


fetch('https://pokeapi.co/api/v2/pokemon/'+input.value.toLowerCase() +'')
    .then(link => link.json())
    .then(data => {
        console.log(data.sprites.front_default);
        let pokeImageSource = (data.sprites.front_default);

        pokemonImage.setAttribute('src', pokeImageSource);

    });
});