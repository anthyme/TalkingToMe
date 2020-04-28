import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    background: 'red',
  },
}));

interface IProps {
  message: string;
  variant: string;
}

const CustomSnackBar: React.FC<IProps> = (props) => {
  const [open, setOpen] = useState(true);

  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      key={"'bottom','center'"}
      open={open}
      onClose={handleClose}
      message={props.message}
      ContentProps={{
        classes: {
          root: classes.root,
        },
      }}
    />
  );
};

export default CustomSnackBar;
