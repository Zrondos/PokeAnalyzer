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
//= require Chart.min
var pokemon_team_hash={};

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
        this.type=type_array
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
    return type_factors 
}

function randomize(){
    for (var i=0; i<6; i++){
        
        number=Math.floor((Math.random() * 721) + 1);
        get_pokemon(number)
        // console.log(passed.resolve)
        // console.log(passed)
        // if (!passed){
        //     i-=1;
        //     continue
        // }
    }
    position=1
}

position=1
function get_pokemon(number){
    

    axios.get(`https://fizal.me/pokeapi/api/${number}.json`).then(
        function (responses) {
                pokemon= new Pokemon(responses.data,position)

                pokemon_team_hash[position]=pokemon

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

                // display_type_factors=document.createElement("div")
                // display_type_factors.setAttribute("id",'type_factors')

                document.getElementById(`pokemon_${position}_times_4`).innerHTML=""
                document.getElementById(`pokemon_${position}_times_2`).innerHTML=""
                document.getElementById(`pokemon_${position}_times_1`).innerHTML=""
                document.getElementById(`pokemon_${position}_times_half`).innerHTML=""
                document.getElementById(`pokemon_${position}_times_quarter`).innerHTML=""

                var type_factors=type_weakness(pokemon.type)

                times_4=document.createElement("div")
                title=document.createElement("p")
                title.innerHTML="4x Damange"
                times_4.appendChild(title)

                times_2=document.createElement("div")
                title=document.createElement("p")
                title.innerHTML="2x Damange"
                times_2.appendChild(title)

                times_1=document.createElement("div")
                title=document.createElement("p")
                title.innerHTML="1x Damange"
                times_1.appendChild(title)

                times_half=document.createElement("div")
                title=document.createElement("p")
                title.innerHTML="0.5x Damange"
                times_half.appendChild(title)
                

                times_quarter=document.createElement("div")
                title=document.createElement("p")
                title.innerHTML="0.25x Damange"
                times_quarter.appendChild(title)


                Object.keys(type_factors).forEach(function (key) { 
                    var list_item=document.createElement("span")
                    if (type_factors[key]==4){
                        times_4.appendChild(list_item)
                    }
                    else if (type_factors[key]==2){
                        times_2.appendChild(list_item)
                        list_item.innerHTML=`${key}`
                    }
                    else if (type_factors[key]==1){
                        times_1.appendChild(list_item)
                        list_item.innerHTML=key
                    }
                    else if (type_factors[key]==.5){
                        times_half.appendChild(list_item)
                        list_item.innerHTML=key
                    }
                    else if (type_factors[key]==.25){
                        times_quarter.appendChild(list_item)
                        list_item.innerHTML=key
                    }                    
                })
                
                // display_type_factors.appendChild(times_4)
                // display_type_factors.appendChild(times_2)
                // display_type_factors.appendChild(times_1)
                // display_type_factors.appendChild(times_half)
                // display_type_factors.appendChild(times_quarter)
                
                document.getElementById(`pokemon_${position}_gif`).innerHTML="";
                document.getElementById(`pokemon_${position}_gif`).style.grid_row_start="1";
                document.getElementById(`pokemon_${position}_gif`).appendChild(gif)

                document.getElementById(`pokemon_${position}_stats`).innerHTML="";
                document.getElementById(`pokemon_${position}_stats`).style.grid_row_start="2";
                document.getElementById(`pokemon_${position}_stats`).appendChild(pokemon_stats)
                
                document.getElementById(`pokemon_${position}_times_4`).appendChild(times_4)
                document.getElementById(`pokemon_${position}_times_2`).appendChild(times_2)
                document.getElementById(`pokemon_${position}_times_1`).appendChild(times_1)
                document.getElementById(`pokemon_${position}_times_half`).appendChild(times_half)
                document.getElementById(`pokemon_${position}_times_quarter`).appendChild(times_quarter)

                document.getElementById(`pokemon_${position}_times_4`).style.borderTop="2px solid black"
                document.getElementById(`pokemon_${position}_times_2`).style.borderTop="2px solid black"
                document.getElementById(`pokemon_${position}_times_half`).style.borderTop="2px solid black"
                document.getElementById(`pokemon_${position}_times_quarter`).style.borderTop="2px solid black"
                
                if (position<6){
                    position+=1
                }
            }
    ) 
    
}

