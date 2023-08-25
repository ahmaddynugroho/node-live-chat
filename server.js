const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })
const clients = []

wss.on('connection', function connection(ws) {
    console.log('Client connected')
    clients.push(ws)

    ws.on("close", () => {
        console.log("Client disconnected");
    });

    ws.on("message", (data) => {
        const [id, msg] = `${data}`.split(')')
        clients.forEach(ws => {
            ws.send(`${id})${msg}`)
        })
    })

    ws.onerror = function () {
        console.log("Some Error occurred");
    }
});