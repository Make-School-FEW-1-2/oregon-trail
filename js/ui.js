var OregonH = OregonH || {};

OregonH.UI = {};

// show a notification in the message area
OregonH.UI.notify = function notify(message, type) {
  document.getElementById('updates-area').innerHTML = `<div class="update-${type}">Day ${Math.ceil(this.caravan.day)}: ${message}</div>${document.getElementById('updates-area').innerHTML}`;
};

// refresh visual caravan stats
OregonH.UI.refreshStats = function refresh() {
  document.getElementById('stat-day').innerHTML = Math.ceil(this.caravan.day);
  document.getElementById('stat-distance').innerHTML = Math.floor(this.caravan.distance);
  document.getElementById('stat-crew').innerHTML = this.caravan.crew;
  document.getElementById('stat-oxen').innerHTML = this.caravan.oxen;
  document.getElementById('stat-food').innerHTML = Math.ceil(this.caravan.food);
  document.getElementById('stat-money').innerHTML = this.caravan.money;
  document.getElementById('stat-firepower').innerHTML = this.caravan.firepower;
  document.getElementById('stat-weight').innerHTML = `${Math.ceil(this.caravan.weight)}/${this.caravan.capacity}`;

  // update caravan position
  document.getElementById('caravan').style.left = `${380 * this.caravan.distance / OregonH.FINAL_DISTANCE}px`;
};
