let button = document.getElementById('run');
let input = document.getElementById("pokemon");

button.addEventListener('click', function () {

// ge zoekt op het beestje dat je ingeeft en krijgt dan die json lijst van dat specifiek beestje
    fetch('https://pokeapi.co/api/v2/pokemon/'+input.value.toLowerCase() +'')
        .then(link => link.json())
        .then(data => {
           // console.log(data);

            let id=data.id;
            document.getElementById("pokeId").innerHTML="Poke ID: "+id;


        });
});