import React from 'react'
import EjectedCoins from './EjectedCoins'
import UserCoins from './UserCoins'
import classes from './index.module.scss'

import { machine as machineActions } from '../../store/actions/machine'
import { user as userActions } from '../../store/actions/user'
import { userCoins } from '../../static/coins'

import EventBus from '../../static/helpers/eventBus';
import {connect} from 'react-redux';

class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    EventBus.subscribe('sendCoinToMachine', this.sendCoinToMachineHandler.bind(this));
  }

  sendCoinToMachineHandler(coin) {
    this.props.addCoin(coin);
    this.props.removeCoin(coin);
    this.props.removeCoinFromUser(coin);
  }

  render() {
    return (
        <div className={classes.wrapper}>
          <div className={classes.user}>
            <UserCoins items={this.props.coins.getCoins().filter(coin => userCoins.indexOf(coin.getValue()) !== -1)}/>
          </div>
          <div className={classes.ejected}>
            <EjectedCoins items={this.props.coins.getCoins().filter(coin => userCoins.indexOf(coin.getValue()) === -1)}/>
          </div>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return state.user
}

const mapDispatchToProps = dispatch => {
  return {
    addCoin: (v) => dispatch(machineActions.addCoins(v)),
    removeCoin: (v) => dispatch(userActions.removeCoins(v)),
    removeCoinFromUser: (v) => dispatch(userActions.removeCoins(v)),
  }
}

const ConnectedUserMenu = connect(mapStateToProps, mapDispatchToProps)(UserMenu);
export default ConnectedUserMenu;

