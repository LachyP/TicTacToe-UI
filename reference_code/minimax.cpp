#include <iostream>
#include <string>
#include <algorithm>
#include <fstream>

using namespace std;
int isGameOver(string state, bool isMax){
  //check if isMax, if true, then min's turn was last, check if min has won,
  //otherwise check if max has won
  if((state[0] == state[1] && state[1] == state[2] && state[2] != '-')
    || (state[3] == state[4] && state[4] == state[5] && state[5] != '-')
    || (state[6] == state[7] && state[7] == state[8] && state[8] != '-')){
      if(isMax){
        return -1;
      }
      else{
        return 1;
      }
    }

  if((state[0] == state[3] && state[3] == state[6] && state[6] != '-')
    || (state[1] == state[4] && state[4] == state[7] && state[7] != '-')
    || (state[2] == state[5] && state[5] == state[8] && state[8] != '-')){
      if(isMax){
          return -1;
      }
      else{
        return 1;
      }
    }
  if((state[0] == state[4] && state[4] == state[8] && state[8] != '-')
    || (state[6] == state[4] && state[4] == state[2] && state[2] != '-')){
      if(isMax){
        return -1;
      }
      else{
        return 1;
      }
    }
    return 0;
}

int heuristic(string state){
  //check maxes
  //state 1
  int maxes = 0;
  if((state[0] == 'x' || state[0] == '-') &&
    (state[1] == 'x' || state[1] == '-') &&
    (state[2] == 'x' || state[2] == '-')){
    maxes++;
    //cout << 1 << endl;
  }
  //state 2
  if((state[3] == 'x' || state[3] == '-')&&
      (state[4] == 'x' || state[4] == '-') &&
      (state[5] == 'x' || state[5] == '-')){
        maxes++;
     // cout << 2 << endl;
  }
  //state 3
  if((state[6] == 'x' || state[6] == '-')&&
    (state[7] == 'x' || state[7] == '-')&&
    (state[8] == 'x' || state[8] == '-')){
      maxes++;
    //cout << 3 << endl;
  }
  //state 4
  if((state[0] == 'x' || state[0] == '-')&&
    (state[3] == 'x' || state[3] == '-')&&
    (state[6] == 'x' || state[6] == '-')){
      maxes++;
   // cout << 4 << endl;
  }
  //state 5
  if((state[1] == 'x' || state[1] == '-')&&
    (state[4] == 'x' || state[4] == '-')&&
    (state[7] == 'x' || state[7] == '-')){
      maxes++;
    //cout << 5 << endl;
  }
  //state 6
  if((state[2] == 'x' || state[2] == '-')&&
    (state[5] == 'x' || state[5] == '-')&&
    (state[8] == 'x' || state[8] == '-')){
      maxes++;
   // cout << 6 << endl;
  }
  //state 7
  if((state[0] == 'x' || state[0] == '-')&&
    (state[4] == 'x' || state[4] == '-')&&
    (state[8] == 'x' || state[8] == '-')){
      maxes++;
    //cout << 7 << endl;
  }
  //state 8
  if((state[2] == 'x' || state[2] == '-')&&
    (state[4] == 'x' || state[4] == '-')&&
    (state[6] == 'x' || state[6] == '-')){
      maxes++;
    //cout << 8 << endl;
  }

  //check mins
  int mins = 0;
  //state 1
  if((state[0] == 'o' || state[0] == '-') &&
    (state[1] == 'o' || state[1] == '-') &&
    (state[2] == 'o' || state[2] == '-')){
      mins++;
  }
  //state 2
  if((state[3] == 'o' || state[3] == '-')&&
      (state[4] == 'o' || state[4] == '-') &&
      (state[5] == 'o' || state[5] == '-')){
        mins++;
  }
  //state 3
  if((state[6] == 'o' || state[6] == '-')&&
    (state[7] == 'o' || state[7] == '-')&&
    (state[8] == 'o' || state[8] == '-')){
      mins++;
  }
  //state 4
  if((state[0] == 'o' || state[0] == '-')&&
    (state[3] == 'o' || state[3] == '-')&&
    (state[6] == 'o' || state[6] == '-')){
      mins++;
  }
  //state 5
  if((state[1] == 'o' || state[1] == '-')&&
    (state[4] == 'o' || state[4] == '-')&&
    (state[7] == 'o' || state[7] == '-')){
      mins++;
  }
  //state 6
  if((state[2] == 'o' || state[2] == '-')&&
    (state[5] == 'o' || state[5] == '-')&&
    (state[8] == 'o' || state[8] == '-')){
      mins++;
  }
  //state 7
  if((state[0] == 'o' || state[0] == '-')&&
    (state[4] == 'o' || state[4] == '-')&&
    (state[8] == 'o' || state[8] == '-')){
      mins++;
  }
  //state 8
  if((state[2] == 'o' || state[2] == '-')&&
    (state[4] == 'o' || state[4] == '-')&&
    (state[6] == 'o' || state[6] == '-')){
      mins++;
  }
  //cout << "maxes: " << maxes << endl;
  //cout << "mins: " << mins << endl;
  return maxes-mins;

}
bool isdigit(string input){
  if(input[0] >= 48 && input[0] <= 57 ){
    return true;
  }
  return false;
}
