var sampleState = "ooxoxx---";
var maxsturn = true;
var boardState = "---------"
var moveCounter = 0;

var gameOverDisplayed = false;
function insertChar(elem){
    //if the game over screen is displayed, then reset the board with another click
    if(gameOverDisplayed){
        resetBoard();
        gameOverDisplayed = false;
        moveCounter = 0;
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
            moveCounter++;
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
                document.getElementById("whoseturn").innerHTML = "Game Over - Player 2 Wins!";
                gameOverDisplayed = true;
            }
            if(isGameOver() === "draw") {
                document.getElementById("whoseturn").innerHTML = "Game Over - Draw";
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
        if(state[i] !== '-') {
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
    //check if isMax, if true, then min's turn was last, check if min has won,
    //otherwise check if max has won
    if((boardState[0] === boardState[1] && boardState[1] === boardState[2] && boardState[2] !== '-')
        || (boardState[3] === boardState[4] && boardState[4] === boardState[5] && boardState[5] !== '-')
        || (boardState[6] === boardState[7] && boardState[7] === boardState[8] && boardState[8] !== '-')){
        if(maxsturn){
            return "o";
        }
        else{
            return "x";
        }
    }

    if((boardState[0] === boardState[3] && boardState[3] === boardState[6] && boardState[6] !== '-')
        || (boardState[1] === boardState[4] && boardState[4] === boardState[7] && boardState[7] !== '-')
        || (boardState[2] === boardState[5] && boardState[5] === boardState[8] && boardState[8] !== '-')){
        if(maxsturn){
            return "o";
        }
        else{
            return "x";
        }
    }
    if((boardState[0] === boardState[4] && boardState[4] === boardState[8] && boardState[8] !== '-')
        || (boardState[6] === boardState[4] && boardState[4] === boardState[2] && boardState[2] !== '-')){
        if(maxsturn){
            return "o";
        }
        else{
            return "x";
        }
    }

    if(moveCounter === 9){
        return "draw";
    }
    return "-";
}