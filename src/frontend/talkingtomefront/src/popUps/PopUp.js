<<<<<<< HEAD
import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withSearchValue } from '../enhancers/WithSearchValue'
import CreateTalkPopUp from './popUpCards/CreateTalkPopUp'
import DropZone from './popUpCards/DropZone'
=======
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withSearchValue } from '../enhancers/WithSearchValue';
import CreateTalkPopUp from './popUpCards/CreateTalkPopUp';
import DropZone from './popUpCards/DropZone';
>>>>>>> b39a5330a8d0d01c9a4b187a4f036ea9f5e6e1f8

function PopUp() {
  const [open, setOpen] = React.useState(false)

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
          <CreateTalkPopUp />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
<<<<<<< HEAD
export default PopUp
=======
export default PopUp;
>>>>>>> b39a5330a8d0d01c9a4b187a4f036ea9f5e6e1f8
