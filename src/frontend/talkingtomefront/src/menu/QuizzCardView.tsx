import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import PresCard from '../components/PresCard';

interface IProps {
  cards: number[];
  className: string;
}

const QuizzCardView: React.FC<IProps> = (props) => {
  return (
    <Container className={props.className} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={4} className="quizzPanel">
        {props.cards &&
          props.cards.map((card: any) => <PresCard card={card} type="Quizz" />)}
      </Grid>
    </Container>
  );
};
export default QuizzCardView;
