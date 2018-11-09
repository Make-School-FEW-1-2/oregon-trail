var OregonH = OregonH || {};

OregonH.UI = {};

//show a notification in the message area
OregonH.UI.notify = function(message, type){
  console.log(message + ' - ' + type);
};


//refresh visual caravan stats
OregonH.UI.refreshStats = function() {
  console.log(this.caravan);
}
