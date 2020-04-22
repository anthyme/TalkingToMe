import React, { useState, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { postTalk } from '../../dataTransfers/DataTalkPost'
import DropZone from './DropZone'
import { InitialState } from '../../store/reducers/MainReducer';
import { RootDispatcher } from '../../store/MainDispatcher';

interface StateProps { 
  changeRequestRdx: number
}

function CreateTalkPopUp() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [open, setOpen] = React.useState(false)

  const {changeRequestRdx} = useSelector<InitialState, StateProps>((state: InitialState) => {
    return {
      changeRequestRdx: state.changeRequestRdx
    }
});
  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  const TalkJson = [
    {
      name: { name },
      description: { description },
    },
  ]

  const onDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
  }

  const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const postNewTalk = async () => {
    setOpen(false)
    await postTalk(TalkJson);
    rootDispatcher.setChangeRequestRdx(changeRequestRdx+1);
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create new Talk
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create new Talk</DialogTitle>
        <DialogContent>
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
                  onNameChange(event)
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
                  onDescriptionChange(event)
                }}
                fullWidth
              />
              <p>
                <DropZone />
              </p>
            </DialogContent>
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
              color="primary"
              variant="outlined"
              onClick={postNewTalk}
            >
              Create Talk
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default CreateTalkPopUp
