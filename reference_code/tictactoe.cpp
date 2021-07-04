#include <iostream>
#include <fstream>
#include <string>
#include "minimax.cpp"
//includes the static evaluation function isGameOver()
using namespace std;
ofstream myfile;

//stock standard minimax algorithm
int minimaxU(string state, int movesLeft, bool isMax, bool initialState){
  if(isGameOver(state, isMax) != 0){
    //return the value of the terminal state, being 1 or -1
    return isGameOver(state, isMax);
  }
  else{
    if(movesLeft == 0){
      //if no moves left and isGameOver returns a 0, then it is a draw
      return 0;
    }
  }
  string newState;
  string nextMove;
  int currentValue;
  if(isMax){
    //maximizing
    int maxValue = -999999;
    for(int i = 0; i < state.length(); i++){
      if(state[i] == '-'){
        newState = state;
        newState.replace(i,1,"x");
        currentValue = minimaxU(newState, movesLeft-1, false, false);

        //document visited nodes and their corresponding minimax value
        myfile << newState;
        myfile << " ";
        myfile << currentValue;
        myfile << "\n";

        if(currentValue > maxValue && initialState){
          //next best move found
          nextMove = newState;
        }
        maxValue = max(currentValue, maxValue);
      }
    }
    if(initialState){
      //return the next move to be made
      cout << nextMove << endl;
    }
    return maxValue;
  }
  else{
    //minimizing
    int minValue = 999999;
    for(int i = 0; i < state.length(); i++){
      if(state[i] == '-'){
        newState = state;
        newState.replace(i,1,"o");
        currentValue = minimaxU(newState, movesLeft-1,true,false);
        //document visited nodes and their corresponding minimax value
        myfile << newState;
        myfile << " ";
        myfile << currentValue;
        myfile << "\n";
        if(currentValue < minValue && initialState){
          //next best move found
          nextMove = newState;
        }
        minValue = min(currentValue,minValue);
      }
    }
    if(initialState){
      //return the next move to be made
      cout << nextMove << endl;
    }
    return minValue;
  }
  return 0;
}

//minimax algorithm that incorporates alpha beta pruning
int minimaxP(string state, int movesLeft, bool isMax, bool initialState, int alpha, int beta){
  //minimax function that incorporates Alpha beta pruning
  if(isGameOver(state, isMax) != 0){
    //return the value of the terminal state, being 1 or -1
    return isGameOver(state, isMax);
  }
  else{
    if(movesLeft == 0){
      //if no moves left and isGameOver returns a 0, then it is a draw
      return 0;
    }
  }
  string newState;
  string nextMove;
  int currentValue;
  if(isMax){
    //maximizing
    int maxValue = -999999;
    for(int i = 0; i < state.length(); i++){
      if(state[i] == '-'){
        newState = state;
        newState.replace(i,1,"x");
        currentValue = minimaxP(newState, movesLeft-1, false, false, alpha, beta);

        //document visited nodes and their corresponding minimax value
        myfile << newState;
        myfile << " ";
        myfile << currentValue;
        myfile << "\n";

        if(currentValue > maxValue && initialState){
          //next best move found
          nextMove = newState;
        }
        maxValue = max(currentValue, maxValue);
        alpha = max(alpha,currentValue);
        if(beta <= alpha){
          break;
        }
      }
    }
    if(initialState){
      //return the next move to be made
      cout << nextMove << endl;
    }
    return maxValue;
  }
  else{
    //minimizing
    int minValue = 999999;
    for(int i = 0; i < state.length(); i++){
      if(state[i] == '-'){
        newState = state;
        newState.replace(i,1,"o");
        currentValue = minimaxP(newState, movesLeft-1,true,false,alpha,beta);
        //document visited nodes and their corresponding minimax value
        myfile << newState;
        myfile << " ";
        myfile << currentValue;
        myfile << "\n";
        if(currentValue < minValue && initialState){
          //next best move found
          nextMove = newState;
        }
        minValue = min(currentValue,minValue);
        beta = min(beta,currentValue);
        if(beta <= alpha){
          break;
        }
      }
    }
    if(initialState){
      //return the next move to be made
      cout << nextMove << endl;
    }
    return minValue;
  }
  return 0;

}


