import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import EditTalkPopUp from '../popUps/popUpCards/EditTalkPopUp';
import { Tooltip, Grid, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import PopupDelete from '../editQuizz/PopupDelete';
import EditQuizzPopUp from '../popUps/popUpCards/EditQuizzPopUp';
import AddTalkPopUp from '../popUps/popUpCards/AddTalkPopUp';
import { putTalk } from '../dataTransfers/Posts/DataTalkPost';
import { InitialState } from '../store/reducers/MainReducer';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { RootDispatcher } from '../store/MainDispatcher';
import OldSessions from '../popUps/popUpCards/OldSessions';

interface IProps {
  card: any;
  type: string;
}

interface StateProps {
  tokenIdRdx: string;
  changeRequestRdx: number;
}
// TODO -Change Image and Add onclickModifier
const PresCard: React.FC<IProps> = (props) => {
  const card = props.card;
  const type = props.type;
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [addTalkOpen, setAddTalkOpen] = useState(false);
  const [openOldSessions, setOpenOldSessions] = useState(false);

  const { tokenIdRdx, changeRequestRdx } = useSelector<
    InitialState,
    StateProps
  >((state: InitialState) => {
    return {
      tokenIdRdx: state.tokenIdRdx,
      changeRequestRdx: state.changeRequestRdx,
    };
  });
  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  const goToTalk = () => {
    history.push(`/Talk?talkId=${card.id}&groupId=${uuidv4()}`);
  };

  const resumeTalk = () => {
    history.push(`/Talk?talkId=${card.id}&groupId=${card.url}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddTalkOpen = () => {
    setAddTalkOpen(true);
  };

  const handleStop = async () => {
    const json = [
      {
        url: 'NULL',
      },
    ];
    await putTalk('Talks/ChangeUrl/', json, card.id, tokenIdRdx);
    await rootDispatcher.setChangeRequestRdx(changeRequestRdx + 1);
  };

  const handleClose = () => {
    open ? setOpen(false) : setAddTalkOpen(false);
  };

  const handleCloseOldSessions = () => {
    openOldSessions && setOpenOldSessions(false);
  };

  switch (type) {
    case 'Talk':
      return (
        <>
          <Grid item key={card.id} xs={12} sm={6} md={4}>
            <Card>
              <Grid container justify="flex-end">
                <IconButton
                  aria-label="edit"
                  onClick={handleClickOpen}
                  className="deleteButton"
                >
                  <EditIcon color="primary" fontSize="small" />
                </IconButton>
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
                {openOldSessions && (
                  <OldSessions
                    talk={card}
                    onClose={handleCloseOldSessions}
                    open={openOldSessions}
                  />
                )}
                {card.url === null ? (
                  <div>
                    <Button size="small" color="primary" onClick={goToTalk}>
                      Start session
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => setOpenOldSessions(true)}
                    >
                      History
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button size="small" color="primary" onClick={resumeTalk}>
                      Resume
                    </Button>
                    <Button size="small" color="secondary" onClick={handleStop}>
                      Stop
                    </Button>
                  </div>
                )}
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
                <IconButton
                  aria-label="edit"
                  onClick={handleClickOpen}
                  className="deleteButton"
                >
                  <EditIcon color="primary" fontSize="small" />
                </IconButton>
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
                    editing={true}
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
