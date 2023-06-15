const PORT = process.env.PORT || 8080;
const app = require('./app');
const db = require('./db');
const ws = require('ws');

const init = async()=> {
 await db.syncAndSeed()
 const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  const socketServer = new ws.Server({ server});
  let sockets = [];
  socketServer.on('connection', (socket)=> {
    sockets.push(socket);
    socket.on('message', (message)=> {
      console.log(message);
      sockets.forEach( s => s.send(message));
    });
  });
}

init();
