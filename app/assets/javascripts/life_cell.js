(function (root) {
	var Life = root.Life = (root.Life || {});

	var Cell = Life.Cell = function(row, col) {
		this.row = row;
		this.col = col;
    this.alive = false;
    this.altered = false;
	};
  
})(this);
