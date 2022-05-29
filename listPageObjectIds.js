require('dotenv/config');
const { google } = require('googleapis');
const { promisify } = require('util');

const listPageObjectIds = async function (auth) {
  const slides = google.slides({ version: 'v1', auth });

  let objectIds = []

  const promise = slides.presentations.get({
    presentationId: process.env.PRESENTATION_ID
  }, (err, res) => {
    if (err) {
      console.error("Something went wrong", err);
    } else {
      const slides = res.data.slides;
      objectIds = slides.map(slide => slide.objectId);
    }
  })

  objectIds = await promisify(promise)();

  return objectIds;
}

module.exports = listPageObjectIds;