import {
  ADD_COINS,
  CALCULATE_CHANGE,
  ORDER,
  RESET_SELECTED_PRODUCT,
  RETURN_COINS_TO_USER,
  TOGGLE_KEYBOARD
} from "../constants/machine";

export const machine = {
  addCoins: (payload = null) => {
    return {type: ADD_COINS, payload}
  },
  calculateChange: (payload = null) => {
    return {type: CALCULATE_CHANGE, payload}
  },
  order: (payload = null) => {
    return {type: ORDER, payload}
  },
  resetSelectedProduct: (payload = null) => {
    return {type: RESET_SELECTED_PRODUCT, payload}
  },
  returnCoins: (payload = null) => {
    return {type: RETURN_COINS_TO_USER, payload}
  },
  toggleKeyboard: (payload = null) => {
    return {type: TOGGLE_KEYBOARD, payload}
  },
};
