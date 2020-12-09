const DEBUG = 1;
if (!DEBUG) console.log = () => {};

const ATTACHMENTS_SELECTOR = `img[draggable=false][src*='twitter']`;
let image = null;

// function classifyImages() {
//   [image, ...document.getElementsByTagName('img')].unique().filter(validImage).forEach(analyzeImage);  
// }

// function validImage(image) {
//   const valid = image.src &&
//         image.width > 64 && image.height > 64 &&
//         !image.dataset.catReplaced;
//   console.log('image %s valid', image.src, valid);
//   return valid;
// }

function waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
    var startTimeInMs = Date.now();
    (function loopSearch() {
      if (document.querySelector(selector) != null) {
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

// const blobToImage = (blob) => {
//     return new Promise(resolve => {
//         const url = URL.createObjectURL(blob);
//         let img = new Image();
//         img.onload = () => {
//         URL.revokeObjectURL(url);
//         resolve(img);
//         }
//         img.src = url;
//     })
//     }



const callback = function analyzeImage() {
    console.log('an image has been uploaded!');
    blob_img = document.querySelector(ATTACHMENTS_SELECTOR);
    //console.log('analyze image %s', image.src);
    //blob = image.src;
    //blobUrl = URL.createObjectURL(blob);
    //console.log('new image url %s', blobUrl);
    chrome.runtime.sendMessage({blob_img: blob_img}, response => {
        console.log('prediction for image %s', blob_img.src, response);
        console.log(image);
        if (response && response.result === true) { // change to just if response?
        //const replacedImageSrc = "https://source.unsplash.com/random/" + image.width + "x" + image.height;
        const predictedCaption = response.result;
        image.alt = predictedCaption;
        console.log(predictedCaption)
    }
  });
}


// document.addEventListener("scroll", (images)=>{ 
//   clearTimeout(isScrolling);
//   isScrolling = setTimeout(()=>{clasifyImages()}, 100);
// });

Array.prototype.unique = function() {
  return this.filter(function (value, index, self) { 
    return self.indexOf(value) === index;
  });
}

waitForElementToDisplay(ATTACHMENTS_SELECTOR,callback,1000,120000);
