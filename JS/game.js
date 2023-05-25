//character & ground
let characterStand = document.getElementById("characterStand");
characterStand.style.display = "block";
let ground = document.getElementById("ground");

//get properties for character & ground and store in variables
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

//score
let displayScore = document.getElementById("score");
let score = 0;

//variables & character for jump
let isJumping = false;
let upTime;
let downTime;
let characterJump = document.getElementById("characterJump");
characterJump.style.display = "none";

//variables & character for duck
let isDucking = false;
let characterDuck = document.getElementById("characterDuck");
characterDuck.style.display = "none";

//star
let star = document.getElementById("star");
star.style.display = "none";
//character in "starmode"
let characterStar = document.getElementById("characterStar");
characterStar.style.display = "none";

//get window width?
let winWidth = parseInt(window.innerWidth);

//function to get character to jump
function jump() {
  if (isJumping) return;
  //displays correct img
  characterJump.style.display = "block";
  characterStand.style.display = "none";
  //the actual jump
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

//function to get character back to normal stand
function stand() {
  if (!isJumping) {
  characterStand.style.display = "block";
  characterDuck.style.display = "none";
    isDucking = false;
  }
}

//function to get character to duck
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

//decides how fast game is and makes it faster as time goes
let gameSpeed = 30;
function setSpeed() {
  setInterval(() => {
    gameSpeed = gameSpeed - 2;
    console.log(gameSpeed);
  }, 3000);
}

//generate the star
let isIndestructible = false;
let starActive = false;
function generateStar() {
  starActive = true;
  //displays star on random position
  star.style.display = "block";
  star.style.left = Math.floor(Math.random() * 1200) + 50 + "px";
  star.style.top = Math.floor(Math.random() * 350) + 50 + "px";
  characterJump.style.display = "none";
  characterDuck.style.display = "none";

  if (starActive === true) {
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft" && starActive) {
        rainbow();
        isIndestructible = true;
        setTimeout(() => {
          isIndestructible = false;
        }, 4000);
      }
    });
  }
  //makes start disapear after 1 sec
  setTimeout(() => {
    star.style.display = "none";
    starActive = false;
  }, 1000);
}

//displays the rainbow version of character
function rainbow() {
  isIndestructible = true;
  characterStar.style.display = "block";
  characterStand.style.display = "none";
  characterJump.style.display = "none";
  characterDuck.style.display = "none";
  //back to normal after 4 sec
  setTimeout(() => {
    characterStar.style.display = "none";
    characterStand.style.display = "block";
    starActive = false;
  }, 4000);
}

//generates the obstacles
function generateObstacle() {
  //create obstacle element and add class to it
  let obstacles = document.querySelector(".obstacles");
  let obstacle = document.createElement("div");
  obstacle.setAttribute("class", "obstacle");
  obstacles.appendChild(obstacle);

  //how often obstacles are generated
  let randomTimeout = Math.floor(Math.random() * (-80 * (-1 * gameSpeed)) + 1500);
  
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

  //make image bigger, only raincloud
  if (obstacleImage === "img/raincloud.png") {
    let scale = 3; // Adjust this value to change the size/scale
    obstacle.style.backgroundSize = `contain`;
    obstacle.style.transform = `scale(${scale})`;
  }
//makes the obstacles move
  function moveObstacle() {
    //makes them  move to the left
    obstacleRight = obstacleRight + 5;
    obstacle.style.right = obstacleRight + "px";
    //collision for raincloud
    if (obstacleImage === "img/raincloud.png") {
      let raincloudTop = obstacleBottom;
      let raincloudBottom = obstacleBottom + obstacleHeight;
      let raincloudLeft = obstacleRight - obstacleWidth;
      let raincloudRight = obstacleRight;

      if (!isDucking && !starActive) {
        if (
          !isIndestructible && //check if character is destructible
          characterRight >= raincloudLeft &&
          characterRight <= raincloudRight &&
          characterBottom + characterHeight >= raincloudTop &&
          characterBottom <= raincloudBottom
        ) {
          // Collision occurred, handle the logic here
          clearInterval(obstacleInterval);
          clearTimeout(obstacleTimeout);
          location.reload();
          // Save the score in local storage before redirecting
          localStorage.setItem("score", score);
          // Redirect to the gameOver page
          window.location.href = "gameOver.html";
        }
      }
    }
    //collision for bolt
    if (obstacleImage === "img/bolt.png") {
      if (!starActive) {
        if (
          !isIndestructible && //check if character is destructible
          characterRight >= obstacleRight - obstacleWidth &&
          characterRight <= obstacleRight - 20 &&
          characterBottom <= obstacleBottom + obstacleHeight
        ) {
          clearInterval(obstacleInterval);
          clearTimeout(obstacleTimeout);
          location.reload();
          //save the score in local storage before redirecting
          localStorage.setItem("score", score);
  
          //redirect to the gameOver page
          window.location.href = "gameOver.html";
        }

      }
    }
  }
  //how quickly obstacles move
  let obstacleInterval = setInterval(moveObstacle, gameSpeed);
  //how often obstacles generates
  let obstacleTimeout = setTimeout(generateObstacle, randomTimeout);
}

//controls
document.addEventListener("keydown", function (e) {
  if (!isIndestructible) {
    if (e.key === "ArrowUp" ) {
    jump();
  } else if (e.key === "ArrowDown") {
    duck();
  }
  }
});

//controls again
document.addEventListener("keyup", function (e) {
  if (!isIndestructible) {
    if (e.key === "ArrowDown") {
      stand();
    }
  }
});

//the function that starts the game
function startGame() {
  setSpeed();
  generateObstacle();
  setInterval(showScore, 100);
  setInterval(generateStar, 10000);

  // Hide the start screen when the game starts
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
