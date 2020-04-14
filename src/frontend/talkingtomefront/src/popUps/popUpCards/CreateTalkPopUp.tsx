import React, {useState, ChangeEvent} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {postTalk} from '../DataTransfer'
import DropZone from './DropZone';


function CreateTalkPopUp() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const TalkJson ={
    name: {name},
    description: {description}
  };

  const onDescriptionChange = (event: ChangeEvent<HTMLInputElement>)=>{
    setDescription(event.target.value);
  }

  const onNameChange = (event: ChangeEvent<HTMLInputElement>)=>{
    setName(event.target.value);
  }

  return (
    <>
      <DialogContent>
        <DialogContentText>
          Creating a new Talk, please enter its name and ulpload your
          presentation (ppt format)
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Talk name"
          type="text"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onNameChange(event);
          }}
          fullWidth
        />
           <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          type="text"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onDescriptionChange(event);
          }}
          fullWidth
        />
        <p>
          <DropZone />
        </p>
      </DialogContent>
      <Button variant="outlined" onClick={()=>{postTalk(TalkJson)}}>
        Create Talk
      </Button>
    </>
  );
}
export default CreateTalkPopUp;
