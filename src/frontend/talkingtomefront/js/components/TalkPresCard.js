"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Button_1 = __importDefault(require("@material-ui/core/Button"));
var Card_1 = __importDefault(require("@material-ui/core/Card"));
var CardActions_1 = __importDefault(require("@material-ui/core/CardActions"));
var CardContent_1 = __importDefault(require("@material-ui/core/CardContent"));
var CardMedia_1 = __importDefault(require("@material-ui/core/CardMedia"));
var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
var Typography_1 = __importDefault(require("@material-ui/core/Typography"));
var styles_1 = require("@material-ui/core/styles");
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
// TODO -Change Image and Add onclickModifier
function TalkPresCard(card) {
    var classes = useStyles();
    return (<Grid_1.default item key={card} xs={12} sm={6} md={4}>
      <Card_1.default className={classes.card}>
        <CardMedia_1.default className={classes.cardMedia} image="https://source.unsplash.com/random" title="Image title"/>
        <CardContent_1.default className={classes.cardContent}>
          <Typography_1.default gutterBottom variant="h5" component="h2">
            Talk Name
          </Typography_1.default>
          <Typography_1.default>Description of the talk.</Typography_1.default>
        </CardContent_1.default>
        <CardActions_1.default>
          <Button_1.default size="small" color="primary">
            Edit
          </Button_1.default>
          <Button_1.default size="small" color="primary">
            start
          </Button_1.default>
        </CardActions_1.default>
      </Card_1.default>
    </Grid_1.default>);
}
exports.default = TalkPresCard;
