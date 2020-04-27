import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import EditTalkPopUp from '../popUps/popUpCards/EditTalkPopUp';
import { Tooltip, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PopupDelete from '../editQuizz/PopupDelete';
import EditQuizzPopUp from '../popUps/popUpCards/EditQuizzPopUp';

const useStyles = makeStyles((theme) => ({
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
}));

interface IProps {
  card: any;
  type: string;
}

// TODO -Change Image and Add onclickModifier
const PresCard: React.FC<IProps> = (props) => {
  const card = props.card;
  const type = props.type;
  const history = useHistory();

  const goToTalk = () => {
    history.push(`/Talk?talkId=${card.id}`);
  };
  switch (type) {
    case 'Talk':
      return (
        <>
          <Grid item key={card.id} xs={12} sm={6} md={4}>
            <Card>
              <Grid container justify="flex-end">
                <Tooltip title={'Delete ' + card.name} placement="right">
                  <PopupDelete card={card} type={type} />
                </Tooltip>
              </Grid>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {card.name}
                </Typography>
                <Typography>{card.description}</Typography>
              </CardContent>
              <CardActions>
                <EditTalkPopUp talk={card} />
                <Button size="small" color="primary" onClick={goToTalk}>
                  start
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </>
      );
    case 'Quizz':
      return (
        <>
          <Grid item key={card.id} xs={12} sm={6} md={4}>
            <Card>
              <Grid container justify="flex-end">
                <Tooltip title={'Delete ' + card.name} placement="right">
                  <PopupDelete card={card} type={type} />
                </Tooltip>
              </Grid>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {card.name}
                </Typography>
                <Typography>{card.description}</Typography>
              </CardContent>
              <CardActions>
                <EditQuizzPopUp quizz={card} />
              </CardActions>
            </Card>
          </Grid>
        </>
      );
    default:
      return <></>;
  }
};
export default PresCard;
