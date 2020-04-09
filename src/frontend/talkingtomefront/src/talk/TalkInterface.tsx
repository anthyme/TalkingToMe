import React, { useState, ChangeEvent, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const TalkInterface = () => {
  const [quizzId, setQuizzId] = useState('0');
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const TalkId: number = 1;
  const UserId: number = 1; //This two const should come from props but for development purpose, they're set like that for now

  const onChangeQuizz = (value: any) => {
    setQuizzId(value);
  };

  const backToMenu = () => {
    setShouldRedirect(true);
  };

  const startQuizz = () => {
    console.log(`Now we should show the quizz ${quizzId}`);
  };

  const loadQuizzToTalk = async () => {
    console.log('Louis rentre dans loadQuizz');
    const response = await fetch(
      `https://localhost:44381/api/Talks/${TalkId}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (response.status === 200) {
      console.log('Louis response talk get');
      console.log(response.json());
      return response;
    } else {
      console.log('Failed getting talk');
    }
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .then((responseData) => {
    //       setMessage(responseData.message);
    //     })
    //     .then(() => console.log(message))
    //     .catch((err) => console.log('caught this error: ' + err));
  };

  useEffect(() => {
    console.log("Le use effect s'active");
    loadQuizzToTalk();
  }, []);

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
