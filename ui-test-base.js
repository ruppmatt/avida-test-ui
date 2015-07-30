var update = 0;
var paused = true;

function doUpdate(){
   update = update + 1;
   doGetPopulationStats();
}

function doGetPopulationStats(req){
   var result  = pop_stats[update];
   result.success = true;
   result.request = req;
   postMessage(result);
}


onmessage = function(e) {
   var msg = e.data;
   switch(msg.Key){
      case 'RunPause':
         if (paused){
            update_timer = setInterval(doUpdate, 500);
            paused = false;
         } else {
            if (update_timer){
               clearInterval(update_timer);
            } 
            paused = true;
         }
         var result = { 'success':true, 'requested':msg };
         postMessage(result);
         break;
      case 'Reset':
         if (update_timer){
            clearInterval(update_timer);
         }
         update = 0;
         paused = true;
         var result = { 'success':true, 'requested':msg };
         postMessage(result);
         break;
      default:
         var result = { 'success':false, 'requested':msg };
         postMessage(result);
         break;
   }
}



