const fs = require('fs'); //File System - this module grants access to reading and writing data right to the file system
const http = require('http'); // Gives us networking capabilities such as building an http server. 
const url = require('url'); // Module is able to analyze the url.

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

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

    return output;
};

const tempOverview = fs.readFileSync('./starter/templates/template-overview.html', 'utf-8');
const tempCard = fs.readFileSync('./starter/templates/template-card.html', 'utf-8');
const tempProduct = fs.readFileSync('./starter/templates/template-product.html', 'utf-8');

const data = fs.readFileSync('./starter/dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    // Overview Page
    if(pathname === '/overview' || pathname === '/'){
        res.writeHead(200, { "Content-type": 'text/html' });

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        res.end(output);

    // Product Page
    } else if (pathname === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const product = dataObj[query.id]
        const output = replaceTemplate(tempProduct, product);

        res.end(output);
        
    // API
    } else if (pathname === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(data));

    // Not Found Page
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('<h1>Page not found</h1>');
    }
});

// Standard IP address for local-host -> 127.0.0.1
server.listen(8000, '127.0.0.1', () => {
    console.log('server has started on port 8000');
});