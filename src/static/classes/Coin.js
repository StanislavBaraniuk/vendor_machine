export default class Coin {
  #value;

  constructor(value) {
    this.#value = +value;
  }

  getValue() {
    return this.#value;
  }

  static isCouldBeCoin(value) {
    return value?.toString && /[0-9]/.test(value.toString())
  }
}
