Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"
  get "/components", to: "pages#components"

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :recipes, only: [:create, :index, :show, :new] do
    resources :dailies, only: [:create, :destroy]
    resources :favorites, only: [:create, :destroy]
  end
  resources :dashboards, only: [:index, :my_recipies]

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  # Defines the root path route ("/")
  # root "posts#index"
end
