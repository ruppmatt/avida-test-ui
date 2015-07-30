var update = 0;
var paused = true;

var update_timer = null;

function doUpdate(){
   doGetPopulationStats();
   update = update + 1;
}

function doGetPopulationStats(req){
   var result  = pop_stats[update];
   result.success = true;
   result.request = req;
   result.Key='PopulationStats';
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
         var result = { 'Key':'RunPause', 'success':true, 'requested':msg };
         postMessage(result);
         break;
      case 'Reset':
         if (update_timer){
            clearInterval(update_timer);
         }
         update = 0;
         paused = true;
         var result = { 'Key':'Reset', 'success':true, 'requested':msg };
         postMessage(result);
         break;
      default:
         var result = { 
            'Key':'UnknownRequest', 
            'success':false, 
            'requested':msg 
         };
         postMessage(result);
         break;
   }
}



