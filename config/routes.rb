Ryanodonnell::Application.routes.draw do
  root :to => "static_pages#home"
  get "/snake", to: "static_pages#snake"
end
