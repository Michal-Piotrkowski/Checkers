class Net {
    fetchPostAsync = async (nicks) => {
        let data = JSON.stringify({
            player: new Player(nicks),
        })
        let options = {
            method: "POST",
            body: data,
            headers: { 'Content-Type': 'application/json' }
        };
        let response = await fetch("/sendplayers", options)
        console.log(response)
        if (!response.ok)
            return response.status
        else
            return response.json() // response.json

    }
    fetchPostAsync2 = async () => {
        let options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        };
        let response = await fetch("/delplayers", options)
        console.log(response)
        if (!response.ok)
            return response.status
        else
            return response.json() // response.json

    }

    fetchPostAsyncDownloadPawns = async () => {
        let response = await fetch("/downloadPawns")
        if (!response.ok)
            return response.status
        else
            return response.json() // response.json

    }

    fetchPostAsyncUpdatePawns = async (map, color) => {
        let data = JSON.stringify({
            map: map,
            color: color,
        })

        let options = {
            method: "POST",
            body: data,
            headers: { 'Content-Type': 'application/json' }
        };
        let response = await fetch("/updatePawns", options)
        console.log(response)
        if (!response.ok)
            return response.status
        else
            return response.json() // response.json

    }

    fetchPostAsyncCheckIfGameStarted = async (map) => {
        let options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' }
        };
        let response = await fetch("/CheckIfGameStarted", options)
        console.log(response)
        if (!response.ok)
            return response.status
        else
            return response.json() // response.json


    }

    fetchPostAsyncCheckIfMyTurn = async (myColour) => {
        let data = JSON.stringify({
            myColour: myColour,
        })
        let options = {
            method: "POST",
            body: data,
            headers: { 'Content-Type': 'application/json' }
        };
        let response = await fetch("/CheckIfMyTurn", options)
        console.log(response)
        if (!response.ok)
            return response.status
        else
            return await response.json() // response.json


    }

    fetchPostAsyncWhoseTurn = async (color) => {
        let data = JSON.stringify({
            color: color,
        })
        let options = {
            method: "POST",
            body: data,
            headers: { 'Content-Type': 'application/json' }
        };
        let response = await fetch("/whoseTurn", options)
        console.log(response)
        if (!response.ok)
            return response.status
        else
            return response.json() // response.json


    }
}
