require('dotenv/config');
const { google } = require('googleapis');

const listPageObjectIds = function (auth) {
  const slides = google.slides({ version: 'v1', auth });

  let objectIds = []

  slides.presentations.get({
    presentationId: process.env.PRESENTATION_ID
  }, (err, res) => {
    if (err) {
      console.error("Something went wrong", err);
    } else {
      const slides = res.data.slides;
      objectIds = slides.map(slide => slide.objectId);
    }
  })

  return objectIds;
}

module.exports = listPageObjectIds;