let button = document.getElementById('run');
let input = document.getElementById("pokemon");
let pokemonImage = document.getElementById('pokeImg');


button.addEventListener('click', function () {


    fetch('https://pokeapi.co/api/v2/pokemon/' + input.value.toLowerCase() + '')
        .then(link => link.json())
        .then(data => {
           // console.log(data.sprites.front_default);
            let pokeImageSource = (data.sprites.front_default);
            pokemonImage.setAttribute('src', pokeImageSource);
            let id = data.id;
            document.getElementById("pokeId").innerHTML = id;

            let pokeName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
           // console.log(pokeName);
            document.getElementById('pokeName').innerHTML = pokeName;
            let pokemonId = document.getElementById("pokeId").innerText;





            //fetch prev evo
            fetch('https://pokeapi.co/api/v2/pokemon-species/' + pokemonId + '')
                .then(link => link.json())
                .then(data => {

                    let previousEvo = data.evolves_from_species.name;

                    document.getElementById('prevEvolution').innerHTML = "previous evolution: "+data.evolves_from_species.name;
                    console.log(data.evolution_chain.url);
                    let evolutionUrl = data.evolution_chain.url;






                    //fetch next evo
                    fetch(evolutionUrl)
                        .then(link => link.json())
                        .then(data => {


                            //console.log(data);
                            //console.log(data.chain);
                            // final evolution
                            console.log(data.chain.evolves_to[0].evolves_to[0].species)



                        });


                })
                .catch(error => document.getElementById('prevEvolution').innerHTML = "");


        });



});