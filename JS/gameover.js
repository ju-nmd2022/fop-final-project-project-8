//gets the score from other document
document.addEventListener("DOMContentLoaded", function () {
    let score = localStorage.getItem("score");
    let scoreElement = document.getElementById("score");
    scoreElement.innerText = score;
});

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

//saves the score on the leader board
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

    //adds score to array and saves it
    let scoresArray = JSON.parse(localStorage.result);
    scoresArray.push(result);
    localStorage.result = JSON.stringify(scoresArray);

    inputElement.value = "";
    displayLeaderboard();
}

function displayLeaderboard() {
    //is localstorage is not undefined displays the info and sorts it
    if (localStorage.result !== undefined) {
        let scoresArray = JSON.parse(localStorage.result);
        scoresArray.sort(function (a, b) {
            return b.score - a.score;
        })
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