import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { getTalks } from '../dataTransfers/Fetchs/DataTalkFetch';
import { getQuizzes } from '../dataTransfers/Fetchs/DataQuizzFetch';
import CreateTalkPopUp from '../popUps/popUpCards/CreateTalkPopUp';
import CreateQuizzPopUp from '../popUps/popUpCards/CreateQuizzPopUp';
import TalkCardViews from '../menu/TalkCardViews';
import QuizzCardViews from '../menu/QuizzCardView';
import Footer from '../static/Footer';
import Header from '../static/Header';
import WelcomeMsg from '../static/WelcomeMsg';
import { green } from '@material-ui/core/colors';
import { Tabs, Tab, Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { InitialState } from '../store/reducers/MainReducer';


function TabPanel(props: any) {
  const { children, value, index } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
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
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: 'relative',
    minHeight: 200,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
}));

interface StateProps {
  userIdRdx: string;
  changeRequestRdx: number;
}

//TODO - CHANGE THIS TO CONNECTED USER ID
function Menu() {
  const [cards, setCards] = useState([]);
  const [quizzCards, setQuizzCards] = useState([]);
  const [chosenTab, setChosenTab] = useState(0);
  const [indexTab, setIndexTab] = useState(0);

  const classes = useStyles();
  const theme = useTheme();

  const { userIdRdx, changeRequestRdx } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        userIdRdx: state.userIdRdx,
        changeRequestRdx: state.changeRequestRdx,
      };
    },
  );

  function a11yProps(index: number) {
    return {
      id: `action-tab-${index}`,
      'aria-controls': `action-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    let userId = userIdRdx.toString();
    getTalks(userId).then((json) => {
      console.log("talkcards json:");
      console.log(json);
      setCards(json);
    });
    getQuizzes(userId).then((json) => {
      console.log("Quizzcards json:");
      console.log(json);
      setQuizzCards(json);
    });
  }, [changeRequestRdx]);

  const handleChange = (event: any, newValue: any) => {
    setChosenTab(newValue);
  };
  const handleChangeIndex = (index: number) => {
    setIndexTab(index);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <WelcomeMsg />
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <CreateTalkPopUp quizzes={quizzCards} />
                </Grid>
                <Grid item>
                  <CreateQuizzPopUp />
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <AppBar position="static" color="default">
          <Tabs
            value={chosenTab}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab label="Talks" {...a11yProps(0)} />
            <Tab label="Quizzes" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={chosenTab}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={chosenTab} index={0}>
            <TalkCardViews className={classes.cardGrid} cards={cards} />
          </TabPanel>
          <TabPanel value={chosenTab} index={1}>
            <QuizzCardViews className={classes.cardGrid} cards={quizzCards} />
          </TabPanel>
        </SwipeableViews>
      </main>
      <Footer />
    </React.Fragment>
  );
}
export default Menu;
