import React, { useState, ChangeEvent } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const TalkInterface = () => {
  const [quizzId, setQuizzId] = useState('0');
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const onChangeQuizz = (value: any) => {
    setQuizzId(value);
  };

  const backToMenu = () => {
    setShouldRedirect(true);
  };

  const startQuizz = () => {
    console.log(`Now we should show the quizz ${quizzId}`);
  };

  const useStyles = makeStyles((theme) => ({
    title: {
      textAlign: 'center',
    },
    button: {
      margin: 5,
    },
    backMenu: {
      right: 0,
      position: 'absolute',
    },
  }));

  const classes = useStyles();

  return (
    <React.Fragment>
      {shouldRedirect ? (
        <Redirect to="/Menu" push />
      ) : (
        <>
          <h1 className={classes.title}>Talk's Name</h1>
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={backToMenu}
              className={`${classes.button} ${classes.backMenu}`}
            >
              Back to main menu
            </Button>
          </div>
          <h2>Select your quizz</h2>
          <Select
            labelId="label"
            id="select"
            value={quizzId}
            onChange={(e: any) => onChangeQuizz(e.target.value)}
          >
            <MenuItem value="0" disabled={true}>
              Select a quizz
            </MenuItem>
            <MenuItem value="1">Quizz 1</MenuItem>
            <MenuItem value="2">Quizz 2</MenuItem>
            <MenuItem value="3">Quizz 3</MenuItem>
          </Select>
          <Button
            variant="outlined"
            color="primary"
            onClick={startQuizz}
            className={classes.button}
          >
            Start Quizz
          </Button>
        </>
      )}
    </React.Fragment>
  );
};

export default TalkInterface;
