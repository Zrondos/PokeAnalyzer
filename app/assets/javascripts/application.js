// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .
class Pokemon{
    constructor(data,position){
        this.name=data.name
        this.hp=data.stats[5].base_stat
        this.attack=data.stats[4].base_stat
        this.defense=data.stats[3].base_stat
        this.special_attack=data.stats[2].base_stat
        this.special_defense=data.stats[1].base_stat
        this.speed=data.stats[0].base_stat
        this.position=position
        var abilities_length=data.abilities.length
        var abilities_array=[]
        for (var i = 0; i < abilities_length; i++) { 
            abilities_array.push(data.abilities[i].ability.name)
        }
        this.abilities=abilities_array
        var type_length=data.types.length
        var type_array=[]
        for (var i=0; i<type_length; i++){
            type_array.push(data.types[i].type.name)
        }
        this.type=[type_array]
        this.type_factors=type_weakness(type_array)
        }

        
}

var type_effectiveness_hash={
    normal: {
        type: "normal",
        weakness: ["fighting"],
        resistance: [],
        immunity: ["ghost"]
    },
    fire:{
        type: "fire",
        weakness: ["water", "ground", "rock"],
        resistance: ["fire", "grass", "ice", "bug", "steel", "fairy"],
        immunity: []
    },
    water:{
        type: "water",
        weakness: ["grass", "electric"],
        resistance: ["fire", "water", "ice", "steel"],
        immunity: []
    },
    grass:{
        type: "grass",
        weakness: ["fire", "ice", "poison", "flying", "bug"],
        resistance: ["water", "grass", "electric", "ground"],
        immunity: []
    },
    electric:{
        type: "electric",
        weakness: ["ground"],
        resistance: ["electric","flying", "steel"],
        immunity: []
    },
    ice:{
        type: "ice",
        weakness: ["fire", "fighting", "rock", "steel"],
        resistance: ["ice"],
        immunity: []
    },
    fighting:{
        type: "fighting",
        weakness: ["flying","psychic","fairy"],
        resistance: ["bug","rock","dark"],
        immunity: []
    },
    poison:{
        type: "poison",
        weakness: ["ground","psychic"],
        resistance: ["grass","fighting","poison","bug","fairy"],
        immunity: []
    },
    ground:{
        type: "ground",
        weakness: ["water","grass","ice"],
        resistance: ["poison","rock"],
        immunity: ["electric"]
    },
    flying:{
        type: "flying",
        weakness: ["electric","ice","rock"],
        resistance: ["grass","fighting","bug"],
        immunity: ["ground"]
    },
    psychic:{
        type: "psychic",
        weakness: ["bug","ghost","dark"],
        resistance: ["fighting","psychic"],
        immunity: []
    },
    bug:{
        type: "bug",
        weakness: ["fire","flying","rock"],
        resistance: ["grass","fighting","ground"],
        immunity: []
    },
    rock:{
        type: "rock",
        weakness: ["water","grass","fighting","ground","steel"],
        resistance: ["normal","fire","poison","flying"],
        immunity: []
    },
    ghost:{
        type: "ghost",
        weakness: ["ghost","dark"],
        resistance: ["poison","bug"],
        immunity: ["normal","fighting"]
    },
    dragon:{
        type: "dragon",
        weakness: ["ice","dragon","fairy"],
        resistance: ["fire","water","grass","electric"],
        immunity: []
    },
    dark:{
        type: "dark",
        weakness: ["fighting","bug","fairy"],
        resistance: ["ghost","dark"],
        immunity: ["psychic"]
    },
    steel:{
        type: "steel",
        weakness: ["fire","fighting","ground"],
        resistance: ["normal","grass","ice","flying","psychic","bug","rock","dragon","steel","fairy"],
        immunity: ["poison"]
    },
    fairy:{
        type: "fairy",
        weakness: ["poison","steel"],
        resistance: ["fighting","bug","dark"],
        immunity: ["dragon"]
    }
}

