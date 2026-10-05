import { board, makeMove, currentPlayer, restartGame } from "./game.js";

const boardElement = document.querySelector("#board");
const statusElement = document.querySelector("#status");
const restartButton = document.querySelector("#restart");

//game state 
let gameOver = false;

//rendering the board
const displayBoard = () => {
    boardElement.innerHTML = "";

    board.forEach((cell, index) => {
        const button = document.createElement("button");

        button.textContent = cell;

        button.addEventListener("click", () => {
            if (gameOver || board[index] !== ""){
                return;
            }
            const result = makeMove(index);
            if (result === "X" || result === "O"){
                statusElement.textContent =    `Player ${result} wins`;
                gameOver = true;
            }else if (result === "draw"){
                statusElement.textContent = `It's a draw`;
                gameOver = true;
            }else{
                statusElement.textContent = `Player ${currentPlayer}'s turn`; 
            }
            displayBoard();
        });

        boardElement.appendChild(button);
    });
};

//restarting the game
restartButton.addEventListener("click",() => {
    restartGame();
    gameOver = false;
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
    displayBoard();
})

displayBoard();