// import Game from "./Game.js";
// import Net from "./Net.js";
// import Ui from "./Ui.js";

let game;
let net;
let ui;
let x;

window.onload = () => {
    game = new Game();
    net = new Net();
    ui = new Ui();
    game.createBoard();
    setInterval(game.createPawns.bind(game), 10);
    let x = setInterval(function () {
        game.askForStart(game)
        if (game.game_started == true) {
            clearInterval(x)
        }
    }, 1000);
    let i = 0;
    let z = setInterval(function () {
        if (game.game_started == true) {
            game.isMyTurn(game.myColour, i)
            if (game.myTurn == true || i == 30) {
                i = 0
            }
            i++
        }
    }, 1000);
    console.log(game);
    console.log(net);
    console.log(ui);
}
