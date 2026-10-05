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

const botModeButton =
    document.querySelector("#botMode");

const multiplayerModeButton =
    document.querySelector("#multiplayerMode");

const nameForm =
    document.querySelector("#nameForm");

const welcomeMessage =
    document.querySelector("#welcomeMessage");


// game screen

const boardElement =
    document.querySelector("#boardGrid");

const statusElement =
    document.querySelector("#status");

const restartButton =
    document.querySelector("#restart");

const gameNumberElement =
    document.querySelector("#gameNumber");

const difficultyDisplay =
    document.querySelector("#difficultyDisplay");


// scoreboard

const playerOneNameElement =
    document.querySelector("#playerOneName");

const playerTwoNameElement =
    document.querySelector("#playerTwoName");

const playerOneScoreElement =
    document.querySelector("#playerOneScore");

const playerTwoScoreElement =
    document.querySelector("#playerTwoScore");


// round screen

const roundResultElement =
    document.querySelector("#roundResult");

const finalScoreElement =
    document.querySelector("#finalScore");

const roundMessageElement =
    document.querySelector("#roundMessage");

const rematchButton =
    document.querySelector("#rematch");

const shareResultButton =
    document.querySelector("#shareResult");

const newRoundButton =
    document.querySelector("#newRound");


// celebration

const celebration =
    document.querySelector("#celebration");


// stats

const totalGamesElement =
    document.querySelector("#totalGames");

const totalWinsElement =
    document.querySelector("#totalWins");

const totalLossesElement =
    document.querySelector("#totalLosses");

const bestStreakElement =
    document.querySelector("#bestStreak");

const resetStatsButton =
    document.querySelector("#resetStats");


// theme buttons

const themeButton =
    document.querySelector("#themeButton");

const themeButtonGame =
    document.querySelector("#themeButtonGame");


// game state

let gameOver = false;

let gameMode = "";

let difficulty = "impossible";

let playerOneName = "";

let playerTwoName = "";

let playerOneScore = 0;

let playerTwoScore = 0;

let gamesPlayed = 0;


// local statistics

let stats = {
    games: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    currentStreak: 0,
    bestStreak: 0
};


// load saved data

const savedStats =
    localStorage.getItem("ticTacToeStats");

if (savedStats) {
    stats = JSON.parse(savedStats);
}


// load saved name

const savedName =
    localStorage.getItem("ticTacToeName");

if (savedName) {

    welcomeMessage.textContent =
        `Welcome back, ${savedName}.`;

}


// save statistics

const saveStats = () => {

    localStorage.setItem(
        "ticTacToeStats",
        JSON.stringify(stats)
    );

    updateStatsDisplay();
};


// update statistics display

const updateStatsDisplay = () => {

    totalGamesElement.textContent =
        stats.games;

    totalWinsElement.textContent =
        stats.wins;

    totalLossesElement.textContent =
        stats.losses;

    bestStreakElement.textContent =
        stats.bestStreak;
};


updateStatsDisplay();


// show name form

const showNameForm = (mode) => {

    gameMode = mode;


    if (mode === "bot") {

        nameForm.innerHTML = `

            <h2>Enter your name</h2>

            <input
                id="playerOneInput"
                type="text"
                placeholder="Your name"
                value="${savedName || ""}"
            >

            <div id="difficultySelection">

                <button data-difficulty="easy">
                    Easy
                </button>

                <button data-difficulty="medium">
                    Medium
                </button>

                <button data-difficulty="impossible">
                    Impossible
                </button>

            </div>

            <button id="startGame">
                Start Game
            </button>

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

            <button id="startGame">
                Start Game
            </button>

        `;
    }


    const difficultyButtons =
        document.querySelectorAll(
            "[data-difficulty]"
        );


    difficultyButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                difficulty =
                    button.dataset.difficulty;

                difficultyButtons.forEach(
                    (otherButton) => {
                        otherButton.style.opacity =
                            "0.5";
                    }
                );

                button.style.opacity = "1";
            }
        );

    });


    const startGameButton =
        document.querySelector("#startGame");


    startGameButton.addEventListener(
        "click",
        startGame
    );
};


