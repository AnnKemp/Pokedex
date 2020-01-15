let button = document.getElementById('run');
let input = document.getElementById("pokemon");



button.addEventListener('click', function () {

    fetch('https://pokeapi.co/api/v2/pokemon/'+input.value +'')
        .then(link => link.json())
        .then(data => {
            console.log(data);

        let pokeName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        console.log(pokeName);
        document.getElementById('pokeName').innerHTML = pokeName;
        });
});
