var OregonH = OregonH || {};

OregonH.UI = {};

// show a notification in the message area
OregonH.UI.notify = function notify(message, type) {
  console.log(`${message} - ${type}`);
};


// refresh visual caravan stats
OregonH.UI.refreshStats = function refreshStats() {
  console.log(this.caravan);
};
