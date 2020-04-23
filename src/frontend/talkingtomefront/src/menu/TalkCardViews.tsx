import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import PresCard from '../components/PresCard';

interface IProps {
  cards: number[];
  className: string;
}

const TalkCardView: React.FC<IProps> = (props) => {
  return (
    <Container className={props.className} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={4} className="talkPanel">
        {props.cards &&
          props.cards.map((card: any, index: number) => (
            <PresCard card={card} type="Talk" key={index} />
          ))}
      </Grid>
    </Container>
  );
};
export default TalkCardView;
