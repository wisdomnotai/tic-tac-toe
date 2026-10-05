// get empty spaces

const getAvailableMoves = (board) => {
    const moves = [];

    board.forEach((cell, index) => {
        if (cell === "") {
            moves.push(index);
        }
    });

    return moves;
};


// check winner

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


// random move

const getRandomMove = (board) => {

    const availableMoves = getAvailableMoves(board);

    const randomIndex = Math.floor(
        Math.random() * availableMoves.length
    );

    return availableMoves[randomIndex];
};


// find a winning move

const findWinningMove = (board, player) => {

    const availableMoves = getAvailableMoves(board);

    for (const move of availableMoves) {

        board[move] = player;

        const winner = getWinner(board);

        board[move] = "";

        if (winner === player) {
            return move;
        }
    }

    return null;
};


// medium bot

const getMediumMove = (board) => {

    // try to win
    const winningMove = findWinningMove(board, "O");

    if (winningMove !== null) {
        return winningMove;
    }


    // block the player
    const blockingMove = findWinningMove(board, "X");

    if (blockingMove !== null) {
        return blockingMove;
    }


    // take center
    if (board[4] === "") {
        return 4;
    }


    // take a corner
    const corners = [0, 2, 6, 8];

    const availableCorners = corners.filter(
        (corner) => board[corner] === ""
    );

    if (availableCorners.length > 0) {

        const randomIndex = Math.floor(
            Math.random() * availableCorners.length
        );

        return availableCorners[randomIndex];
    }


    return getRandomMove(board);
};


// minimax

const minimax = (board, isBotTurn) => {

    const winner = getWinner(board);


    if (winner === "O") {
        return 10;
    }


    if (winner === "X") {
        return -10;
    }


    if (winner === "draw") {
        return 0;
    }


    const availableMoves = getAvailableMoves(board);


    if (isBotTurn) {

        let bestScore = -Infinity;


        for (const move of availableMoves) {

            board[move] = "O";

            const score = minimax(board, false);

            board[move] = "";

            bestScore = Math.max(
                bestScore,
                score
            );
        }


        return bestScore;
    }


    let bestScore = Infinity;


    for (const move of availableMoves) {

        board[move] = "X";

        const score = minimax(board, true);

        board[move] = "";

        bestScore = Math.min(
            bestScore,
            score
        );
    }


    return bestScore;
};


// impossible bot

const getImpossibleMove = (board) => {

    const availableMoves = getAvailableMoves(board);

    let bestScore = -Infinity;

    let bestMove = null;


    for (const move of availableMoves) {

        board[move] = "O";

        const score = minimax(
            board,
            false
        );

        board[move] = "";


        if (score > bestScore) {

            bestScore = score;

            bestMove = move;
        }
    }


    return bestMove;
};


// public bot function

export const getBotMove = (board, difficulty) => {

    if (difficulty === "easy") {
        return getRandomMove(board);
    }


    if (difficulty === "medium") {
        return getMediumMove(board);
    }


    return getImpossibleMove(board);
};