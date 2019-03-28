let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let cors = require('cors');
let corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
    credentials: true
};
let id = 0;

app.use(cors(corsOptions));


app.get('/', function(req, res) {

    res.sendfile("client/index.html");
});

io.on('connection', function(client) {
    client.emit('message', 'Hello from server');
    id++;
    client.username = id;
    console.log('Client'+id+ 'connected...');
    client.broadcast.emit('message','User bob'+ id+ ' connected');
    client.on('new_user', function(data) {
        client.emit('message', "Je suis "+ data+ client.username);
    });

    client.on('message', function(data) {
        client.broadcast.emit('message',data);
    });

});
server.listen(8080);
console.log('Listening on port 8080...');

