import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { putTalk } from '../../dataTransfers/DataTalkPost';
import QuizzEdit from '../../editQuizz/QuizzEdit';

interface IProps {
  quizz: any;
}

const EditQuizzPopUp: React.FC<IProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(props.quizz.name);
  const [id, setId] = useState(props.quizz.id);
  const json = {
    id: { id },
    name: { name },
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitEdit = () => {
    setOpen(false);
    //putQuizz(json);
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
        <DialogTitle id="form-dialog-title">Editing Quizz</DialogTitle>
        <DialogContent>
          <>
            <DialogContent>
              <QuizzEdit quizzId={id} />
            </DialogContent>
          </>
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
};
export default EditQuizzPopUp;
