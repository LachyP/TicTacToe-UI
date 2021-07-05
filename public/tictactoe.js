var sampleState = "ooxoxx---";
var maxsturn = true;
function insertChar(elem){
    //don't let player's moves override moves that have already been taken
    if(document.getElementsByClassName("cell")[elem].innerHTML === "") {
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

    for(var i = 0; i < 9; i++){
        document.getElementsByClassName("cell")[i].innerHTML="";
    }
}

function isGameOver(){

}