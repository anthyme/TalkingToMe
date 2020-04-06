"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Avatar_1 = __importDefault(require("@material-ui/core/Avatar"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var FormControlLabel_1 = __importDefault(require("@material-ui/core/FormControlLabel"));
var Checkbox_1 = __importDefault(require("@material-ui/core/Checkbox"));
var Link_1 = __importDefault(require("@material-ui/core/Link"));
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var Box_1 = __importDefault(require("@material-ui/core/Box"));
var LockOutlined_1 = __importDefault(require("@material-ui/icons/LockOutlined"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var styles_1 = require("@material-ui/core/styles");
var Container_1 = __importDefault(require("@material-ui/core/Container"));
function Copyright() {
    return (<Typography_1.default variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link_1.default color="inherit" href="https://TalkingToMe.com/">
        Your Website
      </Link_1.default>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography_1.default>);
}
var useStyles = styles_1.makeStyles(function (theme) { return ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}); });
function SignIn() {
    var classes = useStyles();
    return (<Container_1.default component="main" maxWidth="xs">
      <CssBaseline_1.default />
      <div className={classes.paper}>
        <Avatar_1.default className={classes.avatar}>
          <LockOutlined_1.default />
        </Avatar_1.default>
        <Typography_1.default component="h1" variant="h5">
          Sign in
        </Typography_1.default>
        <form className={classes.form} noValidate>
          <TextField_1.default variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus/>
          <TextField_1.default variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
          <FormControlLabel_1.default control={<Checkbox_1.default value="remember" color="primary"/>} label="Remember me"/>
          <Button_1.default type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign In
          </Button_1.default>
          <Grid_1.default container>
            <Grid_1.default item xs>
              <Link_1.default href="#" variant="body2">
                Forgot password?
              </Link_1.default>
            </Grid_1.default>
            <Grid_1.default item>
              <Link_1.default href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link_1.default>
            </Grid_1.default>
          </Grid_1.default>
        </form>
      </div>
      <Box_1.default mt={8}>
        <Copyright />
      </Box_1.default>
    </Container_1.default>);
}
exports.default = SignIn;
