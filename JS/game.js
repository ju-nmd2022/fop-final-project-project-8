let characterStand = document.getElementById("characterStand");
characterStand.style.display = "block";
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
let score = 0;

//variabler för jump
let isJumping = false;
let upTime;
let downTime;
let characterJump = document.getElementById("characterJump");
characterJump.style.display = "none";
let characterDuck = document.getElementById("characterDuck");
characterDuck.style.display = "none";

//variabler för duck
let isDucking = false;
let duckTime;
let raiseTime;

//andra variabler
let leftTime;
let rightTime;
let isGoingLeft = false;
let isGoingRight = false;
let winWidth = parseInt(window.innerWidth);

function jump() {
  if (isJumping) return;
  characterJump.style.display = "block";
  characterStand.style.display = "none";
  upTime = setInterval(() => {
    if (characterBottom >= groundHeight + 100) {
      clearInterval(upTime);
      downTime = setInterval(() => {
        if (characterBottom <= groundHeight - 70) {
          clearInterval(downTime);
          isJumping = false;
          characterStand.style.display = "block";
          characterJump.style.display = "none";
        }
        characterBottom -= 10;
        character.style.bottom = characterBottom + "px";
      }, 40);
    }
    characterBottom += 10;
    character.style.bottom = characterBottom + "px";
    isJumping = true;
  }, 20);
}

function stand() {
  characterStand.style.display = "block";
  characterDuck.style.display = "none";
  isDucking = false;
}

function duck() {
  if (!isJumping) {
    characterStand.style.display = "none";
    characterDuck.style.display = "block";
    isDucking = true;
  }
}

//Show the score and make sure it is visible on Game Over screen by using localStorage
function showScore() {
  score++;
  displayScore.innerText = score;
  localStorage.setItem("score", score);
}

let gameSpeed = 30;
function setSpeed() {
  setInterval(() => {
    gameSpeed = gameSpeed - 1;
    console.log(gameSpeed);
  }, 3000);
}

function generateObstacle() {
  let obstacles = document.querySelector(".obstacles");
  let obstacle = document.createElement("div");
  obstacle.setAttribute("class", "obstacle");
  obstacles.appendChild(obstacle);

  let randomTimeout = Math.floor(Math.random() * 2000) + 2000;
  let obstacleRight = -30;
  let obstacleBottom = 50;
  let obstacleWidth = 30;

  // Define an array of obstacle images
  let obstacleImages = ["img/bolt.png", "img/raincloud.png"];

  // Randomly select an obstacle image
  let randomIndex = Math.floor(Math.random() * obstacleImages.length);
  let obstacleImage = obstacleImages[randomIndex];

  // Adjust the obstacle height based on the selected image
  let obstacleHeight;
  if (obstacleImage === "img/bolt.png") {
    obstacleHeight = Math.floor(Math.random() * 50) + 50;
  } else if (obstacleImage === "img/raincloud.png") {
    obstacleHeight = 300;
  }

  obstacle.style.backgroundImage = `url('${obstacleImage}')`;
  obstacle.style.right = obstacleRight + "px";
  obstacle.style.bottom = obstacleBottom + "px";
  obstacle.style.width = obstacleWidth + "px";
  obstacle.style.height = obstacleHeight + "px";

  //make image bigger, only rauncloud
  if (obstacleImage === "img/raincloud.png") {
    let scale = 3; // Adjust this value to change the size/scale
    obstacle.style.backgroundSize = `contain`;
    obstacle.style.transform = `scale(${scale})`;
  }

  function moveObstacle() {
    obstacleRight = obstacleRight + 5;
    obstacle.style.right = obstacleRight + "px";

    if (obstacleImage === "img/raincloud.png") {
      let raincloudTop = obstacleBottom;
      let raincloudBottom = obstacleBottom + obstacleHeight;
      let raincloudLeft = obstacleRight - obstacleWidth;
      let raincloudRight = obstacleRight;

      if (!isDucking) {
        // Check collision only if the character is not ducking
        if (
          characterRight >= raincloudLeft &&
          characterRight <= raincloudRight &&
          characterBottom + characterHeight >= raincloudTop &&
          characterBottom <= raincloudBottom
        ) {
          // Collision occurred, handle the logic here
          clearInterval(obstacleInterval);
          clearTimeout(obstacleTimeout);
          location.reload();
          localStorage.setItem("score", score);
        }
      }
    }

    // Check for collision using the modified hitbox values
    if (obstacleImage === "img/bolt.png") {
      if (
        characterRight >= obstacleRight - obstacleWidth &&
        characterRight <= obstacleRight - 20 &&
        characterBottom <= obstacleBottom + obstacleHeight
      ) {
        clearInterval(obstacleInterval);
        clearTimeout(obstacleTimeout);
        location.reload();
        // Save the score in local storage before redirecting
        localStorage.setItem("score", score);

        // Redirect to the gameOver page
        // window.location.href = "gameOver.html";
      }
    }
  }

  let obstacleInterval = setInterval(moveObstacle, gameSpeed);
  let obstacleTimeout = setTimeout(generateObstacle, randomTimeout);
}

//     // Check for collision using the modified hitbox values
//     if (
//       characterRight >= obstacleRight - obstacleWidth - 20 &&
//       characterRight <= obstacleRight - 20 &&
//       characterBottom <= obstacleBottom + obstacleHeight
//     ) {

//     if (
//       characterRight >= obstacleTwoRight - obstacleTwoWidth &&
//       characterRight <= obstacleTwoRight &&
//       characterBottom <= obstacleTwoBottom + obstacleTwoHeight - 130 &&
//       (characterDuck.style.display === "none" ||
//         characterBottom > obstacleTwoBottom + obstacleTwoHeight - 130)
//     ) {

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowUp") {
    jump();
  } else if (e.key === "ArrowDown") {
    duck();
  }
});

document.addEventListener("keyup", function (e) {
  if (e.key === "ArrowDown") {
    stand();
  }
});

// document.addEventListener("keydown", function control(e) {
//   if (e.key === "ArrowUp" || e.key === "") {
//     jump();
//   }
//   if (e.key === "ArrowDown") {
//     duck();
//   }
// });

// document.addEventListener("keyup", function control(e) {
//   if (e.key === "ArrowDown") {
//     stopDuck();
//   }
// });

//obNum = obstable Number
let obNum = 0;

function whichOb() {
  setInterval(() => {
    obNum = Math.floor(Math.random() * 2);
    console.log(obNum);
  }, 3000);
}

function startGame() {
  setSpeed();
  generateObstacle();
  setInterval(showScore, 100);

  //   if (score >= 1000) {
  //     alert("You win!");
  //   whichOb();

  //   // Hide the start screen when the game starts
  const startScreen = document.querySelector(".start-screen");
  startScreen.style.display = "none";
}

// Call the startGame function when any key is pressed, only once
document.addEventListener(
  "keydown",
  function (e) {
    startGame();
  },
  { once: true }
);

//SOURCES
//https://www.youtube.com/watch?v=a0TyCnFgqlk&list=PLgWOzydYBbG5_EL78twae4-FTLITTz_hG&index=6
//ChatGPT
