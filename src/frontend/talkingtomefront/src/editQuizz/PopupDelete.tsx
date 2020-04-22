import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteTalkById } from '../dataTransfers/DataTalkPost';
import { deleteQuizzById } from '../dataTransfers/DataQuizzPost';
import { useDispatch, useSelector } from 'react-redux'
import { InitialState } from '../store/reducers/MainReducer'
import { RootDispatcher } from '../store/MainDispatcher'

interface IProps {
    card: any;
    type: string;
  }
interface StateProps {
    changeRequestRdx: number
  }

const PopupDelete: React.FC<IProps> = (props) =>  {
  const [open, setOpen] = useState(false);
  const card = props.card;
  const type = props.type;

  const {changeRequestRdx } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        changeRequestRdx: state.changeRequestRdx
      }
    },
  )
  const dispatch = useDispatch()
  const rootDispatcher = new RootDispatcher(dispatch)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteCard = async (id:number) => {
    switch (type){
        case "Quizz":
            await deleteQuizzById(card.id);
            break;
        case "Talk":
            await deleteTalkById(card.id);  
            break;
        }
    rootDispatcher.setChangeRequestRdx(changeRequestRdx-1);
    setOpen(false);
  };

  return (
    <div>
        <IconButton
            aria-label="delete"
            onClick={handleClickOpen}
            >
            <DeleteIcon color="secondary" fontSize="small" />
        </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"This Delete is irreversible"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sur you want to delete the {type}: {card.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
            deleteCard(card.id);
            }} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default PopupDelete;