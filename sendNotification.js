var http = require('http')

module.exports = function (registration_ids) {
  var postData = JSON.stringify({
    registration_ids : registration_ids
  })

  var options = {
    hostname : 'android.googleapis.com',
    path     : '/gcm/send',
    method   : 'POST',
    headers  : {
      'Content-Type'  : 'application/json',
      'Authorization' : `key=${process.env.API_KEY}`,
      'Content-Length': Buffer.byteLength(postData)
    }
  }

  var request = http.request(options)

  request.on('error', (e) => {
    console.log(`problem with request: ${e.message}`)
  })

  request.write(postData)
  request.end()
}
