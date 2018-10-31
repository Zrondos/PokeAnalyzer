

class PokemonsController < ApplicationController
    # def new
    #     @pokemon = Pokemon.new
    # end
    def create
        redirect_to '/main/index'
    end
end
