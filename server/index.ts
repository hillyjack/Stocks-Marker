import app from './App';
import * as http from 'http';

const appServer = http.createServer(app.expressApp);
const port =  process.env.PORT || 3000;

const io = require('socket.io')(appServer);
app.init(io);

console.log('say something ');

appServer.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log('server is listening f on', port);
});
