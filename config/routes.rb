Ryanodonnell::Application.routes.draw do
  root :to => "static_pages#home"

  get "/snake", to: "static_pages#snake"
  get "/asteroids", to: "static_pages#asteroids"
  get "/life", to: "static_pages#life"
  
  resources :snake_scores, :only => [:create, :index]
  
  match 'webhooks/process' => 'webhooks#verify', :via => :get
  resources :webhooks, :only => [:create]
end
