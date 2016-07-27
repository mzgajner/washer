var http = require('http')
var url = require('url')
var finalhandler = require('finalhandler')
var serveStatic = require('serve-static')
var sendNotification = require('./sendNotification')

var serve = serveStatic('./client')
var registrationIds = []

var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true)

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
    var done = finalhandler(req, res)
    serve(req, res, done)
  }
})
server.listen(8000)
