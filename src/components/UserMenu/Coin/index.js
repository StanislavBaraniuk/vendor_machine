import classes from './index.module.scss'
import EventBus from '../../../static/helpers/eventBus';

export default function Coin(props) {
  return <li className={classes.coin}>
    <button
        type='button'
        className={classes.coin__button}
        onClick={() => EventBus.publish(props.callback, props.coin)}
    >
      <p className={classes.coin__text}>{props.coin.getValue()}</p>
    </button>
  </li>;
}
