const http = require('http')
const url = require('url')
const finalhandler = require('finalhandler')
const serveStatic = require('serve-static')
const sendNotification = require('./sendNotification')

const serve = serveStatic('./client')
const registrationIds = []

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true)

  if (parsedUrl.pathname === '/api/send') {
    sendNotification(registrationIds)
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('notification sent')
  }
  else if (parsedUrl.pathname === '/api/register') {
    if (registrationIds.indexOf(parsedUrl.query.id) === -1) {
      registrationIds.push(parsedUrl.query.id)
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('id registered')
    console.log('registered', registrationIds)
  }
  else {
    const done = finalhandler(req, res)
    serve(req, res, done)
  }
})
server.listen(process.env.PORT)
