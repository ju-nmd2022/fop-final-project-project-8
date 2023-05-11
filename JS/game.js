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
  window.getComputedStyle(character).getPropertyValue("bottom")
);
let groundHeight = parseInt(
  window.getComputedStyle(character).getPropertyValue("height")
);
let isJumping = false;
let upTime;
let downTime;

function jump() {
  if (isJumping) return;
  upTime = setInterval(() => {
    if (characterBottom >= groundHeight + 110) {
      clearInterval(upTime);
      downTime = setInterval(() => {
        if (characterBottom <= groundHeight - 110){
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

function control(e){
  if (e.key == "ArrowUp" || e.key == "") {
    jump();
  }
}

document.addEventListener("keydown", control);

function generateObstacles(){
  let obstacles = document.querySelector("obstacles");
}

function startGame() {
  // Hide the start screen when the game starts
  const startScreen = document.querySelector(".start-screen");
  startScreen.style.display = "none";
}

// Call the startGame function when any key is pressed, only once
document.addEventListener("keydown", startGame, { once: true });
document.addEventListener("click", startGame, { once: true });
