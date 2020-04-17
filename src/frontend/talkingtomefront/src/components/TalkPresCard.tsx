import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import EditTalkPopUp from '../popUps/popUpCards/EditTalkPopUp';
import { Tooltip, IconButton } from '@material-ui/core';
import { deleteTalkById } from '../dataTransfers/DataTalkPost';
import { useHistory } from 'react-router-dom';

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
}

const deleteTalk = (id: number) => {
  console.log(id);
  deleteTalkById(id);
};

// TODO -Change Image and Add onclickModifier
const TalkPresCard: React.FC<IProps> = (props) => {
  //const classes = useStyles()

  const card = props.card;

  const history = useHistory();

  const goToTalk = () => {
    history.push(`/Talk?talkId=${card.id}`);
  };

  return (
    <>
      <Grid item key={card.id} xs={12} sm={6} md={4}>
        <Card>
          <Grid container justify="flex-end">
            <Tooltip title={'Delete ' + card.name} placement="right">
              <IconButton
                aria-label="delete"
                onClick={() => {
                  deleteTalk(card.id);
                }}
              >
                <DeleteIcon color="secondary" fontSize="small" />
              </IconButton>
            </Tooltip>
          </Grid>

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
            <EditTalkPopUp talk={card} />
            <Button size="small" color="primary" onClick={goToTalk}>
              start
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};
export default TalkPresCard;
