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
let duckTime;
let raiseTime;

//andra variabler
let leftTime;
let rightTime;
let isGoingLeft = false;
let isGoingRight = false;
let winWidth = parseInt(window.innerWidth);

// let index;

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


function stopDuck() {
    characterStand.style.display = "block";
    characterDuck.style.display = "none";
}

function duck() {
  characterStand.style.display = "none";
  characterDuck.style.display = "block";
}

//Show the score and make sure it is visible on Game Over screen by using localStorage
function showScore() {
  score++;
  displayScore.innerText = score;
  localStorage.setItem("score", score);
}

let gameSpeed = 30
function setSpeed() {
  setInterval(() => {
    gameSpeed = gameSpeed - 1;
    console.log(gameSpeed);
  }, 3000);
}

let bolt = false;

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

    // Check for collision using the modified hitbox values
    if (
      characterRight >= obstacleRight - obstacleWidth - 20 &&
      characterRight <= obstacleRight - 20 &&
      characterBottom <= obstacleBottom + obstacleHeight
    ) {
      console.log(
        characterLeft,
        characterRight,
        obstacleRight,
        obstacleWidth,
        characterBottom,
        obstacleBottom,
        obstacleHeight
      );
      clearInterval(obstacleInterval);
      clearTimeout(obstacleTimeout);
      location.reload();
      // Save the score in local storage before redirecting
      localStorage.setItem("score", score);
      // Redirect to the gameOver page
      // alert("game over");
      window.location.href = "gameOver.html";
    }
  }

  let obstacleInterval = setInterval(moveObstacles, gameSpeed);
  let obstacleTimeout = setTimeout(generateObstacles, randomTimeout);
}

let cloud = false;

function generateObstacleTwo() {
  let obstaclesTwo = document.querySelector(".obstaclesTwo");
  let obstacleTwo = document.createElement("div");
  obstacleTwo.setAttribute("class", "obstacleTwo");
  obstaclesTwo.appendChild(obstacleTwo);

  let randomTimeoutTwo = Math.floor(Math.random() * 4000) + 5000;
  let obstacleTwoRight = -30;
  let obstacleTwoBottom = 130;
  let obstacleTwoWidth = 130;
  let obstacleTwoHeight = Math.floor(Math.random() * 70) + 60;

  function moveObstaclesTwo() {
    cloud = true;
    obstacleTwoRight = obstacleTwoRight + 5;
    obstacleTwo.style.right = obstacleTwoRight + "px";
    obstacleTwo.style.bottom = obstacleTwoBottom + "px";
    obstacleTwo.style.width = obstacleTwoWidth + "px";
    obstacleTwo.style.height = obstacleTwoHeight + "px";

  
    if (
      characterRight >= obstacleTwoRight - obstacleTwoWidth &&
      characterRight <= obstacleTwoRight  &&
      characterBottom <= obstacleTwoBottom + obstacleTwoHeight -130
    ) {
      clearInterval(obstacleIntervalTwo);
      clearTimeout(obstacleTimeoutTwo);
      location.reload();

      // Save the score in local storage before redirecting
      localStorage.setItem("score", score);
      // Redirect to the gameOver page
      window.location.href = "gameOver.html";
    }
  }

  let obstacleIntervalTwo = setInterval(moveObstaclesTwo, gameSpeed);
  let obstacleTimeoutTwo = setTimeout(generateObstacleTwo, randomTimeoutTwo);
}

document.addEventListener("keydown", function control(e){
  if (e.key === "ArrowUp" || e.key === "") {
    jump();
  }
  if (e.key === "ArrowDown") {
    duck();
  }
});

document.addEventListener("keyup", function control(e){
  if (e.key === "ArrowDown") {
    stopDuck();
  }
});

//obNum = obstable Number
let obNum = 0;

function whichOb() {
  setInterval(() => {
    obNum = (Math.floor(Math.random() * 2));
    console.log(obNum);
  }, 3000);
}

function startGame() {  
  setSpeed();
  whichOb();

  // Hide the start screen when the game starts
  const startScreen = document.querySelector(".start-screen");
  startScreen.style.display = "none";
  if (obNum === 1) {
    generateObstacles();
  } else if (obNum === 0) {
    generateObstacleTwo();
  }
  // generateObstacles();
  // generateObstacleTwo();
  setInterval(showScore, 100);

  //typ något sånt här lär det ju vara om man ska ha ett hem
  if (score >= 1000) {
    alert("you win!");
  }
}

// Call the startGame function when any key is pressed, only once
// document.addEventListener("keydown", startGame, { once: true });
document.addEventListener(
  "keydown",
  (e) => {
    if (e.key === "ArrowUp") {
      startGame();
    }
  },
  { once: true }
);

//https://www.youtube.com/watch?v=a0TyCnFgqlk&list=PLgWOzydYBbG5_EL78twae4-FTLITTz_hG&index=6
