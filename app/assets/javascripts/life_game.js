(function (root) {
  var Life = root.Life = (root.Life || {});

  var Game = Life.Game = function(canvas) {
    canvas.addEventListener('mousedown', mouseDown);
    canvas.addEventListener('mouseup', mouseUp);
    canvas.addEventListener('mousemove', mouseMove);
    
    this.cellArray = [];
    this.cellColors = ['#E0E0E0','#C0C0C0','#A0A0A0','#808080','#606060',
                       '#404040','#202020','#000000'];
    this.ctx = canvas.getContext("2d");
    this.interval = undefined;
  };

  Game.DIM_X = 500;
  Game.DIM_Y = 500;
  Game.ROWS = 20;
  Game.COLS = 20;
  Game.CELL_WIDTH = Game.DIM_X / Game.COLS;
  Game.CELL_HEIGHT = Game.DIM_Y / Game.ROWS;
  Game.FPS = 10;

  Game.prototype.age = function() {
    var anyAltered = false;
    for (var i = 0; i < Game.ROWS; i++) {
      for (var j = 0; j < Game.COLS; j++) {
        var cellNeighbors = countNeighbors(i, j);
        if (cellNeighbors < 2 && this.cellArray[i][j].alive) {
          this.cellArray[i][j].altered = true;
          anyAltered = true;
        } else if (cellNeighbors > 3 && this.cellArray[i][j].alive) {
          this.cellArray[i][j].altered = true;
          anyAltered = true;
        } else if (cellNeighbors === 3 && !this.cellArray[i][j].alive) {
          this.cellArray[i][j].altered = true;
          anyAltered = true;
        }
      }
    }
    if (anyAltered === false) {
      endGame();
    }
  };

  Game.prototype.draw = function() {
    for (var i = 0; i < Game.ROWS; i++) {
      for (var j = 0; j < Game.COLS; j++) {
        if (this.cellArray[i][j].altered === true) {
          this.cellArray[i][j].alive = !this.cellArray[i][j].alive;
          this.cellArray[i][j].altered = false;
        }
        if (this.cellArray[i][j].alive === true) {
          var cellNeighbors = countNeighbors(i, j);
          this.ctx.fillStyle = this.cellColors[cellNeighbors];
    			this.ctx.fillRect(j * Game.CELL_HEIGHT + 1, i * Game.CELL_WIDTH + 1,
    												Game.CELL_HEIGHT - 2,     Game.CELL_WIDTH - 2);
        } else {
          this.ctx.clearRect(j * Game.CELL_HEIGHT + 1, i * Game.CELL_WIDTH + 1,
    												 Game.CELL_HEIGHT - 2,     Game.CELL_WIDTH - 2);
        }
      }
    }
  };
  
  Game.prototype.play = function () {
    if (typeof this.interval === "undefined") {
      var that = this;
      this.interval = window.setInterval(function() {that.step()}, 1000/Game.FPS);
      $('.btn').text("Stop");
    } else {
      endGame();
    }
  };

  Game.prototype.start = function() {
    initializeCellArray();
    drawInitialGrid();
  };

  Game.prototype.step = function() {
    this.age();
    this.draw();
  };
  
  Game.prototype.stop = function() {
    clearInterval(this.interval);
  };
  
  var countNeighbors = function(row, col) {
    var count = 0;
    
    for (var i = row-1; i <= row+1; i++) {
      for (var j = col-1; j <= col+1; j++) {
        if (typeof newGame.cellArray[i] !== "undefined" && 
            typeof newGame.cellArray[j] !== "undefined") {
          if (newGame.cellArray[i][j].alive && (i !== row || j !== col)) {
            count++;
          }    
        }
      }
    }
    
    return count;
  };
  
  var drawInitialGrid = function() {
    newGame.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    for (var i = 0; i < Game.ROWS; i++) {
      for (var j = 0; j < Game.COLS; j++) {
        newGame.ctx.rect(i * Game.CELL_WIDTH, j * Game.CELL_HEIGHT, 
                         Game.CELL_WIDTH,     Game.CELL_HEIGHT);
      }
    }
    newGame.ctx.stroke();
  };
  
  var endGame = function() {
    clearInterval(newGame.interval);
    newGame.interval = undefined;
    $('.btn').text("Start");
  }
  
  var initializeCellArray = function() {
    for (var i = 0; i < Game.ROWS; i++) {
      newGame.cellArray[i] = new Array(Game.COLS);
    }
    
    for (var i = 0; i < Game.ROWS; i++) {
      for (var j = 0; j < Game.COLS; j++) {
        newGame.cellArray[i][j] = new Life.Cell(i, j);
      }
    }
  };
  
  var mouseDown = function(event) {
    var col = Math.floor((event.x -= canvas.offsetLeft) / Game.CELL_WIDTH);
    var row = Math.floor((event.y -= canvas.offsetTop) / Game.CELL_HEIGHT);
    newGame.cellArray[row][col].altered = true;
    newGame.draw();
    
    dragging = true
  };
  
  var mouseUp = function(event) {
    dragging = false;
  };
  
  var mouseMove = function(event) {
    if (dragging === true) {
      var col = Math.floor((event.x -= canvas.offsetLeft) / Game.CELL_WIDTH);
      var row = Math.floor((event.y -= canvas.offsetTop) / Game.CELL_HEIGHT);
      if (newGame.cellArray[row][col].alive !== true) {
        newGame.cellArray[row][col].altered = true;
        newGame.draw();
      }
    }
  };
})(this);