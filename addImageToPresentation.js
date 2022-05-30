require('dotenv/config');
const { google } = require('googleapis');

// 1 mm = 36000 EMU
const cm = 36000 * 10;

const IMAGES_PER_SLIDE = process.env.IMAGES_PER_SLIDE;
const GAP = 0.3 * cm;

// Google slides available size: 30 x 15 cm
const slideAvailableWidth = 30 * cm;

// width/height image ratio
const ratio = 0.562922869;

const actualWidth = (slideAvailableWidth - (GAP * IMAGES_PER_SLIDE)) / IMAGES_PER_SLIDE
const actualHeight = actualWidth / ratio;

const width = {
  magnitude: actualWidth,
  unit: 'EMU',
};

const height = {
  magnitude: actualHeight,
  unit: 'EMU',
};

const addImageToPresentation = function (auth, imageUrl, pageObjectId, iteration) {
  const slides = google.slides({ version: 'v1', auth });
  console.log(pageObjectId);

  const requests = [{
    createImage: {
      url: imageUrl,
      elementProperties: {
        pageObjectId,
        size: {
          height,
          width,
        },
        transform: {
          scaleX: 1,
          scaleY: 1,
          translateX: (1.93 * cm) + (iteration * (width.magnitude + (GAP))),
          translateY: (4 * cm),
          unit: 'emu',
        },
      },
    },
  }];

  slides.presentations.batchUpdate({
    presentationId: process.env.PRESENTATION_ID,
    requestBody: {
      requests,
    }
  }, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Created image with ID: ${res.data.replies[0].createImage.objectId}`);
    }
  })
}

module.exports = addImageToPresentation;