import Coin from './Coin'

export default class CoinsKit {
  #kit;

  constructor(coins = null) {
    this.#kit = [];
    this.addCoins(coins);
  }

  getCoins() {
    return this.#kit.map(item => item)
  }

  addCoin(value) {
    if (Coin.isCouldBeCoin(value)) this.#kit.push(new Coin(value))
  }

  addCoins(coins) {
    if (Array.isArray(coins))
      coins.map(coin => coin instanceof Coin && this.#kit.push(coin));
    else if (coins instanceof CoinsKit)
      this.#kit = [...this.#kit, ...coins.getCoins()];
    else if (coins instanceof Coin) {
      this.#kit.push(coins)
    }

    return this
  }

  removeCoins(coins) {
    let checkedCoins = null;

    if (coins instanceof CoinsKit) {
      checkedCoins = coins.getCoins();
    } else if (Array.isArray(coins)) {
      checkedCoins = coins.filter(coin => coin instanceof Coin);
    } else if (coins instanceof Coin) {
      checkedCoins = [coins]
    }

    if (checkedCoins !== null) {
      for (let i = 0; i < checkedCoins.length; i++) {
        for (let j = 0; j < this.#kit.length; j++) {
          if (checkedCoins[i] === this.#kit[j]) {
            this.#kit.splice(j,1);
            return true
          }
        }
      }
    }
  }

  getSum() {
    return this.#kit.reduce((sum, coin) => sum + coin.getValue(), 0)
  }
}
