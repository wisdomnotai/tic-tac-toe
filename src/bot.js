// getting a random move for the bot

export const getBotMove = (board) => {
    const availableMoves = [];

    board.forEach((cell, index) => {
        if (cell === "") {
            availableMoves.push(index);
        }
    });

    const randomIndex = Math.floor(
        Math.random() * availableMoves.length
    );

    return availableMoves[randomIndex];
};