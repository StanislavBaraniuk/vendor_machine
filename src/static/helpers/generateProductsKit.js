import ProductsKit from '../classes/ProductsKit'
import {products as allowedProducts} from '../products'

export default function generate() {
  const kit = new ProductsKit();
  for (let i = 1; i <= 25; i++) {
    const product = allowedProducts[Math.round(Math.random() * 2)];
    kit.addProduct({
      ...product,
      position: i,
      qty: 3
    })
  }
  return kit;
}
