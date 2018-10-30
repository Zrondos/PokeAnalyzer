class TeamsController < ApplicationController


def create
    pokemon_1=JSON.parse(params[:team][:pokemon_1])
    pokemon_2=JSON.parse(params[:team][:pokemon_2])
    pokemon_3=JSON.parse(params[:team][:pokemon_3])
    pokemon_4=JSON.parse(params[:team][:pokemon_4])
    pokemon_5=JSON.parse(params[:team][:pokemon_5])
    pokemon_6=JSON.parse(params[:team][:pokemon_6])

    attack_average=(pokemon_1["attack"]+pokemon_2["attack"]+pokemon_3["attack"]+pokemon_4["attack"]+pokemon_5["attack"]+pokemon_6["attack"])/6
    defense_average=(pokemon_1["defense"]+pokemon_2["defense"]+pokemon_3["defense"]+pokemon_4["defense"]+pokemon_5["defense"]+pokemon_6["defense"])/6
    special_attack_average=(pokemon_1["special_attack"]+pokemon_2["special_attack"]+pokemon_3["special_attack"]+pokemon_4["special_attack"]+pokemon_5["special_attack"]+pokemon_6["special_attack"])/6
    special_defense_average=(pokemon_1["special_defense"]+pokemon_2["special_defense"]+pokemon_3["special_defense"]+pokemon_4["special_defense"]+pokemon_5["special_defense"]+pokemon_6["special_defense"])/6
    speed_average=(pokemon_1["speed"]+pokemon_2["speed"]+pokemon_3["speed"]+pokemon_4["speed"]+pokemon_5["speed"]+pokemon_6["speed"])/6
    hp_average=(pokemon_1["hp"]+pokemon_2["hp"]+pokemon_3["hp"]+pokemon_4["hp"]+pokemon_5["hp"]+pokemon_6["hp"])/6

    

    respond_to do |format|
        format.js{
            render "analysis"
        }
    end
    
end

end
