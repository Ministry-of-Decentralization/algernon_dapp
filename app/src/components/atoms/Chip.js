import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';


const styles = theme => ({
  chip: {
    margin: theme.spacing.unit,
  },
});


function Item({ classes, label }) {
  return (
    <Chip label={label} className={classes.chip} color='default'/>
  )
}

Item.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Item)