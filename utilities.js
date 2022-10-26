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
      let candy = board.getCandyAt(i, j);
      let candyColor;
      if (candy != null) {
        candyColor = candy.color;
      } else {
        candyColor = "#00000036";
      }
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

function checkValidDirections() {
  moveDirections = ["up", "left", "right", "down"];
  moveInput = document.getElementById("moveInput").value;
  // console.log("moveInput value was " + moveInput);
  inputX = moveInput.slice(0, 1).toLowerCase().charCodeAt(0) - 97;
  inputY = parseInt(moveInput.slice(1)) - 1;
  // console.log("row is " + inputX + " and column is " + inputY);
  candyInput = board.getCandyAt(inputY, inputX);
  // console.log("candy retrieved was: " + candyInput);
  for (let i = 0; i < moveButtons.length; i++) {
    if (
      candyInput != null &&
      rules.numberCandiesCrushedByMove(candyInput, moveDirections[i]) > 0
    ) {
      moveButtons[i].disabled = false;
      // console.log("move " + moveDirections[i] + " was valid");
    } else {
      moveButtons[i].disabled = true;
      // console.log("move " + moveDirections[i] + " was invalid");
    }
  }
}

function toggleInputAndCrushing() {
  let prev;
  moveButtons.forEach((item) => {
    prev = item.disabled;
    console.log("prev set to " + prev);
    item.disabled = !prev;
  });
  moveInput = document.getElementById("moveInput").disabled = !prev;
  $("#crushBtn").attr("disabled", prev);
}

// Need to show removed items before new ones are added so we need a delay
function delay(milisecs) {
  return new Promise((r) => setTimeout(r, milisecs));
}
