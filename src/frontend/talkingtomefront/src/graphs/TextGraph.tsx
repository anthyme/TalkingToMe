import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Paper, List } from '@material-ui/core';
import AnswerText from './AnswerText';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface IProps {
  results: any;
  quest: string;
}

const TextGraph: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const results = props.results;
  const quest = props.quest;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.quest}
        </Typography>
        <Paper style={{ maxHeight: 250, overflow: 'auto' }}>
          <List>
            {results.map((answer: any, index: number) => {
              return (
                <AnswerText key={index} answer={answer} question={quest} />
              );
            })}
          </List>
        </Paper>
      </CardContent>
    </Card>
  );
};
export default TextGraph;
