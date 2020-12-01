import classes from './index.module.scss'

export default function Screen(props) {
  return <div className={classes.wrapper}>
    <p className={classes.text}>{props.value}</p>
  </div>;
}
