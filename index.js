const fs = require('fs'); //File System - this module grants access to reading and writing data right to the file system
const http = require('http'); // Gives us networking capabilities such as building an http server. 

//////////////////////////////////////////
// FILES

//Blocking, synchronous way
// const textIn = fs.readFileSync('./starter/txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./starter/txt/outPut.txt', textOut);
// console.log('File Written');

//Non-Blocking, Asynchronous way
// fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data) => {
//     console.log(data);
// });
// console.log('will read file');

//////////////////////////////////////////
// SERVER

const server = http.createServer((req, res) => {
    res.end('Hello from the server!');
});

// Standard IP address for local-host -> 127.0.0.1
server.listen(8000, '127.0.0.1', () => {
    console.log('server has started on port 8000');
});