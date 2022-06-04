require('dotenv/config');
const { google } = require('googleapis');

// 1 mm = 36000 EMU
const cm = 36000 * 10;

const IMAGES_PER_SLIDE = process.env.IMAGES_PER_SLIDE;
const ROWS = process.env.ROWS;
const COLUMN_GAP = process.env.COLUMN_GAP * cm;
const ROW_GAP = process.env.ROW_GAP * cm;

const marginTop = 0 * cm;

// Size that you want to be occupied: 30 x 15 cm
const slideAvailableWidth = process.env.WIDTH_TO_BE_OCCUPIED * cm;

const imagesPerRow = Number(IMAGES_PER_SLIDE) / Number(ROWS);

// Google slides full size with powerpoint format: 33.87 x 19.05 cm 
// Google slides full size by default: 25.4 x 14.3cm
const fullSlideWidth = 25.4 * cm;
const fullSlideHeight = 14.3 * cm;

// width/height image ratio
const ratio = 0.562922869;

const individualImageWidth = (slideAvailableWidth - (COLUMN_GAP * imagesPerRow)) / imagesPerRow
const individualImageHeight = individualImageWidth / ratio;

const width = {
  magnitude: individualImageWidth,
  unit: 'EMU',
};

const height = {
  magnitude: individualImageHeight,
  unit: 'EMU',
};

let currentRow = 0;

const addImageToPresentation = function (auth, imageUrl, pageObjectId, iteration) {
  const slides = google.slides({ version: 'v1', auth });

  // Break Row
  if ((currentRow + iteration !== 0) && (iteration % imagesPerRow === 0)) {
    currentRow++;
  }
  let actualIteration = iteration >= imagesPerRow ? iteration % imagesPerRow : iteration;

  // Center width and height
  let translateY;
  if (ROWS > 1) {
    translateY = ((fullSlideHeight - ((individualImageHeight + ROW_GAP) * ROWS)) / 2) + (currentRow * (individualImageHeight + ROW_GAP)) + marginTop;
  } else {
    translateY = ((fullSlideHeight - individualImageHeight) / 2) + (currentRow * (individualImageHeight + ROW_GAP));
  }
  const translateX = ((fullSlideWidth - slideAvailableWidth) / 2) + (actualIteration * (individualImageWidth + COLUMN_GAP));

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
          translateX,
          translateY,
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

  if (iteration + 1 == IMAGES_PER_SLIDE) {
    currentRow = 0;
  }
}

module.exports = addImageToPresentation;
