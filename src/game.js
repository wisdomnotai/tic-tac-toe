export const board = [
    "","","",
    "","","",
    "","","",
];

export let currentPlayer = "X";

export const makeMove = (position,player)=>{
    if (board[position] === ""){
            board[position] = currentPlayer;
            if (currentPlayer === "X"){
                currentPlayer = "0";
            }else{
                currentPlayer = "X";
            }
            return true;
    }
    return false;
}