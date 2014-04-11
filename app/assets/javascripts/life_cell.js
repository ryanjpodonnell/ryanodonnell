(function (root) {
	var Life = root.Life = (root.Life || {});

	var Cell = Life.Cell = function(row, col) {
		this.row = row;
		this.col = col;
    this.alive = false;
    this.altered = false;
	};
  
  Cell.prototype.activateCell = function() {
    this.alive = !this.alive;
    this.altered = true;
  };
  
})(this);
