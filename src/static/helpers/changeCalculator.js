import {allowedCoins} from '../coins';
import CoinsKit from '../classes/CoinsKit';

export default function calculate(change) {
  let changeMap = {};

  const sortedAllowedCoins = allowedCoins?.sort(function(a, b) {
    return b - a;
  });

  sortedAllowedCoins?.forEach(value => {
    changeMap[value] = Math.trunc(change / value);
    change -= value * changeMap[value];
  });

  const changeKit = new CoinsKit();

  Object.keys(changeMap).forEach((key) => {
    for (let i = 0; i < changeMap[key]; i++) {
      changeKit.addCoin(key)
    }
  });

  return changeKit;
}
