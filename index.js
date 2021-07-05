import Express from "express";
//console.log('hello world');

//const app = Express();
const port = 3000;
// GET PUT POST DELETE

//let express = import('express');

const app = Express()

app.get('/', function(req,res){res.sendFile("/users/lachi/Documents/Personal Projects/TicTacToe-UI/public/tictactoe.html")})
app.use(Express.static('/users/lachi/Documents/Personal Projects/TicTacToe-UI/public'))
app.listen(port, () => console.log("listening on port " + port))
/*app.get("/", (req,res) => {
    res.sendFile("/users/lachi/Documents/Personal Projects/TicTacToe-UI/public/tictactoe.html");
});
app.use(express.static(__dirname + '/public'))

app.listen(port, ()=>console.log("listening on port " + port));
*/