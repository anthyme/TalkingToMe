import React, {useState, ChangeEvent} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { putTalk } from '../../dataTransfers/DataTalkPost';

interface IProps {
    talk: any,
  }

const EditTalkPopUp: React.FC<IProps> = (props) =>  {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(props.talk.name);
  const [description, setDescription] = useState(props.talk.description);
  const [id, setId] = useState(props.talk.id);
  const json = {
      "id":{id},
      "name": {name},
      "description": {description}
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitEdit = () => {
    setOpen(false);
    putTalk(json);
  }

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const onDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }


  return (
    <div>
      <Button size="small" color="primary" onClick={handleClickOpen}>
            edit
    </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editing Talk</DialogTitle>
        <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Talk name"
          type="text"
          value={name}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onNameChange(event);
          }}
          fullWidth
        />
        <TextField
          autoFocus
          value={description}
          margin="dense"
          id="description"
          label="Description"
          type="text"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onDescriptionChange(event);
          }}
          fullWidth
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmitEdit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default EditTalkPopUp;
