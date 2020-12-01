import React, {Component} from 'react';
import classes from './index.module.scss'
import productBombaIMG from '../../../assets/images/product-bomba.png';
import productMarsIMG from '../../../assets/images/product-mars.png';
import productSnickersIMG from '../../../assets/images/product-snickers.png';

class ProductsTable extends Component {
  constructor(props) {
    super(props);
    this.isActive = this.isActive.bind(this);
  }

  isActive(index) {
    if (this.props?.active?.length === 0) return false;
    return index === Number(this.props.active)
  }

  static getProductImage(product) {
    switch(product.getIcon()) {
      case 'product-bomba': {
        return productBombaIMG
      }
      case 'product-mars': {
        return productMarsIMG
      }
      case 'product-snickers': {
        return productSnickersIMG
      }
    }
  }

  render() {
    const table = [];
    let itemIndex = 0;

    const products = this.props?.items.getProducts();
    for (let i = 0; i < 5; i++) {
      const row = [];
      for (let j = 0; j < 5; j++) {
        const product = products?.length > itemIndex ? products[itemIndex] : null;
        if (product === null) continue;
        const position = product?.getPosition();
        const productsIcons = (() => {
          const images = [];
          for (let i = 0; i < product.qty; i++) {
            const ref = React.createRef();
            images.push(<img className={classes['table__cell-image']} key={i} src={ProductsTable.getProductImage(product)} alt={product.getName()} ref={ref}/>);
            product.element = ref;
          }
          return images
        })();
        row.push(<td className={classes.table__cell}  key={row.length}>
          {productsIcons}
          <div className={classes.table__position + ' ' + (this.isActive(position) ? classes.active: '')}>
            <p className={classes['table__position-text']}>
              {position}
            </p>
          </div>
        </td>);
        itemIndex++;
      }
      table.push(<tr className={classes.table__row} key={table.length}>{row}</tr>)
    }

    return (
        <div className={classes.wrapper}>
          <table className={classes.table}>
            <tbody className={classes.table__body}>
              {table}
            </tbody>
          </table>
        </div>
    )
  }
}

export default ProductsTable;
