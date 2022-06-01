require('dotenv/config');
const { google } = require('googleapis');

// 1 mm = 36000 EMU
const cm = 36000 * 10;

const IMAGES_PER_SLIDE = process.env.IMAGES_PER_SLIDE;
const LINES = process.env.LINES;
const COLUMN_GAP = 0.3 * cm;
const LINE_GAP = 0.4 * cm;

const imagesPerLine = Number(IMAGES_PER_SLIDE) / Number(LINES);

// Google slides full size: 33.87 x 19.05 cm

// Google slides available size: 30 x 15 cm
const slideAvailableWidth = 24 * cm;

// width/height image ratio
const ratio = 0.562922869;

const actualWidth = (slideAvailableWidth - (COLUMN_GAP * imagesPerLine)) / imagesPerLine
const actualHeight = actualWidth / ratio;

const width = {
  magnitude: actualWidth,
  unit: 'EMU',
};

const height = {
  magnitude: actualHeight,
  unit: 'EMU',
};



let currentLine = 0;

const addImageToPresentation = function (auth, imageUrl, pageObjectId, iteration) {
  const slides = google.slides({ version: 'v1', auth });


  if ((currentLine + iteration !== 0) && (iteration % imagesPerLine === 0)) {
    currentLine++;
  }

  // console.log(imagesPerLine);
  // console.log("current line", currentLine);
  // console.log("iteration", iteration);

  // Break Line
  let actualIteration = iteration >= imagesPerLine ? iteration % imagesPerLine : iteration;

  // Center width and height
  let translateY;
  if (LINES > 1) {
    translateY = (((19.05 * cm) - ((actualHeight + LINE_GAP) * LINES)) / 2) + (currentLine * (actualHeight + LINE_GAP)) + 1.2 * cm;
  } else {
    translateY = (((19.05 * cm) - actualHeight) / 2) + (currentLine * (actualHeight + LINE_GAP));
  }
  const translateX = ((33.87 * cm - slideAvailableWidth) / 2) + (actualIteration * (actualWidth + COLUMN_GAP));


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
    currentLine = 0;
  }
}

module.exports = addImageToPresentation;
