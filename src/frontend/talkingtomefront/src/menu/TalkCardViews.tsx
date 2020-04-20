import React, {useEffect, useState}from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import TalkPresCard from '../components/TalkPresCard'

interface IProps{
    cards: number[],
    className: string
  }

const TalkCardView: React.FC<IProps> = (props) =>  {
  return (
    <Container className={props.className} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={4}>
        {props.cards && props.cards.map((card: any) => (
          <TalkPresCard card={card} />
        ))}
      </Grid>
    </Container>
  )
}
export default TalkCardView;
