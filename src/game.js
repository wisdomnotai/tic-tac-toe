export const board = [
    "", "", "",
    "", "", "",
    "", "", ""
];

// track whose turn it is
export let currentPlayer = "X";

// function to make a move
export const makeMove = (position) => {
    if (board[position] === "") {
        board[position] = currentPlayer;

        const winner = checkWinner();

        if (winner) {
            return winner;
        }
        if (checkDraw()){
            return "draw";
        }

        if (currentPlayer === "X") {
            currentPlayer = "O";
        } else {
            currentPlayer = "X";
        }

        return true;
    }

    return false;
};

// function to check for a winner
export const checkWinner = () => {
    const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const line of winningLines) {
        const [a, b, c] = line;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return board[a];
        }
    }

    return null;
};
//function to check for draw
export const checkDraw = () => {
    return board.every((cell) => cell !== "");
}