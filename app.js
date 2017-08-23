const http = require('http');
const url = require('url');
const fs = require('fs');
const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');
const checkStatus = require('./checkStatus.js');

const pageTemplate = fs.readFileSync(
  './client/index.html',
  { encoding: 'utf8' },
);

const serve = serveStatic('./client');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/') {
    checkStatus().then((washing) => {
      const bodyClass = washing ? 'active' : 'inactive';
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(pageTemplate.replace('{{ bodyClass }}', bodyClass));
    });
  } else {
    const done = finalhandler(req, res);
    serve(req, res, done);
  }
});

server.listen(process.env.PORT);
