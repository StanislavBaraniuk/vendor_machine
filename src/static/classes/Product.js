export default class Product {
  #name;
  #price;
  #position;
  #icon;

  constructor({name = null, price = null, position = null, qty = 0, icon = '', element = null}) {
    this.#name = name;
    this.#price = price;
    this.#position = position;
    this.qty = qty;
    this.element = element;
    this.#icon = icon
  }

  getName() {
    return this.#name;
  }

  getPrice() {
    return this.#price;
  }

  getPosition() {
    return this.#position;
  }

  getIcon() {
    return this.#icon;
  }

  static isCouldBeProduct(value) {
    return typeof value === 'object'
  }
}
