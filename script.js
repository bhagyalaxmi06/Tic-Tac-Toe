function startGame() {
  window.location.href = "index.html";
}
// CREATE ACCOUNT
function createAccount() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (user && pass) {
    alert("✅ Account Created Successfully!");
    localStorage.setItem("user", user);
    window.location.href = "choose.html";
  } else {
    alert("⚠️ Please fill all fields!");
  }
}

// CHOOSE SYMBOL
function chooseSymbol(symbol) {
  localStorage.setItem("player", symbol);
  localStorage.setItem("ai", symbol === "X" ? "O" : "X");
  window.location.href = "game.html";
}

// GAME VARIABLES
let board = ["", "", "", "", "", "", "", "", ""];
let player = localStorage.getItem("player");
let ai = localStorage.getItem("ai");
let gameOver = false;

// PLAYER MOVE
function makeMove(index) {
  if (board[index] === "" && !gameOver) {
    board[index] = player;
    updateBoard();

    if (checkWin(player)) {
      endGame("🎉 You Win!");
      return;
    }

    if (!board.includes("")) {
      endGame("🤝 Draw!");
      return;
    }

    setTimeout(aiMove, 500);
  }
}

// AI MOVE (Random)
function aiMove() {
  let empty = board
    .map((val, i) => val === "" ? i : null)
    .filter(v => v !== null);

  let move = empty[Math.floor(Math.random() * empty.length)];

  if (move !== undefined) {
    board[move] = ai;
    updateBoard();

    if (checkWin(ai)) {
      endGame("🤖 AI Wins!");
    }

    if (!board.includes("") && !gameOver) {
      endGame("🤝 Draw!");
    }
  }
}

// UPDATE UI
function updateBoard() {
  let cells = document.querySelectorAll(".cell");
  cells.forEach((cell, i) => {
    cell.innerText = board[i];
  });
}

// CHECK WIN
function checkWin(p) {
  let combos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return combos.some(c =>
    board[c[0]] === p &&
    board[c[1]] === p &&
    board[c[2]] === p
  );
}

// END GAME
function endGame(msg) {
  document.getElementById("status").innerText = msg;
  gameOver = true;
}

// RESTART
function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  updateBoard();
  document.getElementById("status").innerText = "";
}