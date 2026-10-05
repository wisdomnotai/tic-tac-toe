import "./style.css";

import {
    board,
    makeMove,
    currentPlayer,
    restartGame
} from "./game.js";

import {
    getBotMove
} from "./bot.js";


// screens

const startScreen =
    document.querySelector("#startScreen");

const gameScreen =
    document.querySelector("#gameScreen");

const roundScreen =
    document.querySelector("#roundScreen");


// start screen

const playerNameInput =
    document.querySelector("#playerNameInput");

const startGameButton =
    document.querySelector("#startGame");


// game screen

const boardElement =
    document.querySelector("#boardGrid");

const statusElement =
    document.querySelector("#status");

const restartButton =
    document.querySelector("#restart");

const gameNumberElement =
    document.querySelector("#gameNumber");


// scoreboard

const playerNameElement =
    document.querySelector("#playerName");

const playerScoreElement =
    document.querySelector("#playerScore");

const botScoreElement =
    document.querySelector("#botScore");


// round screen

const roundResultElement =
    document.querySelector("#roundResult");

const finalScoreElement =
    document.querySelector("#finalScore");

const roundMessageElement =
    document.querySelector("#roundMessage");

const rematchButton =
    document.querySelector("#rematch");

const newPlayerButton =
    document.querySelector("#newPlayer");


// game state

let playerName = "";

let playerScore = 0;

let botScore = 0;

let gamesPlayed = 0;

let gameOver = false;


// start the round

const startRound = () => {

    playerName =
        playerNameInput.value.trim();


    if (playerName === "") {

        alert("Please enter your name.");

        return;
    }


    playerScore = 0;

    botScore = 0;

    gamesPlayed = 0;


    playerNameElement.textContent =
        playerName;


    updateScoreboard();


    startScreen.hidden = true;

    gameScreen.hidden = false;

    roundScreen.hidden = true;


    startNewGame();
};


// start a new game

const startNewGame = () => {

    restartGame();

    gameOver = false;


    gameNumberElement.textContent =
        `Game ${gamesPlayed + 1} of 5`;


    statusElement.textContent =
        `${playerName}'s turn`;


    displayBoard();
};


// display the board

const displayBoard = () => {

    boardElement.innerHTML = "";


    board.forEach((cell, index) => {

        const button =
            document.createElement("button");


        button.classList.add("cell");


        button.textContent =
            cell;


        if (cell === "X") {

            button.classList.add("x");

        }


        if (cell === "O") {

            button.classList.add("o");

        }


        button.addEventListener(
            "click",
            () => {

                handlePlayerMove(index);

            }
        );


        boardElement.appendChild(button);

    });
};


// handle player move

const handlePlayerMove = (index) => {

    if (
        gameOver ||
        board[index] !== ""
    ) {
        return;
    }


    if (currentPlayer === "O") {
        return;
    }


    const result =
        makeMove(index);


    if (
        result === "X" ||
        result === "O"
    ) {

        finishGame(result);

        return;
    }


    if (result === "draw") {

        finishGame("draw");

        return;
    }


    displayBoard();

    updateStatus();


    if (currentPlayer === "O") {

        setTimeout(
            makeBotMove,
            500
        );
    }
};


// make the bot move

const makeBotMove = () => {

    if (gameOver) {
        return;
    }


    const botMove =
        getBotMove(
            board,
            "impossible"
        );


    const result =
        makeMove(botMove);


    if (
        result === "X" ||
        result === "O"
    ) {

        finishGame(result);

        return;
    }


    if (result === "draw") {

        finishGame("draw");

        return;
    }


    displayBoard();

    updateStatus();
};


// update the turn text

const updateStatus = () => {

    if (currentPlayer === "X") {

        statusElement.textContent =
            `${playerName}'s turn`;

    } else {

        statusElement.textContent =
            "Impossible Bot's turn";
    }
};


// update the scores

const updateScoreboard = () => {

    playerScoreElement.textContent =
        playerScore;

    botScoreElement.textContent =
        botScore;
};


// finish the current game

const finishGame = (result) => {

    gameOver = true;

    gamesPlayed++;


    if (result === "X") {

        playerScore++;

        statusElement.textContent =
            `${playerName} wins!`;

    } else if (result === "O") {

        botScore++;

        statusElement.textContent =
            "Impossible Bot wins!";

    } else {

        statusElement.textContent =
            "It's a draw!";
    }


    updateScoreboard();

    displayBoard();


    if (gamesPlayed === 5) {

        setTimeout(
            showRoundResult,
            1000
        );

        return;
    }


    setTimeout(
        startNewGame,
        1000
    );
};


// show the round result

const showRoundResult = () => {

    gameScreen.hidden = true;

    roundScreen.hidden = false;


    finalScoreElement.textContent =
        `${playerScore} - ${botScore}`;


    if (
        playerScore >
        botScore
    ) {

        roundResultElement.textContent =
            `${playerName} wins`;

        roundMessageElement.textContent =
            "You actually beat the impossible bot.";

    } else if (
        botScore >
        playerScore
    ) {

        roundResultElement.textContent =
            "Impossible Bot wins";

        roundMessageElement.textContent =
            "The bot won the five-game round.";

    } else {

        roundResultElement.textContent =
            "The round is tied";

        roundMessageElement.textContent =
            "You survived the impossible bot.";
    }
};


// restart the current game

restartButton.addEventListener(
    "click",
    () => {

        startNewGame();

    }
);


// play another round

rematchButton.addEventListener(
    "click",
    () => {

        playerScore = 0;

        botScore = 0;

        gamesPlayed = 0;


        updateScoreboard();


        roundScreen.hidden = true;

        gameScreen.hidden = false;


        startNewGame();

    }
);


// go back to the start screen

newPlayerButton.addEventListener(
    "click",
    () => {

        playerScore = 0;

        botScore = 0;

        gamesPlayed = 0;


        roundScreen.hidden = true;

        gameScreen.hidden = true;

        startScreen.hidden = false;


        playerNameInput.value = "";

    }
);


// start the game

startGameButton.addEventListener(
    "click",
    startRound
);


// allow Enter to start

playerNameInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            startRound();

        }
    }
);