// start round

const startGame = () => {

    const playerOneInput =
        document.querySelector("#playerOneInput");

    const playerTwoInput =
        document.querySelector("#playerTwoInput");


    playerOneName =
        playerOneInput.value.trim();


    if (gameMode === "bot") {

        playerTwoName = "Bot";

    } else {

        playerTwoName =
            playerTwoInput.value.trim();
    }


    if (playerOneName === "") {

        alert("Please enter your name.");

        return;
    }


    if (
        gameMode === "multiplayer" &&
        playerTwoName === ""
    ) {

        alert("Please enter both names.");

        return;
    }


    localStorage.setItem(
        "ticTacToeName",
        playerOneName
    );


    playerOneScore = 0;

    playerTwoScore = 0;

    gamesPlayed = 0;


    updateScoreboard();


    startScreen.hidden = true;

    gameScreen.hidden = false;

    roundScreen.hidden = true;


    if (gameMode === "bot") {

        difficultyDisplay.textContent =
            `Difficulty: ${difficulty}`;

    } else {

        difficultyDisplay.textContent = "";
    }


    startNewGame();
};


// update scoreboard

const updateScoreboard = () => {

    playerOneNameElement.textContent =
        playerOneName;

    playerTwoNameElement.textContent =
        playerTwoName;


    playerOneScoreElement.textContent =
        playerOneScore;

    playerTwoScoreElement.textContent =
        playerTwoScore;
};


// start one game

const startNewGame = () => {

    restartGame();

    gameOver = false;


    gameNumberElement.textContent =
        `Game ${gamesPlayed + 1} of 5`;


    statusElement.textContent =
        `${playerOneName}'s turn`;


    displayBoard();
};


// render board

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
                handleMove(index);
            }
        );


        boardElement.appendChild(button);

    });
};


// handle player move

