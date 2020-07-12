import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography as MuiTypography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  }
}));

const Typography = ({variant, children}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          sm={9}
          xs={12}
        >
          <MuiTypography variant={variant}>{children}</MuiTypography>
        </Grid>

      </Grid>
    </div>
  );
};

export default Typography;
