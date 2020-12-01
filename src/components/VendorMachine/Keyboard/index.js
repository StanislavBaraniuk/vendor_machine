import {Component} from 'react';
import classes from './index.module.scss';

import EventBus from '../../../static/helpers/eventBus';

class Keyboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboard: ['1','2','3','4','5','6','7','8','9','C','0','OK']
    }
  }

  static toggleKeyboard(value) {
    EventBus.publish('keyboard', value)
  }

  render() {
    const keyboardKeys = this.state.keyboard.map(
        key =>
            <button
                key={key} type='button'
                className={classes.keyboard__key}
                onClick={() => Keyboard.toggleKeyboard(key)}
            >
              <p className={classes['keyboard__key-text']}>{key}</p>
            </button>);
    return (
        <div className={classes.wrapper}>
          <div className={classes.keyboard}>
            {keyboardKeys}
          </div>
        </div>
    )
  }
}

export default Keyboard;
