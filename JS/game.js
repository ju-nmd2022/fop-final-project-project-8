const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const groundImage = new Image();
groundImage.src = "img/clouds.png";

let groundOffset = 0;
let groundSpeed = 0.4;

function drawGround() {
  // Calculate the number of tiles needed to fill the width of the canvas
  const numTiles = Math.ceil(canvas.width / groundImage.width);
  
  // Loop through each tile and draw it on the canvas
  for (let i = 0; i < numTiles; i++) {
    ctx.drawImage(
      groundImage,
      groundOffset + i * groundImage.width,
      canvas.height - (groundImage.height * canvas.width * 6) / groundImage.width,
      groundImage.width,
      (groundImage.height * canvas.width * 6) / groundImage.width
    );
  }

  // Move the ground to the left
  groundOffset -= groundSpeed;
  groundSpeed = groundSpeed + 0.001;

  // If the ground has moved off the screen, reset its position
  if (groundOffset < -groundImage.width) {
    groundOffset = 0;
  }
}


function drawFrame() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the ground
  drawGround();

  // Draw other game elements here

  // Call this function again to draw the next frame
  requestAnimationFrame(drawFrame);
}

drawFrame();

function startGame() {
  // Hide the start screen when the game starts
  const startScreen = document.querySelector(".start-screen");
  startScreen.style.display = "none";
}

// Call the startGame function when any key is pressed, only once
document.addEventListener("keydown", startGame, { once: true });
document.addEventListener("click", startGame, { once: true });
// document.addEventListener("keydown", drawFrame, { once: true });
// document.addEventListener("click", drawFrame, { once: true });
