import React from 'react';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { RootDispatcher } from '../store/MainDispatcher';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

function Header() {
  const history = useHistory();

  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  const logout = async () => {
    await rootDispatcher.setUserIdRdx('-1');
    history.push('/');
  };

  const useStyles = makeStyles(() => ({
    headerFlex: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }));

  const classes = useStyles();

  return (
    <AppBar position="relative">
      <Toolbar className={classes.headerFlex}>
        <Typography variant="h6" color="inherit" noWrap>
          Menu TalkingToMe
        </Typography>
        <GoogleLogout
          clientId="401730606164-p774q8osiptncb4mfl8cgfs2gr6lrs92.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logout}
        ></GoogleLogout>
      </Toolbar>
    </AppBar>
  );
}
export default Header;
