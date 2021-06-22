import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '50px',
      display: 'flex',
      justifyContent: 'center',
    },
  }),
);

const Loader: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  )
}

export default Loader