function analyze_team_stats(){
    pokemon_1=pokemon_team_hash[1];
    pokemon_2=pokemon_team_hash[2];
    pokemon_3=pokemon_team_hash[3];
    pokemon_4=pokemon_team_hash[4];
    pokemon_5=pokemon_team_hash[5];
    pokemon_6=pokemon_team_hash[6];

    attack_average=(pokemon_1["attack"]+pokemon_2["attack"]+pokemon_3["attack"]+pokemon_4["attack"]+pokemon_5["attack"]+pokemon_6["attack"])/6;
    defense_average=(pokemon_1["defense"]+pokemon_2["defense"]+pokemon_3["defense"]+pokemon_4["defense"]+pokemon_5["defense"]+pokemon_6["defense"])/6;
    special_attack_average=(pokemon_1["special_attack"]+pokemon_2["special_attack"]+pokemon_3["special_attack"]+pokemon_4["special_attack"]+pokemon_5["special_attack"]+pokemon_6["special_attack"])/6;
    special_defense_average=(pokemon_1["special_defense"]+pokemon_2["special_defense"]+pokemon_3["special_defense"]+pokemon_4["special_defense"]+pokemon_5["special_defense"]+pokemon_6["special_defense"])/6;
    speed_average=(pokemon_1["speed"]+pokemon_2["speed"]+pokemon_3["speed"]+pokemon_4["speed"]+pokemon_5["speed"]+pokemon_6["speed"])/6;
    hp_average=(pokemon_1["hp"]+pokemon_2["hp"]+pokemon_3["hp"]+pokemon_4["hp"]+pokemon_5["hp"]+pokemon_6["hp"])/6;

    var ctx = document.getElementById("stats_chart");
    ctx.innerHTML="";
    ctx.style.display="block";
    var stats_chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Attack", "Defense", "Special Attack", "Special Defense", "HP", "Speed"],
            datasets: [{
                label: 'Stats Averages',
                data: [attack_average, defense_average, special_attack_average, special_defense_average, speed_average, hp_average],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Team Stats Averages',
                fontSize:50
            },
            legend:{
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },
            maintainAspectRatio: false
        }
    });
    stats_chart.canvas.parentNode.style.height = '500px';
    stats_chart.canvas.parentNode.style.width = '100%';
}

