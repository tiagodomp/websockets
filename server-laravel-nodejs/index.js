const express = require("express");
var compression = require('compression');
const socketio = require("socket.io"); // o padrão do redis requer require("socket.io")(3000);
//const redisAdapter = require('socket.io-redis');
const bodyParser = require("body-parser");
const http = require("http");
const mysql = require('mysql');
const app = express();
//const Redis = require("ioredis");





/********************************************************
 *                                                      *
 *                                                      *
 *                  ROTAS                               *
 *                                                      *
 *  Todas as rotas das API's estarão definidas abaixo   *
 *                                                      *
 *                                                      *
 ********************************************************/
// var redis = new Redis();
// var emitterio = require('socket.io-emitter')(redis);

// // ---------------------------------- BLING ---------------------------------- //
// var Bling = new Redis.Cluster([{
//         host: "localhost/bling/public/cadastrar",
//         port: 8000
//     },
//     {
//         host: "localhost/bling/public/client/",
//         port: 8000
//     },
//     {
//         host: "localhost/bling/public/cadastrar",
//         port: 8000
//     },
// ]);

const con = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'hub'
});

con.connect(function(err) {
    if (err) return console.log(err);
    console.log('mysql conectou!');
})


server = http.createServer(app);

//interno e emitir diferentes instancias e processos
//const ioR = socketio.adapter(redisAdapter({ host: 'localhost', port: 8888 }));
const io = socketio(server);
const clients = [];

app.use(
    express.urlencoded({
        extended: true
    }),
    compression()
);

/**
 * Initialize Server
 */
server.listen(8888, function() {
    console.log("Servidor Rodando na Porta 8888");
});

/**
 * Página de Teste
 */
app.get("/", function(req, res) {
    res.send("Servidor Rodando...");
});

var like = function(params) {
    console.log(params);
    client = io.sockets.clients().sockets;

    //console.log(client);
    // Adicionado clientes
    io.on('connection', function(client) {
        client.join(params.token);
        io.to(params.token)
    });
    // for (const key in clients) {
    //     if (key != params.id) client[key].emit("like", params);
    // }
}


// Recebe requisição do Laravel
app.post("/like", function(req, res) {
    var params = req.body;
    client = io.sockets.clients().sockets;
    //var clients = io.sockets.clients().sockets;
    const nsp = io.of('/like');
    nsp.on("connection", function(client) {
        client.join(params.token);
        io.broadcast.to(params.token).emit('like');
    });
    nsp.broadcast.emit(params.name, {
        id: client.id
            //id: 'teste'
    });

    console.log(nsp);
    // Recebe conexão dos usuários no servidor através do namespace inicial
    io.on('disconnect', function() {
        console.log('usuario desconectado');
    });
    res.send();
});

// Recebe requisição do bling
app.post("/bling/notificacoes", function(req, res) {
    var params = req.body;
    var clients = io.sockets.clients().sockets;

    // Recebe conexão dos usuários no servidor através do namespace bling
    var bling = io
        .of('/bling/notificacoes') //defino o namepace
        .on('connection', function(socket) {
            io.emit('this', { will: 'Criando nova conxão com o BLING' });
            console.log('conectado com o bling');
            socket.on('private message', function(from, msg) { //defino a sala
                console.log('Recebendo mensagem privada de ', from, ': -> ', msg);
                // socket.emit('msg', {
                //     everyone: 'only',
                //     '/bling': 'socket on'
                // })
            });

            socket.on('disconnect', function() {
                //io.emit('user disconnected');
                console.log('usuario desconectado');
            });

            socket.emit('msg', {
                teste: 'in',
                '/bling': 'socket msg'
            })
        });

    for (const key in clients) {
        if (key != params.id) clients[key].emit("/bling/notificações", params);
    }

    res.send('teste');
});

// Recebe requisição do bling
app.post("/bling/msg", function(req, res) {
    var params = req.body;
    var clients = io.sockets.clients().sockets;
    var apisToken = "SELECT * FROM lojas WHERE apis = ?";

    if (String(params.token).length <= 36) {
        con.query(apisToken, [params.token], function(error, rows, fields) {
            if (error) {
                res.end();
                res.sendStatus(500);
                return
            }
            if (rows) {
                // Recebe conexão dos usuários no servidor através do namespace bling
                io.of('/bling/msg') //defino o namepace
                    .on('connection', function(socket) {
                        console.log(1);
                        //io.emit('this', { will: 'Criando uma nova sala com o BLING' });
                        //console.log(socket);
                        socket.on(params.token, function(from, msg) { //defino a sala
                            console.log('Recebendo mensagem privada de ', from, ': -> ', msg);
                            // socket.emit('msg', {
                            //     everyone: 'only',
                            //     '/bling': 'socket on'
                            // })
                        });

                        socket.on('disconnect', function() {
                            //io.emit('user disconnected');
                            console.log('usuario desconectado');
                        });

                        socket.emit('msg', {
                            teste: 'in',
                            '/bling': 'socket msg'
                        })
                    });
            }
        });



        for (const key in clients) {
            if (key != params.id) clients[key].emit("/bling/msg", params);
        }
    } else {
        res.status(400).send();
    }

    res.send();
});

// Requisita o bling
app.get("/bling/msg", function(req, res) {
    var params = req.params;
    console.log(req);
    var clients = io.sockets.clients().sockets;

    for (const key in clients) {
        if (key != params.id) clients[key].emit("like", params);
    }

    res.send('teste');
});
// edita requisição no bling
app.put("/bling/notificacoes", function(req, res) {
    var params = req.body;
    var clients = io.sockets.clients().sockets;

    for (const key in clients) {
        if (key != params.id) clients[key].emit("like", params);
    }

    res.send();
});
// deleta dados do bling
app.delete("/bling/notificacoes", function(req, res) {
    var params = req.body;
    var clients = io.sockets.clients().sockets;

    for (const key in clients) {
        if (key != params.id) clients[key].emit("like", params);
    }

    res.send('teste');
});
