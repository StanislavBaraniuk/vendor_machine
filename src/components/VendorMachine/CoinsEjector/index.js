import classes from './index.module.scss'

export default function CoinEjector() {
  return <div className={classes.wrapper}>
    <div className={classes.ejector}>
      <div className={classes.ejector__inside}/>
    </div>
  </div>;
}
