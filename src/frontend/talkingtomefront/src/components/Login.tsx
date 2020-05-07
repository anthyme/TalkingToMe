import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch } from 'react-redux';
import { RootDispatcher } from '../store/MainDispatcher';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { createGoogleJson } from '../dataTransfers/jsonCreators/CreateJson';
import { checkUser } from '../dataTransfers/Posts/DataUserPost';
import CustomSnackBar from './materialUI/CustomSnackBar';

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
  );
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
}));

export default function SignIn() {
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  const responseGoogle = async (response: any) => {
    const googleJson = createGoogleJson(response);
    const userId: string = await checkUser(googleJson, response.tokenId);
    await rootDispatcher.setUserIdRdx(userId);
    await rootDispatcher.setTokenIdRdx(response.tokenId);
    console.log(response.tokenId);
    if (userId !== '-1') {
      setSnackBarMessage('');
      history.push('/Menu');
    } else {
      setSnackBarMessage(
        'We are sorry we seem to have encountered an error, please try again or, if the error persists, come back later',
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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
          clientId="326711242697-pj0ob8eu4autok3fs93vnnt0juace2d2.apps.googleusercontent.com"
          buttonText="Log in"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          isSignedIn={true}
          cookiePolicy={'single_host_origin'}
        />
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      {snackBarMessage && (
        <CustomSnackBar message={snackBarMessage} variant="error" />
      )}
    </Container>
  );
}
