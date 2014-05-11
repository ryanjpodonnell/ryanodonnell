class SnakeScoresController < ApplicationController
  def create
    snake_score = SnakeScore.new
    snake_score.initials = params[:initials]
    snake_score.score = params[:score]
    snake_score.save
    render :json => snake_score, :head => :ok
  end
  
  def index
    snake_scores = SnakeScore.all
    render :json => snake_scores
  end
end
