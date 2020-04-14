import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import CameraIcon from '@material-ui/icons/PhotoCamera'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import EditTalkPopUp from '../popUps/popUpCards/EditTalkPopUp'

const useStyles = makeStyles(theme => ({
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

interface IProps {
  card :any
}

// TODO -Change Image and Add onclickModifier
const TalkPresCard: React.FC<IProps> = (props) => {
  //const classes = useStyles()
  const card = props.card;
  return (
    <Grid item key={card.id} xs={12} sm={6} md={4}>
      <Card>
        <CardMedia
          image="https://source.unsplash.com/random"
          title="Image title"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {card.name}
          </Typography>
          <Typography>{card.description}</Typography>
        </CardContent>
        <CardActions>
        <EditTalkPopUp talk={card}/>
          <Button size="small" color="primary">
            start
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
export default TalkPresCard
