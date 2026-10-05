import { board, makeMove } from "./game.js";

// rendering the board
const boardElement = document.querySelector("#board");

const displayBoard = () => {
    boardElement.innerHTML = "";

    board.forEach((cell, index) => {
        const button = document.createElement("button");

        button.textContent = cell;

        button.addEventListener("click", () => {
            makeMove(index);
            displayBoard();
        });

        boardElement.appendChild(button);
    });
};

displayBoard();