import http from 'http';
import app from '../app';


const port = parseInt(process.env.port, 10) || 7001;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('Application running at port 7001'));