int minimaxE(string state, int depth, bool isMax, bool initialState, int alpha, int beta){
  //minimax function that incorporates Alpha beta pruning as well as early exit
  if(isGameOver(state, isMax) != 0 || depth == 0){
    //check if game is in a terminal state, or if maximum depth has been reached by the program
    return heuristic(state);
  }
  //else{
  //  if(movesLeft == 0){
  //    //if no moves left and isGameOver returns a 0, then it is a draw
  //    return 0;
  //  }
  //}
  string newState;
  string nextMove;
  int currentValue;
  int newValue;
  if(isMax){
    //maximizing
    int maxValue = -999999;
    for(int i = 0; i < state.length(); i++){
      if(state[i] == '-'){
        newState = state;
        newState.replace(i,1,"x");

        currentValue = minimaxE(newState, depth-1, false, false, alpha, beta);

        //document visited nodes and their corresponding minimax value
        myfile << newState;
        myfile << " ";
        myfile << currentValue;
        myfile << "\n";

        if(currentValue > maxValue && initialState){
          //next best move found
          nextMove = newState;
        }
        maxValue = max(currentValue, maxValue);
        alpha = max(alpha,currentValue);
        if(beta <= alpha){
          break;
        }
      }
    }
    if(initialState){
      //return the next move to be made
      cout << nextMove << endl;
    }
    return maxValue;
  }
  else{
    //minimizing
    int minValue = 999999;
    for(int i = 0; i < state.length(); i++){
      if(state[i] == '-'){
        newState = state;
        newState.replace(i,1,"o");
        currentValue = minimaxE(newState, depth-1,true,false,alpha,beta);
        //document visited nodes and their corresponding minimax value
        myfile << newState;
        myfile << " ";
        myfile << currentValue;
        myfile << "\n";
        if(currentValue < minValue && initialState){
          //next best move found
          nextMove = newState;
        }
        minValue = min(currentValue,minValue);
        beta = min(beta,currentValue);
        if(beta <= alpha){
          break;
        }
      }
    }
    if(initialState){
      //return the next move to be made
      cout << nextMove << endl;
    }
    return minValue;
  }
  return 0;
  //cout << heuristic(state) << endl;
}


int main(int argc, char* argv[]){
  //load up input file path

  myfile.open(argv[2]);

  //store the amount of dashes in the input
  int movesLeft = 0;
  //store the state of the board at any given time
  string state = argv[1];
  //store whether or not it is Max's or Min's turn currently
  bool isMax;

  for(int i = 0; i < state.length(); i++){
    if (state[i] == '-'){
      movesLeft++;
    }
  }
  //if not 0 moves left, check who's move it is
  if(movesLeft != 0){
    if(movesLeft % 2 != 0){
      isMax = true;
    }
    else{
      isMax = false;
    }
  }

  bool abprune = false;
  bool earlyexit = false;
  string p = "";
  string ply = "";
  int early;
  //check if alpha beta pruning is going to be utilised
  if(argv[3] != NULL){
    p = argv[3];
  }
  //check if will be using early termination in the algorithm
  //if(argv[4] == NULL){
  //  minimaxU(state,movesLeft,isMax,true);
  //  return 0;
  //}
  if(argv[4] != NULL){
    ply = argv[4];
    //cout << argv[4] << endl;
    //if(ply != "SHELL=/bin/bash"){
    if(isdigit(ply)){
      early = stoi(ply);
      earlyexit = true;
    }
  }
  if(p == "prune"){
    abprune = true;
  }
  int test;
  if(earlyexit){
    test = minimaxE(state,early,isMax,true,-999,999);
    //cout << heuristic("ooxxxoox-") << endl;
  }
  else{
    if(abprune){
      test = minimaxP(state,movesLeft,isMax,true,-999,999);
    }
    else{
      test = minimaxU(state, movesLeft, isMax, true);
    }
  }
  myfile.close();
  return 0;

}
