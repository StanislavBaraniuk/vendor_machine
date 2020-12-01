import classes from './index.module.scss'

export default function ProductsEjector() {
  return <div id='products-ejector' className={classes.wrapper}>
    <div className={classes.ejector}>
      <div className={classes.ejector__inside}/>
    </div>
  </div>;
}
