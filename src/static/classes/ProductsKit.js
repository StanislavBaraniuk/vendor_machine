import Product from './Product';

export default class ProductsKit {
  #kit;

  constructor(products = null) {
    this.#kit = [];
    this.addProducts(products);
  }

  addProduct(object) {
    if (Product.isCouldBeProduct(object)) this.#kit.push(new Product(object))
  }

  getProducts() {
    return this.#kit;
  }

  addProducts(products) {
    if (Array.isArray(products))
      products.map(product => product instanceof Product && this.#kit.push(product));
    else if (products instanceof ProductsKit)
      this.#kit.concat(products.getProducts());

    return this.#kit;
  }

  getProductByPosition(position) {
    const filtered = this.#kit.filter(product => product.getPosition() === +position);
    return filtered.length > 0 ? filtered[0] : null;
  }

  removeProduct(product) {
    product.qty--;
  }
}
