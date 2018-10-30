Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'main#index'

  get 'main/index', to: 'main#index'

  post 'teams/create', to: 'teams#create'
  
end
