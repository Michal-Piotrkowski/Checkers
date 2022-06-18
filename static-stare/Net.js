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
        if (!response.ok)
            return response.status
        else
            return await response.json() // response.json

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
            return await response.json() // response.json

    }
    // fetchClose = async (nick) => {
    //     let data = JSON.stringify({
    //         playerToDelete: nick
    //     })
    //     let options = {
    //         method: "POST",
    //         body: data,
    //         headers: { 'Content-Type': 'application/json' }
    //     };
    //     let response = await fetch("/delplayers", options)
    //     console.log(response)
    //     if (!response.ok)
    //         return response.status
    //     else
    //         return await response.json() // response.json

    // }
}
// export default Net;