const http = require('http')

module.exports = (registration_ids) => {
  const postData = JSON.stringify({
    registration_ids : registration_ids
  })

  const options = {
    hostname : 'android.googleapis.com',
    path     : '/gcm/send',
    method   : 'POST',
    headers  : {
      'Content-Type'  : 'application/json',
      'Authorization' : `key=${process.env.API_KEY}`,
      'Content-Length': Buffer.byteLength(postData)
    }
  }

  const request = http.request(options)

  request.on('error', e => {
    throw new Error(`problem with request: ${e.message}`);
  })

  request.write(postData)
  request.end()
}
