import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Typography,
  Divider
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {flex: '0 45%'},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const ImageCard = props => {
  const { className, item, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.imageContainer}>
          {item.icon}
        </div>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {item.title}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {item.description}
        </Typography>
      </CardContent>
      <Divider />
    </Card>
  );
};

ImageCard.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object.isRequired
};

export default ImageCard;