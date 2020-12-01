import { ADD_COINS, REMOVE_COINS } from "../constants/user";

export const user = {
  addCoins: (payload = null) => {
    return {type: ADD_COINS, payload}
  },
  removeCoins: (payload = null) => {
    return {type: REMOVE_COINS, payload}
  }
};
