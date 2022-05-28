const path = require('path');
const fs = require('fs');

const imageUpload = require("./imageUpload.js");
const addImageToPresentation = require('./addImageToPresentation.js');
const listPageObjectIds = require('./listPageObjectIds.js');

const main = async function (auth) {
  const imagesUrls = [];
  const imageFilenames = getImageFilenames()

  const promises = []

  for (const image of imageFilenames) {
    const promise = imageUpload(image);
    promises.push(promise);
  }

  const responses = await Promise.all(promises);

  responses.map(response => imagesUrls.push(response.image.url))

  let iteration = 0;

  const objectsIds = listPageObjectIds(auth);
  console.log(objectsIds);

  for (const imageUrl of imagesUrls) {
    // TODO get next slide

    const firstPageObjectId = process.env.FIRST_PAGE_OBJECT_ID;

    addImageToPresentation(auth, imageUrl, firstPageObjectId, iteration)
    iteration++;
  }
}

function getImageFilenames() {
  const directoryPath = path.join(__dirname, 'images');
  return fs.readdirSync(directoryPath);
}

module.exports = main;