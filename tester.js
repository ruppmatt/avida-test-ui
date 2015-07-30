var uiWorker = new Worker('ui-test.js');

function getStats() {
   uiWorker.postMessage('GetPopulationStats');
}

function doPlayPause() {
   uiWorker.postMessage('DoPlayPause');
}

uiWorker.onmessage = function(e){
   var data = e.data;
   console.log(data);
}


