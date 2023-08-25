const WebSocket = require('ws')
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ws = new WebSocket('ws://localhost:8080')
ws.on('open', function open() {
    const clientID = Date.now()
    process.stdout.write("msg: ");

    ws.on('message', function message(data) {
        const [id, msg] = `${data}`.split(')')
        if (id != clientID) {
            console.log(`----------received: ${msg}`);
            process.stdout.write("msg: ");
        } else {
            process.stdout.write("msg: ");
        }
    });

    rl.on('line', (msg) => {
        ws.send(`${clientID})${msg}`)
    })
});
