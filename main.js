const pokemonList = document.getElementById("pokemonList");
const pokemonDetail = document.getElementById("pokemonDetail");
const pokemonInfo = document.getElementById("pokemonInfo")
const btnBack = document.getElementById("btnBack")
let inputSearch = document.getElementById("inputSearch")
let btnSearch = document.getElementById("btnSearch")


let entradaInput = ""



async function getPokemonData (pokemonID) {

    try {
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
        let pokemon = await res.json()
        // console.log(pokemon)
        return pokemon      
    } catch (error) {
        console.error(error.message)
        // return null
        return false
    }
    
}

function displayPokemon(pokemon) {
    const pokemonCard = document.createElement("div")
    // const pokemonCardTwo = document.createElement("div")

    pokemonCard.classList.add("pokemon-card")

    pokemonCard.innerHTML = `
    <img src="${pokemon.sprites.front_default}">
    <h3>${pokemon.name}</h3>
    <p> ID: ${pokemon.id} </p>
    `

    pokemonCard.addEventListener("click", () => showPokemonDetail(pokemon))
    pokemonList.appendChild(pokemonCard)

    // pokemonCardTwo.innerHTML = `
    // <img src="${pokemon.sprites.back_shiny}">
    // `
    
    // pokemonList.appendChild(pokemonCardTwo)
}

function showPokemonDetail(pokemon){
    pokemonList.style.display = "none"
    pokemonDetail.style.display ="flex" //Se le pone este diplaya para que lo muestre en el html esta para qeu no lo muestre

 // <p> Tipos: "${pokemon.types[0].type.name}</p>
    // console.log(pokemon.types[0].type.name)
    console.log(pokemon.stats.length)
    console.log(pokemon.stats)
    console.log(pokemon.stats[0].stat.name)
    console.log(pokemon.stats[0].base_stat)

    let nameStat = "";
    let baseStat = 0;

    for ( let i = 0; i < pokemon.stats.length; i++){
        nameStat += (pokemon.stats[i].stat.name ) + " "
        baseStat += (pokemon.stats[i].base_stat) + " "
        // baseStat.push(pokemon.stats[i].base_stat)
    }

    console.log(pokemon.types.length)

    let tipos = ' ';
    // let typesName = []
    let typesImg = ""

    for( let i = 0; i<pokemon.types.length; i++){
        console.log(pokemon.types[i].type.name)

        typesImg = typesImg + `<img src= "./assets/${pokemon.types[i].type.name}.jpg" alt="logo tipo ${pokemon.types[i].type.name}">`

        // typesName.push(pokemon.types[i].type.name)

        tipos += pokemon.types[i].type.name + " "      
    }

    pokemonInfo.innerHTML = `
    <img src= "${pokemon.sprites.front_default}" alt="image view front ${pokemon.name}">
    <img src= "${pokemon.sprites.back_default}" alt="image view back ${pokemon.name}">
    <p> Tipos: ${tipos}</p>
    <div>${typesImg}</div>
    <ul> <li>${nameStat} </li> </lu>
    <ul> <li>${baseStat}  </li> </lu>
    `
}


async function loadPokedex() {

    for(let i=1; i<=50; i++){
        let pokemon = await getPokemonData(i)
        //  console.log(pokemon.types[0].type.name)
        displayPokemon(pokemon)
       
    }
}

btnBack.addEventListener("click", () => {
    pokemonList.style.display = "grid"
    pokemonDetail.style.display ="none"
})


// console.log(getPokemonData(2))



//Codigo para realizar la busqueda
inputSearch.addEventListener("input", (evento) => {
    entradaInput = evento.target.value
    console.log(entradaInput)
})

btnSearch.addEventListener("click", async () => {
    let pokemon = await getPokemonData(entradaInput)
    if(pokemon == false){
        console.error("Pokemon not  found")
        return alert ("Pokemon not  found")
    }
    showPokemonDetail(pokemon)  
})

loadPokedex()