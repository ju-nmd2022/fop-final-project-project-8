let character = document.getElementById("character");
let ground = document.getElementById("ground");

let characterBottom = parseInt(
  window.getComputedStyle(character).getPropertyValue("bottom")
);
let characterHeight = parseInt(
  window.getComputedStyle(character).getPropertyValue("height")
);
let characterWidth = parseInt(
  window.getComputedStyle(character).getPropertyValue("width")
);
let characterRight = parseInt(
  window.getComputedStyle(character).getPropertyValue("right")
);
let groundBottom = parseInt(
  window.getComputedStyle(ground).getPropertyValue("bottom")
);
let groundHeight = parseInt(
  window.getComputedStyle(ground).getPropertyValue("height")
);
let characterLeft = parseInt(
  window.getComputedStyle(ground).getPropertyValue("left")
);

let isJumping = false;
let upTime;
let downTime;
let leftTime;
let rightTime;
let isGoingLeft = false;
let isGoingRight = false;
let winWidth = parseInt(window.innerWidth);

function jump() {
  if (isJumping) return;
  upTime = setInterval(() => {
    if (characterBottom >= groundHeight + 100) {
      clearInterval(upTime);
      downTime = setInterval(() => {
        if (characterBottom <= groundHeight - 110) {
          clearInterval(downTime);
          isJumping = false;
        }
        characterBottom -= 10;
        character.style.bottom = characterBottom + "px";
      }, 50);
    }
    characterBottom += 10;
    character.style.bottom = characterBottom + "px";
    isJumping = true;
  }, 50);
}

// function generateObstacles() {
//   let obstacles = document.querySelector(".obstacles");
//   let obstacle = document.createElement("div");
//   obstacle.setAttribute("class", "obstacle");
//   obstacles.appendChild(obstacle);

//   let obstacleRight = -30;
//   let obstacleBottom = 50;
//   let obstacleWidth = 50;
//   let obstacleHeight = Math.floor(Math.random() * 60) + 60;

//   function moveObstacles() {
//     obstacleRight += 5;
//     obstacle.style.right = obstacleRight + "px";
//     obstacle.style.bottom = obstacleBottom + "px";
//     obstacle.style.width = obstacleWidth + "px";
//     obstacle.style.height = obstacleHeight + "px";

//     if (obstacleRight + obstacleWidth <= 0) {
//       clearInterval(obstacleInterval);
//       obstacles.removeChild(obstacle);
//     }
//   }

//   let obstacleInterval = setInterval(moveObstacles, 50);
//   let obstacleTimeout = setTimeout(generateObstacles, 3500);
// }

// generateObstacles();


function control(e) {
  if (e.key == "ArrowUp" || e.key == "") {
    jump();
  }
}

document.addEventListener("keydown", control);

function startGame() {
  // Hide the start screen when the game starts
  const startScreen = document.querySelector(".start-screen");
  startScreen.style.display = "none";
}

// Call the startGame function when any key is pressed, only once
document.addEventListener("keydown", startGame, { once: true });
document.addEventListener("click", startGame, { once: true });
