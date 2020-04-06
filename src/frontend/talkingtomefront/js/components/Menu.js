"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var AppBar_1 = __importDefault(require("@material-ui/core/AppBar"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var PhotoCamera_1 = __importDefault(require("@material-ui/icons/PhotoCamera"));
var CssBaseline_1 = __importDefault(require("@material-ui/core/CssBaseline"));
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var Toolbar_1 = __importDefault(require("@material-ui/core/Toolbar"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var styles_1 = require("@material-ui/core/styles");
var Container_1 = __importDefault(require("@material-ui/core/Container"));
var Link_1 = __importDefault(require("@material-ui/core/Link"));
var TalkPresCard_1 = __importDefault(require("./TalkPresCard"));
var PopUp_1 = __importDefault(require("../popUps/PopUp"));
function Copyright() {
    return (<Typography_1.default variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link_1.default color="inherit" href="https://material-ui.com/">
        Your Website
      </Link_1.default>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography_1.default>);
}
var useStyles = styles_1.makeStyles(function (theme) { return ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%',
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}); });
var cards = [1, 2];
function Menu() {
    var classes = useStyles();
    return (<react_1.default.Fragment>
      <CssBaseline_1.default />
      <AppBar_1.default position="relative">
        <Toolbar_1.default>
          <PhotoCamera_1.default className={classes.icon}/>
          <Typography_1.default variant="h6" color="inherit" noWrap>
            Album layout
          </Typography_1.default>
        </Toolbar_1.default>
      </AppBar_1.default>
      <main>
        
        <div className={classes.heroContent}>
          <Container_1.default maxWidth="sm">
            <Typography_1.default component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Home
            </Typography_1.default>
            <Typography_1.default variant="h5" align="center" color="textSecondary" paragraph>
              Welcome on the home page, here you will be able to see and manage
              your talks.
            </Typography_1.default>
            <div className={classes.heroButtons}>
              <Grid_1.default container spacing={2} justify="center">
                <Grid_1.default item>
                  <PopUp_1.default />
                </Grid_1.default>
                <Grid_1.default item>
                  <Button_1.default variant="outlined" color="primary">
                    Create new Quizz
                  </Button_1.default>
                </Grid_1.default>
              </Grid_1.default>
            </div>
          </Container_1.default>
        </div>
        <Container_1.default className={classes.cardGrid} maxWidth="md">
          
          <Grid_1.default container spacing={4}>
            {cards.map(function (card) { return (<TalkPresCard_1.default card={card}/>); })}
          </Grid_1.default>
        </Container_1.default>
      </main>
      
      <footer className={classes.footer}>
        <Typography_1.default variant="h6" align="center" gutterBottom>
          Footer
        </Typography_1.default>
        <Typography_1.default variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography_1.default>
        <Copyright />
      </footer>
      
    </react_1.default.Fragment>);
}
exports.default = Menu;
