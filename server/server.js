const express = require('express');
const socketio = require('socket.io');
const http = require('http')
const cors = require('cors');
require('dotenv').config();


const app = express();
const router = require('./Routes/routes');


// Socket.io
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/', router)


const { db } = require('./Database/admin');
const doc = db.collection(process.env.DYNAMIC).doc('ict');

io.on('connection', socket => {
    // testing
    socket.on('ict', () => {
        doc.onSnapshot(snap => {
            io.emit('query', snap.data());
        })
    })

    socket.on('view', path => {
        db.collection(process.env.DYNAMIC).doc(path).onSnapshot(snap => {
            const data = snap.data();
            const inParking = data.carIn - data.carOut
            io.emit(`query_${path}`, { ...data, ...{ inParking }, ...{ available: data.total - inParking } })
        })
    })
        .on('dense', () => {
            db.collection(process.env.DYNAMIC).onSnapshot(snap => {
                let res = {};
                snap.docs.map(doc => res[doc.data().path] = doc.data())

                io.emit('dense', Object.keys(res).map(e => ({ path: res[e].path, carIn: res[e].carIn, carOut: res[e].carOut, total: res[e].total })));
            })
        })

})


// Normal Server
app.listen(5000, () => console.log('server run on :', 5000));


// Socket.io Server
server.listen(5050, () => console.log('server run on:', 5050));