function analyze_team_types(){
    team_factors={
        normal:{
            very_resistant:0,
            resistant:0,
            weak:0,
            very_weak:0,
            immune: 0
        },
        fire:{
            very_resistant:0,
            resistant:0,
            weak:0,
            very_weak:0,
            immune: 0
        },
        water:{
            very_resistant:0,
            resistant:0,
            weak:0,
            very_weak:0,
            immune: 0
        },
        grass:{
            very_resistant:0,
            resistant:0,
            weak:0,
            very_weak:0,
            immune: 0
        },
        electric:{
            very_resistant:0,
            resistant:0,
            weak:0,
            very_weak:0,
            immune: 0
        },
        ice:{
            very_resistant:0,
            resistant:0,
            weak:0,
            very_weak:0,
            immune: 0
        },
        fighting:{
            very_resistant:0,
            resistant:0,
            weak:0,
            very_weak:0,
            immune: 0
        },
        poison:{
            very_resistant:0,
            resistant:0,
            weak:0,
            very_weak:0,
            immune: 0
        },
        ground:{
            very_resistant:0,
            resistant:0,
            weak:0,
            very_weak:0,
            immune: 0
        },
        flying:{
            very_resistant:0,
            resistant:0,
            weak:0,
            very_weak:0,
            immune: 0
        },
        psychic:{
            very_resistant:0,
            resistant:0,
            weak:0,
            very_weak:0,
            immune: 0
        },
        bug:{
            very_resistant:0,
            resistant:0,
            weak:0,
            very_weak:0,
            immune: 0
        },
        rock:{
            very_resistant:0,
            resistant:0,
            weak:0,
            very_weak:0,
            immune: 0
        },
        ghost:{
            very_resistant:0,
            resistant:0,
            weak:0,
            very_weak:0,
            immune: 0
        },
        dragon:{
            very_resistant:0,
            resistant:0,
            weak:0,
            very_weak:0,
            immune: 0
        },
        dark:{
            very_resistant:0,
            resistant:0,
            weak:0,
            very_weak:0,
            immune: 0
        },
        steel:{
            very_resistant:0,
            resistant:0,
            weak:0,
            very_weak:0,
            immune: 0
        },
        fairy:{
            very_resistant:0,
            resistant:0,
            weak:0,
            very_weak:0,
            immune: 0
        }
    }

    pokemon_1=pokemon_team_hash[1];
    pokemon_2=pokemon_team_hash[2];
    pokemon_3=pokemon_team_hash[3];
    pokemon_4=pokemon_team_hash[4];
    pokemon_5=pokemon_team_hash[5];
    pokemon_6=pokemon_team_hash[6];
    
    for (var pokemon in pokemon_team_hash){
        for (var type in team_factors){
            if (pokemon_team_hash[pokemon].type_factors[type]==2){
                team_factors[type]["weak"]+=1
            }
            if (pokemon_team_hash[pokemon].type_factors[type]==4){
                team_factors[type]["very_weak"]+=1
            }
            if (pokemon_team_hash[pokemon].type_factors[type]==.5){
                team_factors[type]["resistant"]+=1
            }
            if (pokemon_team_hash[pokemon].type_factors[type]==.25){
                team_factors[type]["very_resistant"]+=1
            }
            if (pokemon_team_hash[pokemon].type_factors[type]==0){
                team_factors[type]["immune"]+=1
            }
        }
    }
    
    var container = document.getElementById("type_chart");
    container.innerHTML="";
    container.style.display="block";
    container.height=500;
    var type_chart = new Chart(container, {
        type: 'bar',
        data: {
            labels: ["Normal", "Fighting", "Flying", "Poison", "Ground", "Rock", "Bug", "Ghost", "Steel", "Fire", "Water", "Grass", "Electric", "Psychic", "Ice", "Dragon", "Dark", "Fairy"],
            datasets: [
                
                {
                label: 'Resistant',
                data: [
                    team_factors["normal"]["resistant"],
                    team_factors["fighting"]["resistant"],
                    team_factors["flying"]["resistant"],
                    team_factors["poison"]["resistant"],
                    team_factors["ground"]["resistant"],
                    team_factors["rock"]["resistant"],
                    team_factors["bug"]["resistant"],
                    team_factors["ghost"]["resistant"],
                    team_factors["steel"]["resistant"],
                    team_factors["fire"]["resistant"],
                    team_factors["water"]["resistant"],
                    team_factors["grass"]["resistant"],
                    team_factors["electric"]["resistant"],
                    team_factors["psychic"]["resistant"],
                    team_factors["ice"]["resistant"],
                    team_factors["dragon"]["resistant"],
                    team_factors["dark"]["resistant"],
                    team_factors["fairy"]["resistant"],
            ],


                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)'

                ],
                borderColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)'

                ],
                borderWidth: 1
            },
            {
                
                label: 'Weak',
                data: [
                    team_factors["normal"]["weak"],
                    team_factors["fighting"]["weak"],
                    team_factors["flying"]["weak"],
                    team_factors["poison"]["weak"],
                    team_factors["ground"]["weak"],
                    team_factors["rock"]["weak"],
                    team_factors["bug"]["weak"],
                    team_factors["ghost"]["weak"],
                    team_factors["steel"]["weak"],
                    team_factors["fire"]["weak"],
                    team_factors["water"]["weak"],
                    team_factors["grass"]["weak"],
                    team_factors["electric"]["weak"],
                    team_factors["psychic"]["weak"],
                    team_factors["ice"]["weak"],
                    team_factors["dragon"]["weak"],
                    team_factors["dark"]["weak"],
                    team_factors["fairy"]["weak"],
            ],


                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)'

                ],
                borderColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderWidth: 1
            },
            {
                label: 'Very Resistant',
                data: [
                    team_factors["normal"]["very_resistant"],
                    team_factors["fighting"]["very_resistant"],
                    team_factors["flying"]["very_resistant"],
                    team_factors["poison"]["very_resistant"],
                    team_factors["ground"]["very_resistant"],
                    team_factors["rock"]["very_resistant"],
                    team_factors["bug"]["very_resistant"],
                    team_factors["ghost"]["very_resistant"],
                    team_factors["steel"]["very_resistant"],
                    team_factors["fire"]["very_resistant"],
                    team_factors["water"]["very_resistant"],
                    team_factors["grass"]["very_resistant"],
                    team_factors["electric"]["very_resistant"],
                    team_factors["psychic"]["very_resistant"],
                    team_factors["ice"]["very_resistant"],
                    team_factors["dragon"]["very_resistant"],
                    team_factors["dark"]["very_resistant"],
                    team_factors["fairy"]["very_resistant"]
            
            ],


                backgroundColor: [

                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(255, 206, 86, 0.2)'

                ],
                borderColor: [

                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)'

                ],
                borderWidth: 1
            },
            {
                label: 'Very weak',
                data: [
                    team_factors["normal"]["very_weak"],
                    team_factors["fighting"]["very_weak"],
                    team_factors["flying"]["very_weak"],
                    team_factors["poison"]["very_weak"],
                    team_factors["ground"]["very_weak"],
                    team_factors["rock"]["very_weak"],
                    team_factors["bug"]["very_weak"],
                    team_factors["ghost"]["very_weak"],
                    team_factors["steel"]["very_weak"],
                    team_factors["fire"]["very_weak"],
                    team_factors["water"]["very_weak"],
                    team_factors["grass"]["very_weak"],
                    team_factors["electric"]["very_weak"],
                    team_factors["psychic"]["very_weak"],
                    team_factors["ice"]["very_weak"],
                    team_factors["dragon"]["very_weak"],
                    team_factors["dark"]["very_weak"],
                    team_factors["fairy"]["very_weak"]
            
            ],


                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)'

                ],
                borderColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderWidth: 1 
            },
            {
                label: 'Immune',
                data: [
                    team_factors["normal"]["immune"],
                    team_factors["fighting"]["immune"],
                    team_factors["flying"]["immune"],
                    team_factors["poison"]["immune"],
                    team_factors["ground"]["immune"],
                    team_factors["rock"]["immune"],
                    team_factors["bug"]["immune"],
                    team_factors["ghost"]["immune"],
                    team_factors["steel"]["immune"],
                    team_factors["fire"]["immune"],
                    team_factors["water"]["immune"],
                    team_factors["grass"]["immune"],
                    team_factors["electric"]["immune"],
                    team_factors["psychic"]["immune"],
                    team_factors["ice"]["immune"],
                    team_factors["dragon"]["immune"],
                    team_factors["dark"]["immune"],
                    team_factors["fairy"]["immune"]
            
            ],


                backgroundColor: [
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderWidth: 1 
            }

        ]
        },
        options: {
            title: {
                display: true,
                text: 'Team Type Strengths and Weaknesses',
                fontSize:50
            },
            scales: {
                yAxes: [{
                    girdLines: {
                        display: false,
                        color: "rgba(255, 0, 0, 1)"
                    }
                }],
                xAxes: [{
                    girdLines: {
                        display: false,
                        color: "rgba(255, 0, 0, 1)"
                    }
                }]
            },
            maintainAspectRatio: false
        }
    });
}

function analyze(){
    analyze_team_stats();
    analyze_team_types();
}