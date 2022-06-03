const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

require('dotenv/config');
const axios = require('axios');

const imageUpload = function (imageFilename) {
  const formData = new FormData();

  const filePath = path.join(__dirname, "images", imageFilename);
  formData.append('image', fs.createReadStream(filePath));

  const promise = axios.post('https://api.imgbb.com/1/upload', formData, {
    params: {
      expiration: 60,
      key: process.env.IMGBB_API_KEY,
    },
    headers: {
      'content-type': 'multipart/form-data'
    },
  })

  return promise;
}

module.exports = imageUpload;