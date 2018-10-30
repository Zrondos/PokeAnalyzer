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
    constructor(data){
        this.name=data.name
        this.hp=data.stats[5].base_stat
        this.attack=data.stats[4].base_stat
        this.defense=data.stats[3].base_stat
        this.special_attack=data.stats[2].base_stat
        this.special_defense=data.stats[1].base_stat
        this.speed=data.stats[0].base_stat
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
        
        }
}

function type_weakness(type_array){
    //type_effectiveness_array=[[weakness],[resistance],[immunity]]
    var normal_type_effectiveness={
        type: "normal",
        weakness: ["fighting"],
        resistance: [],
        immunity: ["ghost"]
    }
    var fire_type_effectiveness={
        type: "fire",
        weakness: ["water", "ground", "rock"],
        resistance=["fire", "grass", "ice", "bug", "steel", "fairy"],
        immunity: []
    }
    var water_type_effectiveness={
        type: "water",
        weakness=["grass", "electric"],
        resistance=["fire", "water", "ice", "steel"],
        immunity=[]
    }
    var grass_type_effectiveness={
        type: "grass",
        weakness=["fire", "ice", "poison", "flying", "bug"],
        resistance=["water", "grass", "electric", "ground"],
        immunity=[]
    }
    var electric_type_effectiveness={
        type: "electric",
        weakness=["ground"],
        resistance=["electric","flying"],
        immunity=[]
    }
    var ice_type_effectiveness={
        type: "ice",
        weakness=["fire", "fighting", "rock", "steel"],
        resistance=["ice"],
        immunity=[]
    }
    var fighting_type_effectiveness={
        type: "fighting",
        weakness=["flying","psychic","fairy"],
        resistance=["bug","rock","dark"],
        immunity=[]
    }
    var poison_type_effectiveness={
        type: "poison",
        weakness=["ground","psychic"],
        resistance=["grass","fighting","poison","bug","fairy"],
        immunity=[]
    }
    var ground_type_effectiveness={
        type: "ground",
        weakness=["water","grass","ice"],
        resistance=["poison","rock"],
        immunity=["electric"]
    }
    var flying_type_effectiveness={
        type: "flying",
        weakness=["electric","ice","rock"],
        resistance=["grass","fighting","bug"],
        immunity=["ground"]
    }
    var psychic_type_effectiveness={
        type: "psychic",
        weakness=["bug","ghost","dark"],
        resistance=["fighting","psychic"],
        immunity=[]
    }
    var bug_type_effectiveness={
        type: "bug",
        weakness=["fire","flying","rock"],
        resistance=["grass","fighting","ground"],
        immunity=[]
    }
    var rock_type_effectiveness={
        type: "rock",
        weakness=["water","grass","fighting","ground","steel"],
        resistance=["normal","fire","poison","flying"],
        immunity=[]
    }
    var ghost_type_effectiveness={
        type: "ghost",
        weakness=["ghost","dark"],
        resistance=["poison","bug"],
        immunity=["normal","fighting"]
    }
    var dragon_type_effectiveness={
        type: "dragon",
        weakness=["ice","dragon","fairy"],
        resistance=["fire","water","grass","electric"],
        immunity=[]
    }
    var dark_type_effectiveness={
        type: "dark",
        weakness=["fighting","bug","fairy"],
        resistance=["ghost","dark"],
        immunity=["psychic"]
    }
    var steel_type_effectiveness={
        type: "steel",
        weakness=["fire","fighting","ground"],
        resistance=["normal","grass","ice","flying","psychic","bug","rock","ghost","dragon","dark","steel","fairy"],
        immunity=["poison"]
    }
    var fairy_type_effectiveness={
        type: "fairy",
        weakness=["poison","steel"],
        resistance=["fighting","bug","dark"],
        immunity=["dragon"]
    }
    var array_of_type_effectiveness=[normal_type_effectiveness, fire_type_effectiveness, water_type_effectiveness, grass_type_effectiveness, electric_type_effectiveness, ice_type_effectiveness, fighting_type_effectiveness, poison_type_effectiveness, ground_type_effectiveness, flying_type_effectiveness, psychic_type_effectiveness, bug_type_effectiveness, rock_type_effectiveness, ghost_type_effectiveness, dragon_type_effectiveness, dark_type_effectiveness, steel_type_effectiveness, fairy_type_effectiveness]

    for (var i=0; i<type_array.length; i++){
        for (var j=0; j<array_of_type_effectiveness.length; i++){
            if array_of_type_effeciveness[j].weakness.includes(type_array[i])
        }

    }
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
        pokemon= new Pokemon(responses[i-1].data)

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
                console.log(response.data)

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



