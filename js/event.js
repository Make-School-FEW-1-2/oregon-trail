var OregonH = OregonH || {};

OregonH.Event = {};

OregonH.Event.eventTypes = [{
  type: 'STAT-CHANGE',
  notification: 'negative',
  stat: 'crew',
  value: -3,
  text: 'Food intoxication. Casualties: ',
},
{
  type: 'STAT-CHANGE',
  notification: 'negative',
  stat: 'crew',
  value: -4,
  text: 'Flu outbreak. Casualties: ',
},
{
  type: 'STAT-CHANGE',
  notification: 'negative',
  stat: 'food',
  value: -10,
  text: 'Worm infestation. Food lost: ',
},
{
  type: 'STAT-CHANGE',
  notification: 'negative',
  stat: 'money',
  value: -50,
  text: 'Pick pockets steal $',
},
{
  type: 'STAT-CHANGE',
  notification: 'negative',
  stat: 'oxen',
  value: -1,
  text: 'Ox flu outbreak. Casualties: ',
},
{
  type: 'STAT-CHANGE',
  notification: 'positive',
  stat: 'food',
  value: 20,
  text: 'Found wild berries. Food added: ',
},
{
  type: 'STAT-CHANGE',
  notification: 'positive',
  stat: 'food',
  value: 20,
  text: 'Found wild berries. Food added: ',
},
{
  type: 'STAT-CHANGE',
  notification: 'positive',
  stat: 'oxen',
  value: 1,
  text: 'Found wild oxen. New oxen: ',
},
];

OregonH.Event.generateEvent = function genEvent() {
  const eventIndex = Math.floor(Math.random() * this.eventTypes.length);
  const eventData = this.eventTypes[eventIndex];

  // events that consist in updating a stat
  if (eventData.type === 'STAT-CHANGE') {
    this.stateChangeEvent(eventData);
  }
};

OregonH.Event.stateChangeEvent = function stateChangeEvent(eventData) {
  // can't have negative quantities
  if (eventData.value + this.caravan[eventData.stat] >= 0) {
    this.caravan[eventData.stat] += eventData.value;
    this.ui.notify(eventData.text + Math.abs(eventData.value), eventData.notification);
  }
};
