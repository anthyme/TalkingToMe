import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import CameraIcon from '@material-ui/icons/PhotoCamera'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import { GoogleLogout } from 'react-google-login'
import { InitialState } from '../store/reducers/MainReducer'
import { useSelector, useDispatch } from 'react-redux'
import { RootDispatcher } from '../store/MainDispatcher'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
      },
}))


interface StateProps {
  userIdRdx: string
}

function Header() {
  const history = useHistory()
  const { userIdRdx } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        userIdRdx: state.userIdRdx,
      }
    },
  )
  const dispatch = useDispatch()
  const rootDispatcher = new RootDispatcher(dispatch)
  const classes = useStyles()

  const logout = async () => {
    await rootDispatcher.setUserIdRdx("-1")
    console.log(userIdRdx)
    history.push('/')
    console.log('logged out')
  }
  
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
export default Header
