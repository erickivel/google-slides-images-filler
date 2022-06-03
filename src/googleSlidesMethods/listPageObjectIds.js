require('dotenv/config');
const { google } = require('googleapis');

const listPageObjectIds = function (auth, callback) {
  const slides = google.slides({ version: 'v1', auth });

  slides.presentations.get({
    presentationId: process.env.PRESENTATION_ID
  }, callback);
}

module.exports = listPageObjectIds;