import React, {Component} from 'react';
import ProductsTable from './ProductsTable';
import ProductsEjector from './ProductsEjector';
import CoinsReceiver from './CoinsReceiver';
import CoinsEjector from './CoinsEjector';
import Screen from './Screen';
import Keyboard from './Keyboard';
import classes from './index.module.scss';

import {connect} from 'react-redux';
import {machine as machineActions} from '../../store/actions/machine';
import {user as userActions} from '../../store/actions/user';

import EventBus from '../../static/helpers/eventBus';

class VendorMachine extends Component {
  constructor(props) {
    super(props);
    EventBus.subscribe('keyboard', this.keyboardHandler.bind(this));
    EventBus.subscribe('cancel', this.cancelHandler.bind(this));
  }

  keyboardHandler(v) {
    if (/[0-9]/.test(v)) {
      this.props.toggleKeyboard(v);
    } else if (v.toLowerCase() === 'c') {
      this.props.toggleKeyboard(null);
    } else if (v.toLowerCase() === 'ok') {
      const product = this.props.productsList.getProductByPosition(this.props.keyboardValue);
      if (product) this.props.coins.getSum() - product.getPrice() > 0 && this.animateOrder(product);
    }
  }

  animateOrder(product) {
    let movingStart = null;
    let waitingStart = null;
    let element = product.element.current;
    let insertEl = null;

    const wait = (timestamp) => {
      if (!waitingStart) waitingStart = timestamp;
      let progress = timestamp - waitingStart;
      if (progress < 3000) {
        window.requestAnimationFrame(wait);
      } else {
        document.getElementById('products-ejector').removeChild(insertEl);
      }
    };

    const move = (timestamp) => {
      if (!movingStart) movingStart = timestamp;
      let progress = timestamp - movingStart;
      element.style.transform = 'translateY(' + Math.min(progress / 2, 550) +
          'px)';
      if (progress < 1000) {
        window.requestAnimationFrame(move);
      } else {
        insertEl = element.cloneNode(true);
        insertEl.style.transform = '';
        document.getElementById('products-ejector').appendChild(insertEl);
        window.requestAnimationFrame(wait);
        this.props.order();
      }
    };

    window.requestAnimationFrame(move);
  }

  cancelHandler() {
    this.props.sendCoinsToUser(this.props.coins);
    this.props.returnCoins();
  }

  render() {
    this.props.change && this.props.sendCoinsToUser(this.props.change);
    return (
      <div className={classes.wrapper}>
        <div className={classes.top}>
          <div className={classes.top__left}>
            <ProductsTable items={this.props.productsList} active={this.props.keyboardValue}/>
          </div>
          <div className={classes.top__right}>
            <div className={classes['top__right-screen']}>
              <Screen value={this.props.coins.getSum()}/>
            </div>
            <div className={classes['top__right-coinReceiver']}>
              <CoinsReceiver/>
            </div>
            <div className={classes['top__right-keyboard']}>
              <Keyboard/>
            </div>
            <div className={classes['top__right-coinsEjector']}>
              <CoinsEjector/>
            </div>
            <div className={classes['top__right-empty']}/>
          </div>
        </div>
        <div className={classes.bottom}>
          <ProductsEjector/>
        </div>
        <div className={classes.floor}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.machine
}

const mapDispatchToProps = dispatch => {
  return {
    returnCoins: () => dispatch(machineActions.returnCoins()),
    sendCoinsToUser: (v) => dispatch(userActions.addCoins(v)),
    toggleKeyboard: (v) => dispatch(machineActions.toggleKeyboard(v)),
    order: () => {dispatch(machineActions.order())},
    calculateChange: (v) => dispatch(machineActions.calculateChange(v)),
    resetSelectedProduct: (v) => dispatch(machineActions.resetSelectedProduct(v))
  }
}

const ConnectedVendorMachine = connect(mapStateToProps, mapDispatchToProps)(VendorMachine);
export default ConnectedVendorMachine;
