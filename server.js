const e = require("express");
var express = require("express");
const { platform } = require("os");
var app = express()
const PORT = 4000;
let turn = true;
var players = [];
var map = [
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
];
app.use(express.static('static'))
app.use(express.json())

app.post("/sendplayers", function (req, res) {
    console.log("1")
    if (players.length == 0) {
        players.push(req.body.player)
        let player = {
            num: 1,
            nick: req.body.player.nick
        }
        res.send(JSON.stringify(player, null, 5));
    }
    else if (players.length == 1) {
        players.push(req.body.player)
        let player = {
            num: 2,
            nick: req.body.player.nick
        }
        res.send(JSON.stringify(player, null, 5));
    }
    else {
        res.send(JSON.stringify(0, null, 5));
    }
})

app.post("/delplayers", function (req, res) {
    //console.log("1")
    players.pop()
    console.log(players)
    res.send("[]");
})

app.get("/downloadPawns", function (req, res) {
    //console.log("DOWNLOAD PAWNS EVERY SEC")
    //console.log(map)
    res.send(JSON.stringify({ map }));
})

app.post("/updatePawns", function (req, res) {
    console.log("1")
    if (req.body.color == "w") {
        turn = false;
    }
    else {
        turn = true;
    }
    map = req.body.map;
    res.send("[]");
})

app.post("/CheckIfGameStarted", function (req, res) {
    if (players.length == 2) {
        res.send(JSON.stringify(1));
    }
    else {
        res.send(JSON.stringify(0));
    }
})

app.post("/CheckIfMyTurn", function (req, res) {
    if (req.body.myColour == "w") {
        res.send(JSON.stringify(turn));
    }
    else {
        res.send(JSON.stringify(!turn));
    }

})


app.listen(PORT, function () {
    console.log("Start serwera na porcie " + PORT)
})