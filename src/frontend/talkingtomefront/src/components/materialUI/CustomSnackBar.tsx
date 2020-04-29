import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core';

interface IProps {
  message: string; //The message that'll be displayed in the snackbar
  variant: string; //The level of severity that'll impact the background color ('error' = red, 'warning' = orange, the rest is green )
}

const CustomSnackBar: React.FC<IProps> = (props) => {
  const [open, setOpen] = useState(true);

  const backcolor =
    props.variant === 'error'
      ? 'red'
      : props.variant === 'warning'
      ? 'orange'
      : 'green';

  const useStyles = makeStyles(() => ({
    root: {
      width: '100%',
      background: `${backcolor}`,
    },
  }));

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
      autoHideDuration={4000}
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
