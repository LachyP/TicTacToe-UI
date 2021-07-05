var sampleState = "ooxoxx---";
var maxsturn = true;
var boardState = "---------"

var gameOverDisplayed = false;
function insertChar(elem){
    //if the game over screen is displayed, then reset the board with another click
    if(gameOverDisplayed){
        resetBoard();
        resetBoard();
        gameOverDisplayed = false;
    }
    else {
        //don't let player's moves override moves that have already been taken
        if (document.getElementsByClassName("cell")[elem].innerHTML === "") {
            var char;
            if (maxsturn) {
                char = "x";
                maxsturn = false;
                document.getElementById("whoseturn").innerHTML = "Player 2's turn";
            } else {
                char = "o";
                maxsturn = true;
                document.getElementById("whoseturn").innerHTML = "Player 1's turn";
            }
            document.getElementsByClassName("cell")[elem].innerHTML = char;
            //
            boardState = boardState.split('');

            boardState.splice(elem,1,char);
            let newState = boardState.join('');
            boardState = newState
            //document.getElementById("whoseturn").innerHTML = boardState;
            //if terminal state, display the game over screen
            if (isGameOver() === "x") {
                document.getElementById("whoseturn").innerHTML = "Game Over - Player 1 Wins!";
                gameOverDisplayed = true;
            }
            if (isGameOver() === "o") {
                document.getElementById("whoseturn").innerHTML = "Game Over - Player 2 Wins!"
                gameOverDisplayed = true;
            }


        }
    }
    //loadBoardState(sampleState);
}

function loadBoardState(state){
    //state is 9 characters, there are 9 cells in the table
    //go through each character, update the corresponding cell
    //will be needed for reading in c++ program output from backend
    for(var i = 0; i < 9; i++){
        if(state[i] != '-') {
            document.getElementsByClassName("cell")[i].innerHTML = state[i];
        }
    }
}

function resetBoard(){
    document.getElementById("whoseturn").innerHTML="Player 1's turn";
    maxsturn = true;
    boardState = "---------";
    for(var i = 0; i < 9; i++){
        document.getElementsByClassName("cell")[i].innerHTML="";
    }
}

function isGameOver(){
    if(document.getElementsByClassName("cell")[5].innerHTML === "x"){
        return "x";
    }
    if(document.getElementsByClassName("cell")[5].innerHTML === "o"){
        return "o";
    }
    return "-";

}