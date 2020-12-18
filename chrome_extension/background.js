//import 'babel-polyfill';
//import * as tf from '@tensorflow/tfjs';

const IMAGE_SIZE = 299;
//const CAT_THRESHOLD = 0.9;

const MODEL_URL = chrome.extension.getURL('tensorflow/tensorflowjs_model.pb');
//const WEIGHTS_URL = chrome.extension.getURL('tensorflow/weights_manifest.json');

//model = tf.loadLayersModel('flickr_model_js/model.json');


tf.loadLayersModel('caption_model_js/model.json').then(model => {
//   async function loadImage(url) {
//     const image = new Image(IMAGE_SIZE, IMAGE_SIZE);
//     return new Promise((resolve, reject) => {
//       image.onload = () => resolve(image);
//       image.onerror = (err) => reject(err);
//       image.src = url;
//     });
//   }

  async function executeModel(url) {
    const image = await loadImage(blob_img);

    // input pixels must be floats in (0,1) range instead of integers (0,255)
    console.log(image)
    const tensor = tf.browser.fromPixels(image).resize(1,299,299,3);

    // MobileNet V1: model.predict(tensor)
    // MobileNet V2: model.predict({ Placeholder: tensor })
    const prediction = model.predict(tensor);

    const output = prediction.dataSync(); // [cat_probability, nocat_probability]
    console.log('Prediction for %s', blob_img, output);

    return output;
  }

  chrome.runtime.onMessage.addListener((request, sender, callback) => {
    executeModel(request.blob_img)
      .then(result => callback({result: result[0] > CAT_THRESHOLD}))
      .catch(err => callback({result: false, err: err.message}));

    return true; // needed to make the content script wait for the async processing to complete
  });
});


