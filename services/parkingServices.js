const axios = require('axios')
const log = require('./loggingUtility')

const socrataToken = process.env.SOCRATA_TOKEN

function checkByParkingZone(zone) {
  const url = `https://data.calgary.ca/resource/rhkg-vwwp.json?parking_zone=${zone}`
  return axios({
    method: 'GET',
    url: url,
    timeout: 3000,
    headers: {
      'X-App-Token': socrataToken,
    },
  })
    .then((response) => {
      return response
    })
    .catch((error) => {
      //Request was made and server responded with status code != 2xx
      if (error.response) {
        log.error(error.response)
        return error.response
      }
      //Request was made but server did not respond
      else if (error.request) {
        log.error(error.request)
        return error.request
      }
    })
}

module.exports = {
  checkByParkingZone,
}
