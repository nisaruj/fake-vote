var server_port = process.env.PORT || 8080;

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var faker = require('faker');

var counter = 0;
var fname = []

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req,res){ 
    res.render('index',{});
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('timer', function(msg){
    });
});

setInterval(function(){
    //ping every 5 minutes
    if (counter % 300000 == 0){
        require("http").get("http://streamaward.herokuapp.com");
    }
    if (counter > 10){
        fname.shift();
    }
    fname.push(faker.name.findName());
    counter++;
    //console.log(fname);
    io.emit('timer', {counter: counter, fname: fname});
}, 50);

http.listen(server_port, function(){
    console.log('listening on %s', server_port);
});