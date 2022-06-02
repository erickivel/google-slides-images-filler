const path = require('path');
const fs = require('fs');

const imageUpload = require("./imageUpload.js");
const addImageToPresentation = require('./googleSlidesMethods/addImageToPresentation.js');
const listPageObjectIds = require('./googleSlidesMethods/listPageObjectIds.js');

const main = async function (auth) {
  const imagesUrls = [];
  const imageFilenames = getImageFilenames()

  const promises = []

  let objectIds = [];
  let currentSlideIndex;

  listPageObjectIds(auth, (err, res) => {
    if (err) {
      console.error("Something went wrong", err);
    } else {
      const slides = res.data.slides;
      objectIds = slides.map(slide => slide.objectId);
      currentSlideIndex = objectIds.findIndex(slide => slide === process.env.FIRST_PAGE_OBJECT_ID)
    }
  });

  console.log("Uploading images...");
  for (const image of imageFilenames) {
    const promise = imageUpload(image);
    promises.push(promise);
  }

  const responses = await Promise.all(promises);

  responses.map(response => imagesUrls.push(response.image.url))

  let iteration = 0;
  let slideIterator = 0;

  console.log("Adding images to the presentation...");
  for (const imageUrl of imagesUrls) {
    const pageObjectId = objectIds[currentSlideIndex + slideIterator];
    addImageToPresentation(auth, imageUrl, pageObjectId, iteration)

    // Get next slide if the slide has already been filled
    if (iteration + 1 == process.env.IMAGES_PER_SLIDE) {
      slideIterator++;
      iteration = 0;
    } else {
      iteration++;
    }
  }
}

function getImageFilenames() {
  const directoryPath = path.join(__dirname, 'images');
  return fs.readdirSync(directoryPath);
}

module.exports = main;