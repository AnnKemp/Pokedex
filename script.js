let button = document.getElementById('run');
let input = document.getElementById("pokemon");
let pokemonImage = document.getElementById('pokeImg');



button.addEventListener('click', function () {


fetch('https://pokeapi.co/api/v2/pokemon/'+input.value.toLowerCase() +'')
    .then(link => link.json())
    .then(data => {
        console.log(data);
        console.log(data.sprites.front_default);
        let pokeImageSource = (data.sprites.front_default);
        pokemonImage.setAttribute('src', pokeImageSource);
        let id=data.id;
        document.getElementById("pokeId").innerHTML="Poke ID: "+id;

            let pokeName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            console.log(pokeName);
            document.getElementById('pokeName').innerHTML = pokeName;


    });
});