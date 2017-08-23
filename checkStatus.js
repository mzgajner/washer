const request = require('request');

const DEVICE_ID = '50ff6b065067545637100387';
const PARTICLE_URL = `https://api.particle.io/v1/devices/${DEVICE_ID}/washing?access_token=${process.env.ACCESS_TOKEN}`;

module.exports = () =>
  new Promise((resolve, reject) =>
    request(PARTICLE_URL, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body.washing === 1);
      }
    }),
  );
