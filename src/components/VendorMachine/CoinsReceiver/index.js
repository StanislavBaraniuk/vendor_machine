import classes from './index.module.scss'

import EventBus from '../../../static/helpers/eventBus';

export default function CoinsReceiver() {
  return <div className={classes.wrapper}>
    <div className={classes.cash}/>
    <div className={classes.coins}/>
    <button
        type='button'
        className={classes.cancel}
        onClick={() => EventBus.publish('cancel')}>
      <p className={classes.cancel__text}>C</p>
    </button>
  </div>;
}
