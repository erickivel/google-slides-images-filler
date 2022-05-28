const fs = require('fs');
const FormData = require('form-data');

require('dotenv/config');
const axios = require('axios');

const imageUpload = async function (imageFilename) {
  const formData = new FormData();
  formData.append('image', fs.createReadStream(`./images/${imageFilename}`));

  const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
    params: {
      expiration: 60,
      key: process.env.IMGBB_API_KEY,
    },
    headers: {
      'content-type': 'multipart/form-data'
    },
  })

  return response.data.data;
}

module.exports = imageUpload;