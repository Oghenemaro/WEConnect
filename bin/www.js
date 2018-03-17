import app from '../app';
import http from 'http';


const port = parseInt(process.env.port, 10) || 7000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log("Application running at port 7000"));