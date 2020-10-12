function showHighScore() {
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    localStorage.setItem("highscores", JSON.stringify(highscores));
    console.log(highscores)


    highscores.push(score);
    highscores.sort(function (a, b) {
        return b.score - a.score;
    });

    var score = 0;
    var ul = document.getElementById("highscoreList");


    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    for (var i in highscores) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(highscores[i].initials + ": " + highscores[i].score));
        ul.appendChild(li);
        console.log(highscores);
    }

}
var el = document.getElementById("submit");
if (el) {
    el.addEventListener('click', showHighScore, false);
}
var el = document.getElementById("highscorePage");
if (el) {
    showHighScore();
}