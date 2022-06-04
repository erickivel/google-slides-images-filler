<p align="center">
  <video controls="true" allowfullscreen="true" width="100%" src="https://user-images.githubusercontent.com/68995946/172023655-424c9a80-6ca8-42ac-b74c-9dafd32c04f0.mp4"></video>
</p>

<p align="center">
  <a href="#question-about">About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-getting-started">Getting Started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#gear-technologies">Technologies</a>
</p>

## :question: About

This project automatically adds whatever images you want to your Google Slides presentation in a customizable way!

---

## :rocket: Getting Started
  
  1. Clone this repo: `git clone https://github.com/erickivel/google-slides-images-filler.git`
  2. Move to the directory: `cd google-slides-images-filler`
  3. Run `npm install` or `yarn` to install the dependencies.
  4. Create an account on Imgbb: <a href="https://imgbb.com/signup">here</a> and get your API key <a href="https://api.imgbb.com/">here</a>, Imgbb is a hosting service that will store the images temporarily (60 seconds) and provide the public image URL that will be useful to add the images in the google slides presentation.
  5. Create your Google OAuth client credentials (<a href="https://developers.google.com/workspace/guides/create-credentials#oauth-client-id">instructions here</a>, in "Authorized redirect URIs" you can put "http://localhost:3333")
  6. Rename the file `.credentials.example.json` to `.credentials.json`, and put the `client_secret` and `client_id` that you get from the last step.
  7. Create a folder on the `src` folder with the name: `images`, this is where you'll put your images.
  8. Rename the file `.env.example` to `.env` and change the variables: </br>
    - `IMGBB_API_KEY` : to the API key that you get from step 3. </br>
    - `PRESENTATION_ID`: you get it from the presentation URL: `https://docs.google.com/presentation/d/`PRESENTATION_ID`/edit`.
    </br>
    - `FIRST_PAGE_OBJECT_ID`: this is the id of the first slide you want to add the images, you can select the desired slide, and get it from the presentation URL: "`https://docs.google.com/presentation/d/presentationId/edit#slide=id.`FIRST_PAGE_OBJECT_ID".
    </br>
    - `IMAGES_PER_SLIDE`: this is the number of images per slide you want to add, it must be a multiple of `ROWS`
    </br>
    - `ROWS`: this is the number of the row that the images will be divided in each slide 
    </br>
    - `WIDTH_TO_BE_OCCUPIED`: This is how much all your images will occupy in each slide in centimeters (width)
    </br>
    - `COLUMN_GAP` and `ROW_GAP`: Column and row gaps (in centimeters)
  9. You can also modify some options on the file `addImageToPresentation.js`.
  10. Run `npm run start` or `yarn start` to start the project, if it's the first time you're running, you'll need to authenticate: It will appear a link, open it, choose the same google account you used to be the tester of your API (step 5), then you'll be redirected to `http://localhost:3333/?code=`CODE`&scope=...` copy the code and paste it in the terminal. After that, a file named `token.json` will be added to the root of the project so that you don't need to repeat this authentication process, and the images will be added to your presentation! </br>

Notes: </br>
  - If the code starts with `4/` you'll need to remove the `decodeURIComponent()` function, but maintain the `code` param, from the line 58 in the file `index.js`;</br>
  - If `No refresh token is set` error happens jut delete the `token.json` and run the code again (it'll asks you to authenticate again);

## :gear: Technologies

**These are the technologies that I used to develop this application:**

:gear: <strong>NodeJS</strong> —> A platform for building network applications;</br>
:globe_with_meridians: <strong>Axios</strong> —> Used to do HTTP requests;</br>
:wrench: <strong>Dotenv</strong> —> Load environmental variables;</br>
:bar_chart: <strong>Googleapis</strong> —> Used to access google slides api methods;</br>
:framed_picture: <strong>form-data</strong> —> Used to upload images;</br>
