function waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
  var startTimeInMs = Date.now();
  (function loopSearch() {
    if (document.querySelector(selector) != null) {
      //var uploadedImage = document.querySelector("img[draggable=false][src*='twitter']").getAttribute('src')
      //var blobImage = window.URL.createObjectURL(uploadedImage)
      //console.log(uploadedImage)
      //console.log(blobImage)
      callback();
      return;
    }
    else {
      setTimeout(function () {
        if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
          return;
        loopSearch();
      }, checkFrequencyInMs);
    }
  })();
}

// function selectFile(event) {
//   let blobURL = window.URL.createObjectURL(event.target.files[0])
// }

// async function load() {
//     const model = await tf.loadLayersModel('flickr_model_js/model.json');
//     return model;
//   };

// async function loadImage(src) {
// return new Promise(resolve => {
//     var img = document.createElement('img');
//     img.crossOrigin = "anonymous";
//     img.onerror = function(e) {
//     resolve(null);
//     };
//     img.onload = function(e) {
//     if ((img.height && img.height > 128) || (img.width && img.width > 128)) {
//         // Set image size for tf!
//         img.width = IMAGE_SIZE;
//         img.height = IMAGE_SIZE;
//         resolve(img);
//     }
//     // Let's skip all tiny images
//     resolve(null);
//     }
//     img.src = src;
// });



// function predict(model) {
//     // code to connect to the <input> given value will go here (just not yet)
//     const inputTensor = tf.tensor([parseInt(userInput)]);  // then convert to tensor



waitForElementToDisplay("img[draggable=false][src*='twitter']",function(){alert('looks like youre uploading an image!');},1000,120000);
