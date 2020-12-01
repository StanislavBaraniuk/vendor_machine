import React from 'react';
import classes from './index.module.scss'
import Coin from '../Coin';

export default function UserCoins(props) {
  return <ul className={classes.wrapper}>
    {props.items.map((coin, index) => <Coin key={index} callback='sendCoinToMachine' coin={coin}/>)}
  </ul>;
}
