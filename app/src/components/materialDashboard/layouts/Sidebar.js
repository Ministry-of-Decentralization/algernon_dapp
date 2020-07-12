import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import SidebarNav from '../components/SidebarNav';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, selectedAddress, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      shouldRender: (address) => !!address,
      title: 'Account',
      getHref: (address) => `/profile/${address}`,
      icon: <AccountBoxIcon />
    },
    {
      title: 'Courses',
      icon: <ShoppingBasketIcon />,
      shouldRender: () => true,
      getHref: () => '/topics',
    },
    {
      title: 'Tags',
      icon: <DashboardIcon />,
      shouldRender: () => true,
      getHref: () => '/tags',
    },
    {
      title: 'Users',
      icon: <PeopleIcon />,
      shouldRender: () => true,
      getHref: () => '/users',
    }
  ];

  const links = [
    /*
    {
      shouldRender: (address) => !address,
      comp: ButtonLink,
      props: {
        onClick: () => null
      }
    },
    */
    {
      shouldRender: (address) => !!address,
      url: (address) => `/profile/${address}`,
      label: 'My Profile'
    },
    {
      shouldRender: () => true,
      url: () => '/topics',
      label: 'All Courses'
    },
    {
      shouldRender: () => true,
      url: () => '/tags',
      label: 'Tags'
    },
    {
      shouldRender: () => true,
      url: () => '/users',
      label: 'Users'
    }
  ]

  const showPages = pages.filter(page => page.shouldRender(selectedAddress))
    .map(page => ({
      ...page,
      href: page.getHref(selectedAddress)
    }))

  return (

      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <SidebarNav
          className={classes.nav}
          pages={showPages}
        />
      </div>

  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  selectedAddress: PropTypes.string
};

export default Sidebar;
