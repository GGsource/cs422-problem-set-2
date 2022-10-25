// DONE: Behavior for new game button
let newGameButton = document.getElementById("newGameButton");
newGameButton.onclick = function () {
	board.clear();
	rules.populateBoard();
	refreshGuiBoard(board);
	console.log("new game prepared");
};

// Creates the initial table of square candies
function createGuiBoard() {
let gameTable = document.getElementById("gameTable");
	for (let i = 0; i < DEFAULT_BOARD_SIZE; i++) {
		var newRow = gameTable.insertRow(i);
		for (let j = 0; j < DEFAULT_BOARD_SIZE; j++) {
			//Insert the new cell
			var newCell = newRow.insertCell(j);
			newCell.classList.add("cell");
			//Name it
			newCell.innerHTML = `${(j + 10).toString(36)}${i + 1}`;
			// Get the piece's color here
			let candyColor = board.getCandyAt(i, j).color;
			if (candyColor != null) {
				newCell.style.background = candyColor;
				if (candyColor == "yellow") {
					//Yellow buttons need darker text
					newCell.style.color = "grey";
				} else {
					newCell.style.color = "white";
				}
			}
		}
	}
}

// Updates the table's appearance in case of new game
function refreshGuiBoard() {
	let gameTable = document.getElementById("gameTable");
	for (let i = 0; i < gameTable.rows.length; i++) {
		for (let j = 0; j < gameTable.rows[i].cells.length; j++) {
			let cell = gameTable.rows[i].cells[j];
			// Get the piece's color here
			let candyColor = board.getCandyAt(i, j).color;
			if (candyColor != null) {
				cell.style.background = candyColor;
				if (candyColor == "yellow") {
					//Yellow buttons need darker text
					cell.style.color = "grey";
				} else {
					cell.style.color = "white";
				}
			}
		}
	}
}