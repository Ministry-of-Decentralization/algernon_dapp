import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import Flex from '../../atoms/Flex'
import ConnectedWallet from '../../organisms/ConnectedWallet';
import mouseLogo from './mouse.svg'

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  headerName: {
    fontSize: '1.8em'
  },
  headerTagline: {
    marginLeft: '1em'
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();


  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
          <RouterLink to="/">
            <img
              alt="Logo"
              src={mouseLogo}
              style={{height: '2em', width: '2em', margin: '0.4em'}}
            />
          </RouterLink>
          <Flex>
            <div className={classes.headerName} style={{width: '4em'}}>Algernon</div>
            <div className={classes.headerTagline} style={{width: '9em'}}>The Open Blockchain School</div>
          </Flex>
          <div style={{marginLeft: 'auto', order: 2}}>
            <ConnectedWallet />
          </div>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
