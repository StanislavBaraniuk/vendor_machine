import {
  ADD_COINS,
  CALCULATE_CHANGE,
  ORDER,
  RESET_SELECTED_PRODUCT,
  RETURN_COINS_TO_USER,
  TOGGLE_KEYBOARD
} from "../constants/machine";

import Product from '../../static/classes/Product'
import CoinsKit from '../../static/classes/CoinsKit'
import changeCalculator from '../../static/helpers/changeCalculator'
import generateProductsKit from '../../static/helpers/generateProductsKit'

const initialState = {
  productsList: generateProductsKit(),
  coins: new CoinsKit(),
  productOrdered: null,
  keyboardValue: '',
  change: null
};

export default function machine(state = initialState, action) {
  switch (action.type) {
    case ADD_COINS: {
      const newCoins = new CoinsKit(state.coins.addCoins(action.payload));
      return {
        ...state,
        coins: newCoins,
        change: null
      };
    }
    case CALCULATE_CHANGE: {
      const isProduct = action.payload instanceof Product;
      return {
        ...state,
        change: isProduct ? changeCalculator(state.coins.getSum() - state.productOrdered.getPrice()) : null
      };
    }
    case ORDER: {
      const product = state.productsList.getProductByPosition(state.keyboardValue);
      if (!product) return {...state};
      const change = state.coins.getSum() - product.getPrice();
      if (change < 0) return {...state};
      state.productsList.removeProduct(product);
      return {
        ...state,
        productOrdered: product,
        change: product ? changeCalculator(change) : null,
        keyboardValue: '',
        coins: new CoinsKit()
      };
    }
    case RESET_SELECTED_PRODUCT: {
      return {
        ...state,
        productOrdered: null,
        change: null,
        keyboardValue: ''
      };
    }
    case RETURN_COINS_TO_USER: {
      return {
        ...state,
        coins: new CoinsKit(),
        change: null,
        keyboardValue: '',
        productOrdered: null
      };
    }
    case TOGGLE_KEYBOARD: {
      let keyboardValue = typeof action.payload === 'string' ? `${state.keyboardValue}${action.payload}` : state.keyboardValue;
      if (action.payload === null) {
        keyboardValue = ''
      }
      return {
        ...state,
        keyboardValue,
        change: null
      };
    }
    default: {
      return state;
    }
  }
};
