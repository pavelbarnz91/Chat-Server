const path = require('path');
const http = require('http');
const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors');
const { koaBody } = require('koa-body');
const router = require('./routes/index.js');
const WS = require('ws');
const {v4: uuidv4,} = require('uuid');
const actualDialog = require('./dataBase/actualDialog.js');
const users = require('./dataBase/users.js');
const port = process.env.PORT || 9090;

app.use(cors());

app.use(koaBody({
    json: true,
    multipart: true,
    urlencoded: true,
    formidable: true,
}));

app.use(router());

const server = http.createServer(app.callback()).listen(9090);
const wsServer = new WS.Server({server});

wsServer.on('connection', (ws) => {
    let userID = uuidv4();
    console.log('user connect: ' + userID);

    users[
        users.length > 0 ? users.length - 1 : users.length
    ].id = userID;

    const sendData = {
        actualDialog,
        users
    };

    Array.from(wsServer.clients)
    .filter(client => client.readyState === WS.OPEN)
    .forEach(client => client.send(JSON.stringify(sendData)));
    
    console.log('connection: ', users);

    ws.on('close', function () {
        users.forEach((item, index) => {
            if(item.id === userID) users.splice(index, 1);
        })

        Array.from(wsServer.clients)
        .filter(client => client.readyState === WS.OPEN)
        .forEach(client => client.send(JSON.stringify(sendData)))
    })

    ws.on('message', message => {
        if(JSON.parse(message.toString()).del !== undefined) {
            users.forEach((item, index) => {
                if(item.userName === JSON.parse(message.toString()).del.userName) {
                    users.splice(index, 1);
                };
            })

            Array.from(wsServer.clients)
            .filter(client => client.readyState === WS.OPEN)
            .forEach(client => client.send(JSON.stringify(sendData)));
        } else {
            actualDialog.push(JSON.parse(message.toString()));

            Array.from(wsServer.clients)
            .filter(client => client.readyState === WS.OPEN)
            .forEach(client => client.send(message.toString()));
        }
    })
})