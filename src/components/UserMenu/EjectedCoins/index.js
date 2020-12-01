import React from 'react';
import Coin from '../Coin';
import classes from './index.module.scss'

export default function EjectedCoins(props) {
  return <ul className={classes.wrapper}>
    {props.items.map((coin, index) => <Coin key={index} callback='' coin={coin}/>)}
  </ul>;
}
