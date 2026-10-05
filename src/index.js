import { cloneElement } from "react";
import { board, makeMove, currentPlayer } from "./game.js";

makeMove(0);

makeMove(4);

//function to display board
const displayBoard = (board) => {
    const row1 = board.slice(0,3);
    const row2 = board.slice(3,6);
    const row3 = board.slice(6,9);

    console.log(row1.join(" | "));
    console.log(row2.join(" | "));
    console.log(row3.join(" | ")); 
};