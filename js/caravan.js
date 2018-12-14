class Caravan {
  constructor(stats) {
    this.day = stats.day;
    this.distance = stats.distance;
    this.crew = stats.crew;
    this.food = stats.food;
    this.oxen = stats.oxen;
    this.money = stats.money;
    this.firepower = stats.firepower;

    Caravan.constants = {
      WEIGHT_PER_OX: 20,
      WEIGHT_PER_PERSON: 2,
      FOOD_WEIGHT: 0.6,
      FIREPOWER_WEIGHT: 5,
      GAME_SPEED: 800,
      DAY_PER_STEP: 0.2,
      FOOD_PER_PERSON: 0.02,
      FULL_SPEED: 5,
      SLOW_SPEED: 3,
      FINAL_DISTANCE: 1000,
      EVENT_PROBABILITY: 0.15,
      ENEMY_FIREPOWER_AVG: 5,
      ENEMY_GOLD_AVG: 50,
    };
  }

  // update weight and capacity
  updateWeight() {
    let droppedFood = 0;
    let droppedGuns = 0;

    // how much can the caravan carry
    this.capacity = this.oxen * Caravan.constants.WEIGHT_PER_OX
      + this.crew * Caravan.constants.WEIGHT_PER_PERSON;

    // how much weight do we currently have
    this.weight = this.food * Caravan.constants.FOOD_WEIGHT
      + this.firepower * Caravan.constants.FIREPOWER_WEIGHT;

    // drop things behind if it's too much weight
    // assume guns get dropped before food
    while (this.firepower && this.capacity <= this.weight) {
      this.firepower -= 1;
      this.weight -= Caravan.constants.FIREPOWER_WEIGHT;
      droppedGuns += 1;
    }

    if (droppedGuns) {
      this.ui.notify(`Left ${droppedGuns} guns behind`, 'negative');
    }

    while (this.food && this.capacity <= this.weight) {
      this.food -= 1;
      this.weight -= Caravan.constants.FOOD_WEIGHT;
      droppedFood += 1;
    }

    if (droppedFood) {
      this.ui.notify(`Left ${droppedFood} food provisions behind`, 'negative');
    }
  }

  // update covered distance
  updateDistance() {
    const diff = this.capacity - this.weight;
    const speed = Caravan.constants.SLOW_SPEED
      + diff / this.capacity * Caravan.constants.FULL_SPEED;
    this.distance += speed;
  }

  // food consumption
  consumeFood() {
    this.food -= this.crew * Caravan.constants.FOOD_PER_PERSON;

    if (this.food < 0) {
      this.food = 0;
    }
  }
}
