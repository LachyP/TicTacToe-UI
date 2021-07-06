import Express from "express";
const port = 3000;

const app = Express();

app.get('/', function(req,res){
    //this is the only page in the app, only need to send a text file.
    res.sendFile("/users/lachi/Documents/Personal Projects/TicTacToe-UI/public/tictactoe.html")
});

app.use(Express.static('/users/lachi/Documents/Personal Projects/TicTacToe-UI/public'));
app.listen(port, () => console.log("listening on port " + port));