/////////////////////////////////////
function type_weakness(type_array){
    //type_effectiveness_array=[[weakness],[resistance],[immunity]]
    type_factors={
        normal: 1,
        fire: 1,
        water: 1,
        grass: 1,
        electric: 1,
        ice: 1,
        fighting: 1,
        poison: 1,
        ground: 1,
        flying: 1,
        psychic: 1,
        bug: 1,
        rock: 1,
        ghost: 1,
        dragon: 1,
        dark: 1,
        steel: 1,
        fairy:1
    }
    
    for (var i=0; i<type_array.length; i++){
        current_type=type_array[i]
        for (var j=0; j<type_effectiveness_hash[current_type].weakness.length; j++){
            type_factors[type_effectiveness_hash[current_type].weakness[j]]*=2
        }
        for (var j=0; j<type_effectiveness_hash[current_type].resistance.length; j++){
            type_factors[type_effectiveness_hash[current_type].resistance[j]]*=.5
        }
        for (var j=0; j<type_effectiveness_hash[current_type].immunity.length; j++){
            type_factors[type_effectiveness_hash[current_type].immunity[j]]*=0
        }

    }

    var display_type_factors=document.createElement("div")
    display_type_factors.setAttribute("class",`type_factors`)
    Object.keys(type_factors).forEach(function (key) { 
        var list_item=document.createElement("p")
        list_item.innerHTML=`${key}: ${type_factors[key]}`
        display_type_factors.appendChild(list_item)
    })
    document.getElementById("team_analysis").appendChild(display_type_factors)
    display_type_factors=""
    
    
}





function randomize(){
    number=Math.floor((Math.random() * 721) + 1);
    pokemonCall1= axios.get(`https://fizal.me/pokeapi/api/${number}.json`)

    number=Math.floor((Math.random() * 700) + 1);
    pokemonCall2= axios.get(`https://fizal.me/pokeapi/api/${number}.json`)

    number=Math.floor((Math.random() * 700) + 1);
    pokemonCall3= axios.get(`https://fizal.me/pokeapi/api/${number}.json`)

    number=Math.floor((Math.random() * 700) + 1);
    pokemonCall4= axios.get(`https://fizal.me/pokeapi/api/${number}.json`)

    number=Math.floor((Math.random() * 700) + 1);
    pokemonCall5= axios.get(`https://fizal.me/pokeapi/api/${number}.json`)

    number=Math.floor((Math.random() * 700) + 1);
    pokemonCall6= axios.get(`https://fizal.me/pokeapi/api/${number}.json`)
    
    axios.all([pokemonCall1, pokemonCall2, pokemonCall3, pokemonCall4, pokemonCall5, pokemonCall6])
.then(function (responses) {
    for (i=1; i<=6; i++){
        pokemon= new Pokemon(responses[i-1].data,i)
        var gif = document.createElement("img");
        gif.setAttribute("src", `https://www.smogon.com/dex/media/sprites/xy/${pokemon["name"]}.gif`);
        gif.setAttribute("class","pokemon_gif");

        var name=document.createElement("p")
        var hp=document.createElement("p")
        var attack=document.createElement("p")
        var defense=document.createElement("p")
        var special_attack=document.createElement("p")
        var special_defense=document.createElement("p")
        var speed=document.createElement("p")
        name.innerHTML=pokemon["name"].toUpperCase()
        hp.innerHTML=`Hp:${pokemon["hp"]}`
        attack.innerHTML=`Attack:${pokemon["attack"]}`
        defense.innerHTML=`Defense:${pokemon["defense"]}`
        special_attack.innerHTML=`Special Attack: ${pokemon["special_attack"]}`
        special_defense.innerHTML=`Special Defense: ${pokemon["special_defense"]}`
        speed.innerHTML=`Speed: ${pokemon["speed"]}`

        pokemon_stats = document.createElement('div');
        pokemon_stats.setAttribute("id", "pokemon_stats");
        pokemon_stats.appendChild(name)
        pokemon_stats.appendChild(hp)
        pokemon_stats.appendChild(attack)
        pokemon_stats.appendChild(defense)
        pokemon_stats.appendChild(special_attack)
        pokemon_stats.appendChild(special_defense)
        pokemon_stats.appendChild(speed)
        
        document.getElementById(`pokemon_${i}`).innerHTML=""
        document.getElementById(`pokemon_${i}`).appendChild(gif)
        document.getElementById(`pokemon_${i}`).appendChild(pokemon_stats)
                
        
        document.getElementById(`team_pokemon_${i}`).value=JSON.stringify(pokemon)

    }  
}
)
}

