class Ui {
    constructor() {
        let nume;
        let json
        document.getElementById("submit").onclick = async () => {
            let nicks = document.getElementById("nick").value
            json = await net.fetchPostAsync(nicks)
            console.log(json)
            nume = json.num
            this.closeUi(json.num, json.nick);
        }
        document.getElementById("reset").onclick = async () => {
            await net.fetchPostAsync2()
        }
        // window.addEventListener("beforeunload", function (event) {
        //     await net.fetchClose(json.nick)
        // })
    }

    closeUi(num, nick) {
        if (num == 1) {
            this.nume = "w"
            document.getElementById("wait").style.display = "flex"
            document.getElementById("ui").style.display = "none";
            document.getElementById("role").innerHTML = "Witaj w grze " + nick + ", grasz białymi";
        }
        else if (num == 2) {
            this.nume = "b"
            game.camera.position.z = -90;
            document.getElementById("ui").style.display = "none";
            document.getElementById("role").innerHTML = "Witaj w grze " + nick + ", grasz czarnymi";
        }
        else {
            game.camera.position.x = -90;
            game.camera.position.y = 100;
            game.camera.position.z = 0;
            document.getElementById("ui").style.display = "none";
            document.getElementById("role").innerHTML = "You are Spectator";
        }
    }

    waitingRoom() {
        document.getElementById("wait").style.display = "flex"
    }
}


// export default Ui;
