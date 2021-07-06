var sampleState = "ooxoxx---";
var maxsturn = true;
var boardState = "---------"
var moveCounter = 0;

var gameOverDisplayed = false;

function generateRandomInteger(maxVal){
    return Math.floor(Math.random() * maxVal) ;
}

function recieveRequest() {
    //document.getElementById("whoseturn").innerHTML = "CPU's turn";
    let validNumberGenerated = false;
    let randomNumber = 0;
   // console.log("yes");
    while (!validNumberGenerated) {
        //console.log("enter function");
        randomNumber = generateRandomInteger(9);
        if(boardState[randomNumber] === '-'){
            console.log(randomNumber);
            validNumberGenerated = true;
        }
    }
    validNumberGenerated = false;
    //once random free space has been found on the board, place character there
    boardState = boardState.split('');

    boardState.splice(randomNumber, 1, 'o');
    console.log(boardState.join(''));
    return boardState.join('');
}

function insertChar(elem){
    //if the game over screen is displayed, then reset the board with another click
    if(gameOverDisplayed){
        resetBoard();
        gameOverDisplayed = false;
        moveCounter = 0;
    }
    else {
        //x's turn
        if (document.getElementsByClassName("cell")[elem].innerHTML === "") {
            let char = "x";

            //players move
            document.getElementsByClassName("cell")[elem].innerHTML = char;
            moveCounter++;
            boardState = boardState.split('');

            boardState.splice(elem, 1, char);
            let newState = boardState.join('');
            boardState = newState;
            console.log(boardState);

            //game over check 1
            maxsturn = false;
            if (isGameOver() === "x") {
                document.getElementById("whoseturn").innerHTML = "Congrats, you won!";
                gameOverDisplayed = true;
            }
            if (isGameOver() === "draw") {
                document.getElementById("whoseturn").innerHTML = "Its a draw";
                gameOverDisplayed = true;
            }

            //ai's move
            if(!gameOverDisplayed) {
                console.log("ai's move");
                char = "o";
                document.getElementById("whoseturn").innerHTML = "AI's turn";
                boardState = recieveRequest();
                //wait a few seconds, simulate thinking
                setTimeout(function () {
                    loadBoardState(boardState);
                    document.getElementById("whoseturn").innerHTML = "Your turn";
                    maxsturn = true;
                    //game over check 2
                    if (isGameOver() === "o") {
                        document.getElementById("whoseturn").innerHTML = "AI wins";
                        gameOverDisplayed = true;
                    }
                }, 2000);

            }
        }
    }
    //check if game over

    //if not then o's turn (ai)

    //check if game over
    /*else {
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
                //recieveRequest();
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
    }*/
    //boardState = recieveRequest(elem);
    //loadBoardState(boardState);
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
    //console.log("function executing");
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