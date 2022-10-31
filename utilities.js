// Creates the initial table of square candies
function createGuiBoard() {
  for (let i = 0; i < DEFAULT_BOARD_SIZE; i++) {
    var newRow = gameTable.insertRow(i);
    for (let j = 0; j < DEFAULT_BOARD_SIZE; j++) {
      //Insert the new cell
      var newCell = newRow.insertCell(j);
      newCell.classList.add("cell");
      //Name it
      newCell.innerHTML = `${(j + 10).toString(36)}${i + 1}`;
      // Get the piece's color here
      // let candyColor = board.getCandyAt(i, j).color;
      // if (candyColor != null) {
      //   newCell.style.background = candyColor;
      //   if (candyColor == "yellow") {
      //     //Yellow buttons need darker text
      //     newCell.style.color = "grey";
      //   } else {
      //     newCell.style.color = "white";
      //   }
      // }
      newCell.style.background = "#00000085";
    }
  }
}

// Updates the table's appearance in case of new game
function fillNewGuiBoard() {
  for (let i = 0; i < gameTable.rows.length; i++) {
    for (let j = 0; j < gameTable.rows[i].cells.length; j++) {
      let cell = gameTable.rows[i].cells[j];
      // Get the piece's color here
      let candy = board.getCandyAt(i, j);
      let candyColor;
      if (candy != null) {
        candyColor = candy.color;
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
  moveInputVal = moveInput.value;
  // console.log("moveInputVal value was " + moveInputVal);
  inputX = moveInputVal.slice(0, 1).trim().toLowerCase().charCodeAt(0) - 97;
  let inputY;
  if (moveInputVal.slice(1).trim().length == 1) {
    inputY = parseInt(moveInputVal.slice(1)) - 1;
  }
  // console.log("row is " + inputX + " and column is " + inputY);
  candyInput = board.getCandyAt(inputY, inputX);
  // console.log("candy retrieved was: " + candyInput);
  for (let i = 0; i < moveButtons.length; i++) {
    if (
      candyInput != null &&
      rules.isMoveTypeValid(candyInput, moveDirections[i])
    ) {
      moveButtons[i].disabled = false;
      // console.log("move " + moveDirections[i] + " was valid");
    } else {
      moveButtons[i].disabled = true;
      // console.log("move " + moveDirections[i] + " was invalid");
    }
  }
}

//For toggling ability to press crush button on and off
function disableCrush(state) {
  crushBtn.disabled = state;
}

function disableInputButtons() {
  moveButtons.forEach((item) => (item.disabled = true));
  moveInput.disabled = true;
}

function enableAndFocusInput() {
  moveInput.disabled = false;
  moveInput.focus();
  moveInput.value = "";
}

// Need to show removed items before new ones are added so we need a delay
function delay(milisecs) {
  return new Promise((r) => setTimeout(r, milisecs));
}
