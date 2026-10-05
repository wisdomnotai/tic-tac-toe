import { board, makeMove, currentPlayer } from "./game.js";

// make some moves
makeMove(0); // X
makeMove(3); // O
makeMove(1); // X
makeMove(4); // O
const result = makeMove(2); // X

console.log("Result:", result);

// function to display board
const displayBoard = (board) => {
    const row1 = board.slice(0, 3);
    const row2 = board.slice(3, 6);
    const row3 = board.slice(6, 9);

    const newrow1 = row1.map((cell) => {
        if (cell === "") {
            return "-";
        }
        return cell;
    });

    const newrow2 = row2.map((cell) => {
        if (cell === "") {
            return "-";
        }
        return cell;
    });

    const newrow3 = row3.map((cell) => {
        if (cell === "") {
            return "-";
        }
        return cell;
    });

    console.log(newrow1.join(" | "));
    console.log(newrow2.join(" | "));
    console.log(newrow3.join(" | "));
};

displayBoard(board);