
const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3002;

const { createSocket } = require('dgram');
//app.use(express.static(path.resolve(__dirname, '../client/build')));
const root = require('path').join(__dirname, 'client', 'build')
app.use(express.static(root));

//app.get('*', (req, res) => {
//    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
//});
app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})
let messages = [];
server.listen(port, () => {
    console.log(`Our app is running on port ${port}`);
    app.set('port', port);
    app.portNumber = port;
});

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);

    socket.on('apertou', data => {
        socket.broadcast.emit('recebeu', data);

    });

    socket.on('requestPort', a => {
        socket.broadcast.emit('portn', port);
    })
});
io.on('disconnect', socket => {
    console.log(`Socket desconectado: ${socket.id}`);

});








