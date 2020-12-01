import {ADD_COINS,REMOVE_COINS} from '../constants/user';

import CoinsKit from '../../static/classes/CoinsKit'
import Coin from '../../static/classes/Coin'

const initialState = {
  coins: new CoinsKit([new Coin(50), new Coin(100), new Coin(200), new Coin(50), new Coin(100), new Coin(200),new Coin(50), new Coin(100), new Coin(200)])
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case ADD_COINS: {
      const coins = new CoinsKit(state.coins.addCoins(action.payload));
      return {
        ...state,
        coins
      };
    }
    case REMOVE_COINS: {
      const removed = state.coins.removeCoins(action.payload);
      return {
        ...state,
        coins: removed ? new CoinsKit(state.coins) : state.coins
      };
    }
    default: {
      return state;
    }
  }
};
