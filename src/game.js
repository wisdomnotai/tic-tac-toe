export const board = [
    "","","",
    "","","",
    "","","",
];

export let currentPlayer = "X";

export const makeMove = (position,player)=>{
    if (board[position] === ""){
            board[position] = currentPlayer;

            const winner = checkWinner();
            if (winner){
                console.log(`${winner} wins!`);
                return true;
            }
            if (currentPlayer === "X"){
                currentPlayer = "0";
            }else{
                currentPlayer = "X";
            }
            return true;
    }
    return false;
}

//creating the winnning rules
export function checkWinner() {
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
}