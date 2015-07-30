var update = 0;

var update_timer = setInterval(doUpdate, 500);

function doUpdate(){
   update = update + 1;
}

function doGetPopulationStats(){
   var cur_stats = pop_stats[update];
   cur_stats.key="PopulationStatistics";
   postMessage(cur_stats);
}


onmessage = function(e) {
   var msg = e.data;
   switch(msg){
      case "GetPopulationStats":
         doGetPopulationStats();
         break;
   }
}



