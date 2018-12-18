class UI {
  constructor(caravan, game) {
    this.caravan = caravan;
    this.game = game;
  }

  notify(message, type) {
    document.getElementById('updates-area').innerHTML = `<div class="update-${type}">Day ${Math.ceil(this.caravan.day)}: ${message}</div>${document.getElementById('updates-area').innerHTML}`;
  }

  refresh() {
    document.getElementById('stat-day').innerHTML = Math.ceil(this.caravan.day);
    document.getElementById('stat-distance').innerHTML = Math.floor(this.caravan.distance);
    document.getElementById('stat-crew').innerHTML = this.caravan.crew;
    document.getElementById('stat-oxen').innerHTML = this.caravan.oxen;
    document.getElementById('stat-food').innerHTML = Math.ceil(this.caravan.food);
    document.getElementById('stat-money').innerHTML = this.caravan.money;
    document.getElementById('stat-firepower').innerHTML = this.caravan.firepower;
    document.getElementById('stat-weight').innerHTML = `${Math.ceil(this.caravan.weight)}/${this.caravan.capacity}`;

    // update caravan position
    document.getElementById('caravan').style.left = `${380 * this.caravan.distance / Caravan.constants.FINAL_DISTANCE}px`;
  }

  showAttack(firepower, gold) {
    const attackDiv = document.getElementById('attack');
    attackDiv.classList.remove('hidden');

    // keep properties
    this.firepower = firepower;
    this.gold = gold;

    // show firepower
    document.getElementById('attack-description').innerHTML = `Firepower: ${firepower}`;

    // init once
    if (!this.attackInitiated) {
      // fight
      document.getElementById('fight').addEventListener('click', this.fight.bind(this));

      // run away
      document.getElementById('runaway').addEventListener('click', this.runaway.bind(this));

      this.attackInitiated = true;
    }
  }

  fight() {
    const damage = Math.ceil(
      Math.max(0, this.firepower * 2 * Math.random() - this.caravan.firepower),
    );

    // check there are survivors
    if (damage < this.caravan.crew) {
      this.caravan.crew -= damage;
      this.caravan.money += this.gold;
      this.notify(`${damage} people were killed fighting`, 'negative');
      this.notify(`Found $${this.gold}`, 'gold');
    } else {
      this.caravan.crew = 0;
      this.notify('Everybody died in the fight', 'negative');
    }

    // resume journey
    document.getElementById('attack').classList.add('hidden');
    this.game.resume();
  }

  runaway() {
    const damage = Math.ceil(Math.max(0, this.firepower * Math.random() / 2));

    // check there are survivors
    if (damage < this.caravan.crew) {
      this.caravan.crew -= damage;
      this.notify(`${damage} people were killed running`, 'negative');
    } else {
      this.caravan.crew = 0;
      this.notify('Everybody died running away', 'negative');
    }

    // // remove event listener
    // document.getElementById('runaway').removeEventListener('click', this.runaway.bind(this));

    // resume journey
    document.getElementById('attack').classList.add('hidden');
    this.game.resume();
  }

  showShop(products) {
    // get shop area
    const shopDiv = document.getElementById('shop');
    shopDiv.classList.remove('hidden');

    // init the shop just once
    if (!this.shopInitiated) {
      // event delegation
      shopDiv.addEventListener('click', (e) => {
        // what was clicked
        const target = e.target || e.src;

        // exit button
        if (target.tagName === 'BUTTON') {
          // resume journey
          shopDiv.classList.add('hidden');
          this.game.resume();
        } else if (target.tagName === 'DIV' && target.className.match(/product/)) {
          this.buyProduct({
            item: target.getAttribute('data-item'),
            qty: target.getAttribute('data-qty'),
            price: target.getAttribute('data-price'),
          });
        }
      });

      this.shopInitiated = true;
    }

    // clear existing content
    const prodsDiv = document.getElementById('prods');
    prodsDiv.innerHTML = '';

    // show products
    let product;
    for (let i = 0; i < products.length; i += 1) {
      product = products[i];
      prodsDiv.innerHTML += `<div class="product" data-qty="${product.qty}" data-item="${product.item}" data-price="${product.price}">${product.qty} ${product.item} - $${product.price}</div>`;
    }
  }

  buyProduct(product) {
    // check we can afford it
    if (product.price > this.caravan.money) {
      this.notify('Not enough money', 'negative');
      return false;
    }

    this.caravan.money -= product.price;

    this.caravan[product.item] += +product.qty;

    this.notify(`Bought ${product.qty} x ${product.item}`, 'positive');

    // update weight
    this.caravan.updateWeight();

    // update visualgas
    this.refresh();

    return true;
  }
}
