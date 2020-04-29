import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useSelector, useDispatch } from 'react-redux'
import { InitialState } from '../store/reducers/MainReducer'
import { RootDispatcher } from '../store/MainDispatcher'
import { useHistory } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { GoogleLogout } from 'react-google-login'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://TalkingToMe.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  slogan: {
    textAlign: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

interface StateProps {
  userIdRdx: string
}

export default function SignIn() {
  const classes = useStyles()
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

  const responseGoogle = async (response: any) => {
    await rootDispatcher.setUserIdRdx(response.googleId)
    console.log(userIdRdx)
    history.push('/Menu')
  }
  const logout = () => {
    console.log('logged out')
  }

  return (
    <Container component="main" maxWidth="xs">
      <GoogleLogout
        clientId="401730606164-p774q8osiptncb4mfl8cgfs2gr6lrs92.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
      ></GoogleLogout>
      <CssBaseline />
      <div className={classes.paper}>
        <h1>Talking To Me</h1>
        <h2 className={classes.slogan}>
          Have a real conversation that matters with your audience
        </h2>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <GoogleLogin
          clientId="401730606164-p774q8osiptncb4mfl8cgfs2gr6lrs92.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          isSignedIn={true}
          cookiePolicy={'single_host_origin'}
        />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}
