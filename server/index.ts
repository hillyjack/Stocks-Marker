import app from './App';
import * as Http from 'http';

const http = Http.Server(app.expressApp);
const port =  3000;

console.log('say something ');

http.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  return console.log('server is listening f on', port);
});

