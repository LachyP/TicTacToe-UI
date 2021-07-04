This is a program written in C++ that can play tic-tac-toe based on the minimax algorithm

It is compiled into the program file tictactoe.bin using the makefile with the command:

  make tictactoe
  
This can then be executed using the following command:
  ./tictactoe.bin [state] [path] prune [ply]

The basics to start out with are as follows:

The input variable [state] is a string that encodes a tictactoe board state, and
the input variable [path] is the path to an output text file.

Raster scanning is used to encode a board state, scanning the board
from left to right, top to bottom, for example the board state:
  o---x----
is equivalent to a 'o' in the top left corner of the board, and
an 'x' in the middle space of the board.
Blank spaces on the board are represented by the '-' character.
This is how board states are to be fed into the program.

Given this input parameter the program takes the following steps:

1. Determine if there are further moves possible starting from the given input state.
  if there are no further moves, the program will quit immediately and not print or write anything
2. If there are further moves, determine whose turn it is, either Max's (x) or Min's (o). This program
  assumes that Max is always the first player to move at the start of any game.
3. For the current player, calculate the best possible move to make based on the minimax principle.
  Print this move to the terminal in the form of the board state resulting from the best move.

This is where the [path] variable comes into play. As a further look inside the minimax algorithm,
the program will print to the output file at [path] the state of all of the nodes that have been
visited when traversing the game tree (excluding the input state), as well as the minimax value of each
of these visited nodes.


For this simple game, the game tree generated can be huge, especially when starting from a board state that is almost
blank, and for this reason, this program has also implemented alpha-beta pruning.

By adding the string 'prune' to the input arguments, the program will utilize alpha-beta pruning in order to optimize
the generated game tree by not traversing down paths that are unnecessary.

The theory behind alpha beta pruning is explained very well by Sebastian Lague here: https://www.youtube.com/watch?v=l-hh51ncgDI&t=329s


In an attempt to speed up this algorithm even further, early termination has been implemented through the final input parameter [ply]

[ply] is used to tell the program the maximum number of moves ahead it can look at. Because this often results in board states that are not
terminal, the program must generate a heuristic in order to determine how optimal a certain board state is to both min or max.

This heuristic is generated as an evaluation function in the form of E(s) = M(s) - O(s) in which s is a board state, and M(s) and O(s) represent
the number of 'winning lines' available for both Max and Min respectively. A winning line is a vertical, horizontal or diagonal line in which all the characters are either
blank, or either of min or max. This means that the board state is still a winning possibility for that player and so increases its value to that player.

Early termination certainly speeds up the program by minimizing the search tree, however, as a result of this, can result in a move that is not technically
the best possible move.
