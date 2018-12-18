class Game {
  constructor() {
    this.caravan = new Caravan({
      day: 1,
      distance: 0,
      crew: 30,
      food: 80,
      oxen: 2,
      money: 300,
      firepower: 2,
    });
    this.ui = new UI(this.caravan, this);
    this.event = new Event(this, this.ui, this.caravan);
    this.startJourney();
  }

  startJourney() {
    this.gameActive = true;
    this.previousTime = null;
    this.ui.notify('A great adventure begins', 'positive');

    this.step();
  }

  step(timestamp) {
    // starting, setup the previous time for the first time
    if (!this.previousTime) {
      this.previousTime = timestamp;
      this.updateGame();
    }

    // time difference
    const progress = timestamp - this.previousTime;

    // game update
    if (progress >= Caravan.constants.GAME_SPEED) {
      this.previousTime = timestamp;
      this.updateGame();
    }

    // we use "bind" so that we can refer to the context "this" inside of the step method
    if (this.gameActive) window.requestAnimationFrame(this.step.bind(this));
  }

  updateGame() {
    // day update
    this.caravan.day += Caravan.constants.DAY_PER_STEP;

    // food consumption
    this.caravan.consumeFood();

    // game over no food
    if (this.caravan.food === '0') {
      this.ui.notify('Your caravan starved to death', 'negative');
      this.gameActive = false;
      return;
    }

    // update weight
    this.caravan.updateWeight();

    // update progress
    this.caravan.updateDistance();

    // show stats
    this.ui.refresh();

    // check if everyone died
    if (this.caravan.crew <= '0') {
      this.caravan.crew = 0;
      this.ui.notify('Everyone died', 'negative');
      this.gameActive = false;
      return;
    }

    // check win game
    if (this.caravan.distance >= Caravan.constants.FINAL_DISTANCE) {
      this.ui.notify('You have returned home!', 'positive');
      this.gameActive = false;
    }

    if (Math.random() <= Caravan.constants.EVENT_PROBABILITY) {
      this.event.generateEvent();
    }
  }

  pause() {
    this.gameActive = false;
  }

  resume() {
    this.gameActive = true;
    this.step();
  }
}
