const path = require('path');
const fs = require('fs');

const imageUpload = require("./imageUpload.js");
const addImageToPresentation = require('./googleSlidesMethods/addImageToPresentation.js');

const main = async function (auth) {
  console.time("without promise all");

  const imagesUrls = [];
  const imageFilenames = getImageFilenames();

  for (const image of imageFilenames) {
    const response = await imageUpload(image);
    imagesUrls.push(response.image.url);
  }

  console.log(imagesUrls);

  let iteration = 0;

  for (const imageUrl of imagesUrls) {
    addImageToPresentation(auth, imageUrl, iteration)
    iteration++;
  }

  console.timeEnd("without promise all");
}

function getImageFilenames() {
  const directoryPath = path.join(__dirname, 'images');
  return fs.readdirSync(directoryPath);
}

main();

module.exports = main;