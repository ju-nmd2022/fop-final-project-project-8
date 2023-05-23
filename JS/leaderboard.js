document.addEventListener("DOMContentLoaded", function () {
    let score = localStorage.getItem("score");
    let scoreElement = document.getElementById("score");
    scoreElement.innerText = score;
});

// let leaderboardArray = [];

window.addEventListener("load", () => {
    const saveElement = document.getElementById("button");
    saveElement.addEventListener("click", () => {
        saveScore();
    });

    displayLeaderboard();
})

function saveScore() {
    let score = localStorage.getItem("score");

    const inputElement = document.getElementById("input");
    let result = {
        name: inputElement.value,
        score: score
    }

    if (localStorage.result === undefined) {
        localStorage.result = JSON.stringify([]);
    }
    
    inputElement.value = "";

    let scoresArray = JSON.parse(localStorage.result);
    scoresArray.push(result);
    localStorage.result = JSON.stringify(scoresArray);

    displayLeaderboard();
}

function displayLeaderboard() {
    if (localStorage.result !== undefined) {
        let scoresArray = JSON.parse(localStorage.result);
        scoresArray.sort(function (a, b) {
            return b.score - a.score;
        })

        const scoresElement = document.getElementById("names");
        scoresElement.innerText = "";
        for (info of scoresArray) {
            const item = document.createElement("p");
            item.innerText = info.name + ": " + info.score;
            scoresElement.appendChild(item);
        }
    }

}