const handleMove = (index) => {

    if (
        gameOver ||
        board[index] !== ""
    ) {
        return;
    }


    if (
        gameMode === "bot" &&
        currentPlayer === "O"
    ) {
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


    updateStatus();

    displayBoard();


    if (
        gameMode === "bot" &&
        currentPlayer === "O"
    ) {

        setTimeout(
            makeBotMove,
            500
        );
    }
};


// bot move

const makeBotMove = () => {

    if (gameOver) {
        return;
    }


    const botMove =
        getBotMove(
            board,
            difficulty
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


    updateStatus();

    displayBoard();
};


// update turn

const updateStatus = () => {

    if (currentPlayer === "X") {

        statusElement.textContent =
            `${playerOneName}'s turn`;

    } else {

        statusElement.textContent =
            `${playerTwoName}'s turn`;
    }
};


// update personal statistics

const updatePersonalStats = (result) => {

    stats.games++;


    if (
        gameMode === "bot"
    ) {

        if (result === "X") {

            stats.wins++;

            stats.currentStreak++;

            stats.bestStreak =
                Math.max(
                    stats.bestStreak,
                    stats.currentStreak
                );

        } else if (result === "O") {

            stats.losses++;

            stats.currentStreak = 0;

        } else {

            stats.draws++;
        }

    }


    saveStats();
};


// finish game

const finishGame = (result) => {

    gameOver = true;

    gamesPlayed++;


    if (result === "X") {

        playerOneScore++;

        statusElement.textContent =
            `${playerOneName} wins!`;

        showCelebration(
            `${playerOneName} WINS`
        );

    } else if (result === "O") {

        playerTwoScore++;

        statusElement.textContent =
            `${playerTwoName} wins!`;

        if (gameMode === "bot") {

            showCelebration(
                "BOT WINS"
            );
        }

    } else {

        statusElement.textContent =
            "It's a draw!";
    }


    updatePersonalStats(result);

    updateScoreboard();

    displayBoard();


    if (gamesPlayed === 5) {

        setTimeout(
            showRoundResult,
            1200
        );

        return;
    }


    setTimeout(
        startNewGame,
        1200
    );
};


// celebration

const showCelebration = (text) => {

    celebrationText.textContent =
        text;

    celebration.hidden = false;


    setTimeout(() => {

        celebration.hidden = true;

    }, 900);
};


const celebrationText =
    document.querySelector(
        "#celebrationText"
    );


// show round result

const showRoundResult = () => {

    gameScreen.hidden = true;

    roundScreen.hidden = false;


    finalScoreElement.textContent =
        `${playerOneScore} - ${playerTwoScore}`;


    if (
        playerOneScore >
        playerTwoScore
    ) {

        roundResultElement.textContent =
            `${playerOneName} wins the round`;

        roundMessageElement.textContent =
            `${playerOneName} won the five-game round.`;

    } else if (
        playerTwoScore >
        playerOneScore
    ) {

        roundResultElement.textContent =
            `${playerTwoName} wins the round`;

        roundMessageElement.textContent =
            `${playerTwoName} won the five-game round.`;

    } else {

        roundResultElement.textContent =
            "The round is tied";

        roundMessageElement.textContent =
            "Neither player won the round.";
    }
};


// restart current game

restartButton.addEventListener(
    "click",
    () => {

        startNewGame();

    }
);


// rematch

rematchButton.addEventListener(
    "click",
    () => {

        playerOneScore = 0;

        playerTwoScore = 0;

        gamesPlayed = 0;


        updateScoreboard();


        roundScreen.hidden = true;

        gameScreen.hidden = false;


        startNewGame();

    }
);


// new players

newRoundButton.addEventListener(
    "click",
    () => {

        playerOneScore = 0;

        playerTwoScore = 0;

        gamesPlayed = 0;


        roundScreen.hidden = true;

        startScreen.hidden = false;


        nameForm.innerHTML = "";

    }
);


// share result

shareResultButton.addEventListener(
    "click",
    async () => {

        const resultText =
            `${playerOneName} vs ${playerTwoName}\n` +
            `Final score: ${playerOneScore} - ${playerTwoScore}\n` +
            `Played a five-game round of Tic Tac Toe.`;


        if (
            navigator.share
        ) {

            try {

                await navigator.share({
                    title: "Tic Tac Toe",
                    text: resultText
                });

            } catch (error) {

                console.log(
                    "Share cancelled."
                );
            }

        } else {

            await navigator.clipboard.writeText(
                resultText
            );

            shareResultButton.textContent =
                "Result Copied";

            setTimeout(() => {

                shareResultButton.textContent =
                    "Share Result";

            }, 1500);
        }
    }
);


// reset statistics

resetStatsButton.addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "Reset all statistics?"
            );


        if (!confirmed) {
            return;
        }


        stats = {
            games: 0,
            wins: 0,
            losses: 0,
            draws: 0,
            currentStreak: 0,
            bestStreak: 0
        };


        saveStats();

    }
);


// theme system

const themes = [
    "",
    "light",
    "neon"
];


let currentThemeIndex = 0;


// load saved theme

const savedTheme =
    localStorage.getItem(
        "ticTacToeTheme"
    );


if (savedTheme) {

    currentThemeIndex =
        themes.indexOf(savedTheme);

    if (currentThemeIndex < 0) {
        currentThemeIndex = 0;
    }

    document.body.className =
        savedTheme;
}


// change theme

const changeTheme = () => {

    currentThemeIndex++;

    if (
        currentThemeIndex >=
        themes.length
    ) {

        currentThemeIndex = 0;
    }


    const theme =
        themes[currentThemeIndex];


    document.body.className =
        theme;


    localStorage.setItem(
        "ticTacToeTheme",
        theme
    );
};


themeButton.addEventListener(
    "click",
    changeTheme
);


themeButtonGame.addEventListener(
    "click",
    changeTheme
);


// mode selection

botModeButton.addEventListener(
    "click",
    () => {

        showNameForm("bot");

    }
);


multiplayerModeButton.addEventListener(
    "click",
    () => {

        showNameForm("multiplayer");

    }
);