import React, { useEffect, useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import CameraIcon from '@material-ui/icons/PhotoCamera'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import { getTalks } from '../dataTransfers/DataTalkFetch'
import CreateTalkPopUp from '../popUps/popUpCards/CreateTalkPopUp'
import CreateQuizzPopUp from '../popUps/popUpCards/CreateQuizzPopUp'
import TalkCardViews from '../menu/TalkCardViews'
import QuizzCardViews from '../menu/QuizzCardView'
import Footer from '../static/Footer'
import Header from '../static/Header'
import WelcomeMsg from '../static/WelcomeMsg'

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
}))

function renderTab(value : string, classes : string, cards :any){
  switch(value){
    case "Quizzes":
      return (
        <QuizzCardViews className={classes} cards={cards} />
      );
    case "Talks":
      return (
        <TalkCardViews className={classes} cards={cards} />
      );
}
}
//TODO - CHANGE THIS TO CONNECTED USER ID
function Menu() {
  const [cards, setCards] = useState([])
  const [quizzCards, setQuizzCards] = useState([])
  const [talkCards, setTalkCards] = useState([])
  const [chosenTab, setChosenTab] = useState("Talks")
  const classes = useStyles()
  useEffect(() => {
    getTalks(1).then((json) => {
      setCards(json)
    })
  }, [])
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
                  <CreateTalkPopUp />
                </Grid>
                <Grid item>
                  <CreateQuizzPopUp />
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        {renderTab(chosenTab, classes.cardGrid, cards)}
        <TalkCardViews className={classes.cardGrid} cards={cards} />
      </main>
      <Footer />
    </React.Fragment>
  )
}
export default Menu;
