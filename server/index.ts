import app from './App';

const http = require('http').Server(app.expressApp);
const port =  process.env.PORT || 3000;

const io = require('socket.io')(http);
app.init(io);

console.log('say something ');

http.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log('server is listening f on', port);
});

