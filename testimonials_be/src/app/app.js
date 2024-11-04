import express from 'express';
import fs from 'fs';
import { router } from './routes.js';;
import cors from 'cors';
import https from 'https';

const app = express();

var privateKey = fs.readFileSync('./root.key');
var certificate = fs.readFileSync('./root.crt');
var credentials = {key: privateKey, cert: certificate};

app.use(express.json({ limit: '50mb' }));
app.use(cors({
  origin: 'http://localhost:5173',
}))
app.use(router)

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// const httpsServer = https.createServer(credentials, app);

// Start server
app.listen(3000, () => {
  console.log('HTTP Server running on port 3000');
});
