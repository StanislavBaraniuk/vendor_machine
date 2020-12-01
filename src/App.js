import React from 'react'
import './components/VendorMachine'
import VendorMachine from './components/VendorMachine'
import UserMenu from './components/UserMenu'
import classes from './App.module.scss'

function App() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.machine}>
        <VendorMachine/>
      </div>
      <div className={classes.user}>
        <UserMenu/>
      </div>
    </div>
  );
}

export default App;