position=1
function get_pokemon(number){
    axios.get(`https://fizal.me/pokeapi/api/${number}.json`).then(
        function (response)
            {   pokemon= new Pokemon(response.data)

                var gif = document.createElement("img");
                gif.setAttribute("src", `https://www.smogon.com/dex/media/sprites/xy/${pokemon["name"]}.gif`);
                gif.setAttribute("class","pokemon_gif");
        
                var name=document.createElement("p")
                var hp=document.createElement("p")
                var attack=document.createElement("p")
                var defense=document.createElement("p")
                var special_attack=document.createElement("p")
                var special_defense=document.createElement("p")
                var speed=document.createElement("p")
                
                name.innerHTML=`Name: ${pokemon["name"]}`
                hp.innerHTML=`Hp:${pokemon["hp"]}`
                attack.innerHTML=`Attack:${pokemon["attack"]}`
                defense.innerHTML=`Defense:${pokemon["defense"]}`
                special_attack.innerHTML=`Special Attack: ${pokemon["special_attack"]}`
                special_defense.innerHTML=`Special Defense: ${pokemon["special_defense"]}`
                speed.innerHTML=`Speed: ${pokemon["speed"]}`

        
                pokemon_stats = document.createElement('div');
                pokemon_stats.setAttribute("id", "pokemon_stats");
                pokemon_stats.appendChild(name)
                pokemon_stats.appendChild(hp)
                pokemon_stats.appendChild(attack)
                pokemon_stats.appendChild(defense)
                pokemon_stats.appendChild(special_attack)
                pokemon_stats.appendChild(special_defense)
                pokemon_stats.appendChild(speed)
                
                document.getElementById(`pokemon_${position}`).innerHTML=""
                document.getElementById(`pokemon_${position}`).appendChild(gif)
                document.getElementById(`pokemon_${position}`).appendChild(pokemon_stats)
                        
                
                document.getElementById(`team_pokemon_${position}`).value=JSON.stringify(pokemon)

                
                if (position<6){
                    position+=1
                }
            }
    )
}


function analyze(pokemon_1,pokemon_2,pokemon_3,pokemon_4,pokemon_5,pokemon_6){
    pokemon_1=JSON.parse(pokemon_1);
    pokemon_2=JSON.parse(pokemon_2);
    pokemon_3=JSON.parse(pokemon_3);
    pokemon_4=JSON.parse(pokemon_4);
    pokemon_5=JSON.parse(pokemon_5);
    pokemon_6=JSON.parse(pokemon_6);

    attack_average=(pokemon_1["attack"]+pokemon_2["attack"]+pokemon_3["attack"]+pokemon_4["attack"]+pokemon_5["attack"]+pokemon_6["attack"])/6;
    defense_average=(pokemon_1["defense"]+pokemon_2["defense"]+pokemon_3["defense"]+pokemon_4["defense"]+pokemon_5["defense"]+pokemon_6["defense"])/6;
    special_attack_average=(pokemon_1["special_attack"]+pokemon_2["special_attack"]+pokemon_3["special_attack"]+pokemon_4["special_attack"]+pokemon_5["special_attack"]+pokemon_6["special_attack"])/6;
    special_defense_average=(pokemon_1["special_defense"]+pokemon_2["special_defense"]+pokemon_3["special_defense"]+pokemon_4["special_defense"]+pokemon_5["special_defense"]+pokemon_6["special_defense"])/6;
    speed_average=(pokemon_1["speed"]+pokemon_2["speed"]+pokemon_3["speed"]+pokemon_4["speed"]+pokemon_5["speed"]+pokemon_6["speed"])/6;
    hp_average=(pokemon_1["hp"]+pokemon_2["hp"]+pokemon_3["hp"]+pokemon_4["hp"]+pokemon_5["hp"]+pokemon_6["hp"])/6;

    

    attack_total=(attack_average*6)+(special_attack_average*6)
    defense_total=(defense_average*6)+(special_defense_average*6)
    attack_defense_total=attack_total+defense_total
    attack_fraction=attack_total/attack_defense_total

}

function func(){
    axios.get('https://www.smogon.com/stats/2014-11/chaos/uu-1760.json').then(
        function (response){
            console.log(response)
        }
    )

}

