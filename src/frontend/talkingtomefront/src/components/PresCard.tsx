import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import EditTalkPopUp from '../popUps/popUpCards/EditTalkPopUp';
import { Tooltip, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import PopupDelete from '../editQuizz/PopupDelete';
import EditQuizzPopUp from '../popUps/popUpCards/EditQuizzPopUp';
import AddTalkPopUp from '../popUps/popUpCards/AddTalkPopUp';

interface IProps {
  card: any;
  type: string;
}

// TODO -Change Image and Add onclickModifier
const PresCard: React.FC<IProps> = (props) => {
  const card = props.card;
  const type = props.type;
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [addTalkOpen, setAddTalkOpen] = useState(false);

  const goToTalk = () => {
    history.push(`/Talk?talkId=${card.id}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddTalkOpen = () => {
    setAddTalkOpen(true);
  };

  const handleClose = () => {
    open ? setOpen(false) : setAddTalkOpen(false);
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
                {open && (
                  <EditTalkPopUp
                    talk={card}
                    onClose={handleClose}
                    open={open}
                  />
                )}
                <Button size="small" color="primary" onClick={goToTalk}>
                  Start
                </Button>
                <Button size="small" color="primary" onClick={handleClickOpen}>
                  Edit
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
                {open && (
                  <EditQuizzPopUp
                    quizz={card}
                    onClose={handleClose}
                    open={open}
                  />
                )}
                {addTalkOpen && (
                  <AddTalkPopUp
                    quizz={card}
                    onClose={handleClose}
                    open={addTalkOpen}
                  />
                )}
                <Button
                  size="small"
                  color="primary"
                  onClick={handleAddTalkOpen}
                >
                  Associated talks
                </Button>
                <Button size="small" color="primary" onClick={handleClickOpen}>
                  Edit
                </Button>
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
