//gets the score from other document
document.addEventListener("DOMContentLoaded", function () {
    let score = localStorage.getItem("score");
    let scoreElement = document.getElementById("score");
    scoreElement.innerText = score;
});

//redirects to game
function playAgain() {
    localStorage.removeItem("score");
    window.location.href = "game.html";
}

//let window load first
window.addEventListener("load", () => {
    const saveElement = document.getElementById("button");
    saveElement.addEventListener("click", () => {
        saveScore();
    });

    displayLeaderboard();
})

//saves the score on the leaderboard
function saveScore() {
    //gets the score from localstorage
    let score = localStorage.getItem("score");

    const inputElement = document.getElementById("input");
    //info that goes in array
    let result = {
        name: inputElement.value,
        score: score
    }

    //check if there is anything in localstorage, if undefined creates emtpy array.
    if (localStorage.result === undefined) {
        localStorage.result = JSON.stringify([]);
    }

    //adds score to array
    let scoresArray = JSON.parse(localStorage.result);
    scoresArray.push(result);
    //sort array
    scoresArray.sort(function (a, b) {
        return b.score - a.score;
    });
    //remove object with index over 10
    if (scoresArray.length > 10) {
        scoresArray = scoresArray.slice(0, 10);
    }
    //save array
    localStorage.result = JSON.stringify(scoresArray);
    //makes input empty after save button press
    inputElement.value = "";

    displayLeaderboard();
}

function displayLeaderboard() {
    // Check if localStorage.result is defined and not an empty array
    if (localStorage.result && localStorage.result !== "[]") {
        let scoresArray = JSON.parse(localStorage.result);

        //creates html elements to put info in
        const scoresElement = document.getElementById("names");
        scoresElement.innerText = "";
        for (info of scoresArray) {
            const item = document.createElement("p");
            item.innerText = info.name + ": " + info.score;
            scoresElement.appendChild(item);
        }
    }
}