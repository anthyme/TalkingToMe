import React from 'react';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { RootDispatcher } from '../store/MainDispatcher';
import { useHistory } from 'react-router-dom';

function Header() {
  const history = useHistory();

  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  const logout = async () => {
    await rootDispatcher.setUserIdRdx('-1');
    history.push('/');
  };

  return (
    <AppBar position="relative">
      <Toolbar>
        <GoogleLogout
          clientId="401730606164-p774q8osiptncb4mfl8cgfs2gr6lrs92.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logout}
        ></GoogleLogout>
        <Typography variant="h6" color="inherit" noWrap>
          Menu TalkingToMe
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
export default Header;
