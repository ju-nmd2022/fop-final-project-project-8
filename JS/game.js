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
let displayScore = document.getElementById("score");
let score= 0;

//variabler för jump
let isJumping = false;
let upTime;
let downTime;

//variabler för duck
let isDucking = false;
let duckTime;
let raiseTime

//andra variabler
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
        if (characterBottom <= groundHeight - 70) {
          clearInterval(downTime);
          isJumping = false;
        }
        characterBottom -= 10;
        character.style.bottom = characterBottom + "px";
      }, 20);
    }
    characterBottom += 10;
    character.style.bottom = characterBottom + "px";
    isJumping = true;
  }, 20);
}

function duck() {
  setInterval(() => {
    character.style.backgroundColor = "pink";
    character.style.bottom = characterBottom + "px";
    isDucking = true;
  }, 20);
  isDucking = false;
  character.style.backgroundColor = "aqua";
}

function showScore(){
  score++;
  displayScore.innerText = score;
  localStorage.setItem("score", score);
}

// function generateObstacles() {
//   let obstacles = document.querySelector(".obstacles");
//   let obstacle = document.createElement("div");
//   obstacle.setAttribute("class", "obstacle");
//   obstacles.appendChild(obstacle);

//   let randomTimeout = Math.floor(Math.random() * 500) + 500;
//   let obstacleRight = -30;
//   let obstacleBottom = 50;
//   let obstacleWidth = 30;
//   let obstacleHeight = Math.floor(Math.random() * 50) + 50;


//   function moveObstacles() {
//     obstacleRight += 5;
//     obstacle.style.right = obstacleRight + "px";
//     obstacle.style.bottom = obstacleBottom + "px";
//     obstacle.style.width = obstacleWidth + "px";
//     obstacle.style.height = obstacleHeight + "px";

//     let offsetX = 10; // Example value, adjust as needed
//     let offsetY = 10; // Example value, adjust as needed

//     // Check for collision using the modified hitbox values
//     if (
//       characterRight >= obstacleRight - characterWidth + offsetX &&
//       characterRight <= obstacleRight + obstacleWidth - offsetX &&
//       characterBottom <= obstacleBottom + obstacleHeight - offsetY
//     ) {
//       alert("game over! Your score is: " + score);
//       clearInterval(obstacleInterval);
//       clearTimeout(obstacleTimeout);
//       location.reload();
//     }
//   }

//   let obstacleInterval = setInterval(moveObstacles, 20);
//   let obstacleTimeout = setTimeout(randomTimeout);
// }

function generateObstacles() {
  let obstacles = document.querySelector(".obstacles");
  let obstacle = document.createElement("div");
  obstacle.setAttribute("class", "obstacle");
  obstacles.appendChild(obstacle);

  let randomTimeout = Math.floor(Math.random() * 2000) + 2000;
  let obstacleRight = -30;
  let obstacleBottom = 50;
  let obstacleWidth = 30;
  let obstacleHeight = Math.floor(Math.random() * 50) + 50;


  function moveObstacles() {
    obstacleRight = obstacleRight + 5;
    obstacle.style.right = obstacleRight + "px";
    obstacle.style.bottom = obstacleBottom + "px";
    obstacle.style.width = obstacleWidth + "px";
    obstacle.style.height = obstacleHeight + "px";

    let offsetX = 10; // Example value, adjust as needed
    let offsetY = 10; // Example value, adjust as needed

    // Check for collision using the modified hitbox values
    if (
      characterRight >= obstacleRight - characterWidth + offsetX &&
      characterRight <= obstacleRight + obstacleWidth - offsetX &&
      characterBottom <= obstacleBottom + obstacleHeight - offsetY
    ) {
      // alert("game over! Your score is: " + score);
      clearInterval(obstacleInterval);
      clearTimeout(obstacleTimeout);
      location.reload();

      // Save the score in local storage before redirecting
      localStorage.setItem("score", score);

      // Redirect to the score page
      window.location.href = "gameOver.html";
    }
  }

  let obstacleInterval = setInterval(moveObstacles, 20);
  let obstacleTimeout = setTimeout(generateObstacles, randomTimeout);
}

document.addEventListener("keydown", control);

function control(e) {
  if (e.key === "ArrowUp" || e.key === "") {
    jump();
  }
  if (e.key === "ArrowDown" || e.key === "") {
    duck();
  }
}

function startGame() {
  // Hide the start screen when the game starts
  const startScreen = document.querySelector(".start-screen");
  startScreen.style.display = "none";
  generateObstacles();
  setInterval(showScore, 100);
}

// Call the startGame function when any key is pressed, only once
document.addEventListener("keydown", startGame, { once: true });
document.addEventListener("click", startGame, { once: true });

//https://www.youtube.com/watch?v=a0TyCnFgqlk&list=PLgWOzydYBbG5_EL78twae4-FTLITTz_hG&index=6