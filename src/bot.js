
// getting all empty spaces on the board
const getAvailableMoves = (board) => {
    const moves = [];

    board.forEach((cell, index) => {
        if (cell === "") {
            moves.push(index);
        }
    });

    return moves;
};


// check if someone has won
const getWinner = (board) => {
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

    if (board.every((cell) => cell !== "")) {
        return "draw";
    }

    return null;
};


// minimax
const minimax = (board, isBotTurn) => {
    const winner = getWinner(board);

    // bot wins
    if (winner === "O") {
        return 10;
    }

    // player wins
    if (winner === "X") {
        return -10;
    }

    // draw
    if (winner === "draw") {
        return 0;
    }


    // bot's turn
    if (isBotTurn) {
        let bestScore = -Infinity;

        const availableMoves = getAvailableMoves(board);

        for (const move of availableMoves) {
            board[move] = "O";

            const score = minimax(board, false);

            board[move] = "";

            bestScore = Math.max(bestScore, score);
        }

        return bestScore;
    }


    // player's turn
    let bestScore = Infinity;

    const availableMoves = getAvailableMoves(board);

    for (const move of availableMoves) {
        board[move] = "X";

        const score = minimax(board, true);

        board[move] = "";

        bestScore = Math.min(bestScore, score);
    }

    return bestScore;
};


// choose the best move
export const getBotMove = (board) => {
    let bestScore = -Infinity;
    let bestMove = null;

    const availableMoves = getAvailableMoves(board);

    for (const move of availableMoves) {
        // temporarily make the move
        board[move] = "O";

        const score = minimax(board, false);

        // undo the move
        board[move] = "";

        if (score > bestScore) {
            bestScore = score;
            bestMove = move;
        }
    }

    return bestMove;
};

