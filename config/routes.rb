Ryanodonnell::Application.routes.draw do
  root :to => "static_pages#home"
  get "/snake", to: "static_pages#snake"
  get "/asteroids", to: "static_pages#asteroids"
end
