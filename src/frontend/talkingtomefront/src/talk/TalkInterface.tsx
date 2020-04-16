import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { loadTalkNQuizzes } from '../dataTransfers/DataTalkFetch';
import { loadQuizzContent } from '../dataTransfers/DataQuestionFetch';
import QuestionInterface from './questionsPreview/QuestionInterface';

const TalkInterface = () => {
  const [quizzId, setQuizzId] = useState(0);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [initRequestFailed, setInitRequestFailed] = useState(false);
  const [questRequestFailed, setQuestRequestFailed] = useState(false);
  const [listQuizzes, setListQuizzes] = useState([{}]);
  const [talkName, setTalkName] = useState('');
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionsData, setQuestionsData] = useState([{}]);

  const TalkId: number = 1;
  const UserId: number = 1; //These two const should come from props but for development purpose, they're set like that for now

  //Buttons
  const backToMenu = () => {
    setShouldRedirect(true);
  };

  const startQuizz = () => {
    console.log(`Starting quizz ${quizzId}`);
  };

  //Data Fetching
  const onChangeQuizz = async (value: number) => {
    setQuizzId(value);
    const responseData = await loadQuizzContent(value);
    responseData ? showQuestions(responseData) : setQuestRequestFailed(true);
  };

  const loadInit = async () => {
    const responseData = await loadTalkNQuizzes(TalkId);
    responseData
      ? showInitialFetchedData(responseData)
      : setInitRequestFailed(true);
  };

  //Data Showing
  const showInitialFetchedData = (data: any) => {
    setTalkName(data.talkName);
    for (let quizz of data.quizzes) {
      setListQuizzes((listQuizzes) => [...listQuizzes, quizz]);
    }
  };

  const showQuestions = (data: any) => {
    setQuestionsData(data);
    setShowQuestion(true);
    console.log('Louis data', data);
  };

  //UseEffects
  useEffect(() => {
    loadInit();
  }, []); //Load only once at first build

  //CSS
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
          <h1 className={classes.title}>{talkName}</h1>
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
            {listQuizzes.map(
              (quizz: any) =>
                quizz.name && (
                  <MenuItem value={quizz.id}>{quizz.name}</MenuItem>
                ),
            )}
          </Select>
          <Button
            variant="outlined"
            color="primary"
            onClick={startQuizz}
            className={classes.button}
          >
            Start Quizz
          </Button>
          {showQuestion &&
            questionsData.map(
              (question: any) =>
                question && (
                  <QuestionInterface
                    key={question.id}
                    quest={question.quest}
                    typeQuest={question.type}
                  />
                ),
            )}
        </>
      )}
    </React.Fragment>
  );
};

export default TalkInterface;
