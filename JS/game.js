const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const background = document.getElementById("background");

function startGame() {
  // Hide the start screen when the game starts
  const startScreen = document.querySelector(".start-screen");
  startScreen.style.display = "none";
  background.style.visibility = "visible";
}

function gameLoop() {
  console.log("gameloop");
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

// Call the startGame function when any key is pressed
document.addEventListener("keydown", startGame, { once: true });
document.addEventListener("click", startGame, { once: true });
