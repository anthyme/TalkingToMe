import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DropZone from './DropZone'
import { withSearchValue } from '../../enhancers/WithSearchValue'

function CreateTalkPopUp() {
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
          type="email"
          fullWidth
        />
        <p>
          <DropZone />
        </p>
      </DialogContent>
    </>
  )
}
export default CreateTalkPopUp
