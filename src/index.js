import "./style.css";

import {board,makeMove,currentPlayer,restartGame} from "./game.js";

import { getBotMove } from "./bot.js";


// screens
const startScreen = document.querySelector("#startScreen");
const gameScreen = document.querySelector("#gameScreen");
const roundScreen = document.querySelector("#roundScreen");


// start screen
const botModeButton = document.querySelector("#botMode");
const multiplayerModeButton = document.querySelector("#multiplayerMode");
const nameForm = document.querySelector("#nameForm");


// game screen
const boardElement = document.querySelector("#boardGrid");
const statusElement = document.querySelector("#status");
const restartButton = document.querySelector("#restart");


// score elements
const playerOneNameElement = document.querySelector("#playerOneName");
const playerTwoNameElement = document.querySelector("#playerTwoName");

const playerOneScoreElement = document.querySelector("#playerOneScore");
const playerTwoScoreElement = document.querySelector("#playerTwoScore");


// round screen
const roundResultElement = document.querySelector("#roundResult");
const newRoundButton = document.querySelector("#newRound");


// game state
let gameOver = false;

let gameMode = "";

let playerOneName = "";
let playerTwoName = "";

let playerOneScore = 0;
let playerTwoScore = 0;

let gamesPlayed = 0;


// show the name form
const showNameForm = (mode) => {
    gameMode = mode;

    if (mode === "bot") {
        nameForm.innerHTML = `
            <h2>Enter your name</h2>

            <input
                id="playerOneInput"
                type="text"
                placeholder="Your name"
            >

            <button id="startGame">Start Game</button>
        `;
    } else {
        nameForm.innerHTML = `
            <h2>Enter player names</h2>

            <input
                id="playerOneInput"
                type="text"
                placeholder="Player 1 name"
            >

            <input
                id="playerTwoInput"
                type="text"
                placeholder="Player 2 name"
            >

            <button id="startGame">Start Game</button>
        `;
    }

    const startGameButton = document.querySelector("#startGame");

    startGameButton.addEventListener("click", startGame);
};


// start a round
const startGame = () => {
    const playerOneInput = document.querySelector("#playerOneInput");
    const playerTwoInput = document.querySelector("#playerTwoInput");

    playerOneName = playerOneInput.value.trim();

    if (gameMode === "bot") {
        playerTwoName = "Bot";
    } else {
        playerTwoName = playerTwoInput.value.trim();
    }

    if (playerOneName === "") {
        alert("Please enter a name.");
        return;
    }

    if (gameMode === "multiplayer" && playerTwoName === "") {
        alert("Please enter both names.");
        return;
    }

    playerOneScore = 0;
    playerTwoScore = 0;
    gamesPlayed = 0;

    updateScoreboard();

    startScreen.hidden = true;
    gameScreen.hidden = false;
    roundScreen.hidden = true;

    startNewGame();
};


// update scoreboard
const updateScoreboard = () => {
    playerOneNameElement.textContent = playerOneName;
    playerTwoNameElement.textContent = playerTwoName;

    playerOneScoreElement.textContent = playerOneScore;
    playerTwoScoreElement.textContent = playerTwoScore;
};


// start one game
const startNewGame = () => {
    restartGame();

    gameOver = false;

    statusElement.textContent = `${playerOneName}'s turn`;

    displayBoard();
};


// render the board
const displayBoard = () => {
    boardElement.innerHTML = "";

    board.forEach((cell, index) => {
        const button = document.createElement("button");

        button.classList.add("cell");
        button.textContent = cell;

        if (cell === "X") {
            button.classList.add("x");
        }

        if (cell === "O") {
            button.classList.add("o");
        }

        button.addEventListener("click", () => {
            handleMove(index);
        });

        boardElement.appendChild(button);
    });
};


// handle the player's move
const handleMove = (index) => {
    if (gameOver || board[index] !== "") {
        return;
    }

    const result = makeMove(index);

    if (result === "X" || result === "O") {
        finishGame(result);
        return;
    }

    if (result === "draw") {
        finishGame("draw");
        return;
    }

    updateStatus();

    displayBoard();

    // let the bot play
    if (gameMode === "bot" && currentPlayer === "O") {
        setTimeout(makeBotMove, 500);
    }
};


// make the bot move
const makeBotMove = () => {
    if (gameOver) {
        return;
    }

    const botMove = getBotMove(board);

    const result = makeMove(botMove);

    if (result === "X" || result === "O") {
        finishGame(result);
        return;
    }

    if (result === "draw") {
        finishGame("draw");
        return;
    }

    updateStatus();

    displayBoard();
};


// update whose turn it is
const updateStatus = () => {
    if (currentPlayer === "X") {
        statusElement.textContent = `${playerOneName}'s turn`;
    } else {
        statusElement.textContent = `${playerTwoName}'s turn`;
    }
};


// finish one game
const finishGame = (result) => {
    gameOver = true;

    gamesPlayed++;

    if (result === "X") {
        playerOneScore++;
        statusElement.textContent = `${playerOneName} wins!`;
    } else if (result === "O") {
        playerTwoScore++;
        statusElement.textContent = `${playerTwoName} wins!`;
    } else {
        statusElement.textContent = "It's a draw!";
    }

    updateScoreboard();
    displayBoard();

    if (gamesPlayed === 5) {
        setTimeout(showRoundResult, 1000);
        return;
    }

    setTimeout(startNewGame, 1000);
};


// show round result
const showRoundResult = () => {
    gameScreen.hidden = true;
    roundScreen.hidden = false;

    if (playerOneScore > playerTwoScore) {
        roundResultElement.textContent =
            `${playerOneName} wins the round!`;
    } else if (playerTwoScore > playerOneScore) {
        roundResultElement.textContent =
            `${playerTwoName} wins the round!`;
    } else {
        roundResultElement.textContent =
            "The round ends in a tie!";
    }
};


// restart current game
restartButton.addEventListener("click", () => {
    startNewGame();
});


// start a new round
newRoundButton.addEventListener("click", () => {
    playerOneScore = 0;
    playerTwoScore = 0;
    gamesPlayed = 0;

    roundScreen.hidden = true;
    startScreen.hidden = false;

    nameForm.innerHTML = "";
});


// mode selection
botModeButton.addEventListener("click", () => {
    showNameForm("bot");
});

multiplayerModeButton.addEventListener("click", () => {
    showNameForm("multiplayer");
});