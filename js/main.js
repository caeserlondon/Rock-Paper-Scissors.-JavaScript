// Dom elements
const choices = document.querySelectorAll(".choice");
const score = document.getElementById("score");
const result = document.getElementById("result");
const restart = document.getElementById("restart");
const modal = document.querySelector(".modal");
const scoreboard = { player: 0, computer: 0 };

//  Playing the Game
function play(e) {
    restart.style.display = "inline-block";
    const playerChoice = e.target.id;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    //  console.log(playerChoice, computerChoice, winner);
    showWinner(winner, computerChoice);
}

// Get computers's choice
function getComputerChoice() {
    let rand = Math.floor(Math.random() * 3);

    if (rand == 1) {
        return "rock";
    } else if (rand == 2) {
        return "paper";
    } else {
        return "scissors";
    }
}

// Get game winner
function getWinner(p, c) {
    if (p === c) {
        return "draw";
    } else if (p === "rock") {
        if (c === "paper") {
            return "computer";
        } else {
            return "player";
        }
    } else if (p === "paper") {
        if (c === "scissors") {
            return "computer";
        } else {
            return "player";
        }
    } else if (p === "scissors") {
        if (c === "rock") {
            return "computer";
        } else {
            return "player";
        }
    }
}

function showWinner(winner, computerChoice) {
    if (winner === "player") {
        // increment player's score
        scoreboard.player++;
        //show modal result
        result.innerHTML = `
    <h1 class="text-win">You Win</h1>
    <i class="fas fa-hand-${computerChoice} fa-10x"></i>
    <p>Computer Chose <strong>${capitalize(computerChoice)}</strong> </p>
    `;
    } else if (winner === "computer") {
        // increment computer's score
        scoreboard.computer++;
        //show modal result
        result.innerHTML = `
    <h1 class="text-lose">You Lose</h1>
    <i class="fas fa-hand-${computerChoice} fa-10x "></i>
    <p>Computer Chose <strong>${capitalize(computerChoice)}</strong> </p>
    `;
    } else {
        //show modal result
        result.innerHTML = `
    <h1 class="text-draw">It's A Draw</h1>
    <i class="fas fa-hand-${computerChoice} fa-10x"></i>
    <p>Computer Chose <strong>${capitalize(computerChoice)}</strong> </p>
    `;
    }

    //Show score
    score.innerHTML = `
    <p>Player: ${scoreboard.player}</p>
    <p>Computer: ${scoreboard.computer}</p>
    `;

    modal.style.display = "block";
}

// clear modal
function clearModal(e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}

// Restart the game
function restartGame() {
    scoreboard.player = 0;
    scoreboard.computer = 0;
    score.innerHTML = `
    <p>Player: 0</p>
    <p>Computer: 0</p>
    `;
    restart.style.display = "none";
}

function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
}

// Event listeners
choices.forEach((choice) => choice.addEventListener("click", play));
window.addEventListener("click", clearModal);
restart.addEventListener("click", restartGame);