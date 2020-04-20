import React, {useEffect, useState}from 'react'
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
import TalkPresCard from '../components/TalkPresCard'
import {getTalks} from "../dataTransfers/DataTalkFetch"
import CreateTalkPopUp from '../popUps/popUpCards/CreateTalkPopUp'
import CreateQuizzPopUp from '../popUps/popUpCards/CreateQuizzPopUp'

interface IProps{
    cards: number[],
    className: string
  }

const QuizzCardView: React.FC<IProps> = (props) =>  {
  return (
    <Container className={props.className} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={4}>
        {props.cards && props.cards.map((card: any) => (
          <TalkPresCard card={card}/>
        ))}
      </Grid>
    </Container>
  )
}
export default QuizzCardView;