import * as signalR from '@aspnet/signalr';
import React, { useState, useEffect } from 'react';
import { CreateTalkHub } from '../signalR/CreateHub';
import { useSelector } from 'react-redux';
import { InitialState } from '../store/reducers/MainReducer';
import { v4 as uuidv4 } from 'uuid';
import { getQuizzById } from '../dataTransfers/Fetchs/DataQuizzFetch';
import { HubConnection } from '@aspnet/signalr';
import QuestionInterface from '../talk/questionsPreview/QuestionInterface';
import { Typography, AppBar, Toolbar, makeStyles } from '@material-ui/core';
interface StateProps {
  userIdRdx: string;
  tokenIdRdx: string;
}
interface IProps {}
const UserAnswerQuizz: React.FC<IProps> = (props) => {
  const [quizzName, setQuizzName] = useState('');
  const [quizzId, setQuizzId] = useState(-1);
  const [questionsData, setQuestionsData] = useState([{}]);
  const [waitingQuizz, setWaitingQuizz] = useState(true);
  const [connection, setConnection] = useState<HubConnection>();
  const url = new URL(window.location.href);
  const groupId: string | null = url.searchParams.get('talkId');
  const ownerId: string | null = url.searchParams.get('ownerId');
  const talkName: string | null = url.searchParams.get('talkName');
  const dictResp = new Map();

  if (connection !== undefined) {
    connection.on(
      'StartQuizz',
      (quests: any, quizzId: number, quizzName: string) => {
        setQuizzId(quizzId);
        setQuizzName(quizzName);
        showQuestions(quests);
      },
    );
    connection.on('SetCurrentQuiz', function (responseData: any) {
      if (responseData === -1) {
      }
    });
  }

  const showQuestions = (data: any) => {
    if (data) {
      setQuestionsData(data);
      for (let d of data) {
        dictResp.set(d.id, '');
      }
      setWaitingQuizz(false);
    }
  };

  const addAnswerToList = (questId: number, resp: string) => {
    dictResp.set(questId, resp);
  };

  useEffect(() => {
    const createHubConnection = async () => {
      const connect = CreateTalkHub();
      try {
        await connect.start();
        //Invoke method defined in server to add user to a specified group
      } catch (err) {
        console.log(err);
      }
      setConnection(connect)
      connect.invoke("JoinGroup",groupId, ownerId);
      connect.invoke("GetCurrentQuizz",groupId);
    }
    createHubConnection();
  }, []);

  useEffect(() => {
    if (quizzName !== '') {
    }
  }, [quizzName]);

  const useStyles = makeStyles((theme) => ({
    userToolbar: {
      display: 'flex',
      justifyContent: 'center',
    },
    advice: {
      display: 'flex',
      justifyContent: 'center',
    },
  }));

  const classes = useStyles();

  return (
    <React.Fragment>
      <>
        <AppBar position="relative">
          <Toolbar className={classes.userToolbar}>
            <Typography variant="h4" align="center" color="inherit">
              {talkName}
            </Typography>
          </Toolbar>
        </AppBar>

        {waitingQuizz ? (
          <div className={classes.advice}>
            <p>
              You don't have anything to do for now, just listen to the talk 😊
            </p>
          </div>
        ) : (
          <div>
            <div className={classes.advice}>
              <p>Please answer the following quizz 🤓</p>
            </div>
            <Typography
              variant="h5"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {quizzName}
            </Typography>
            {questionsData.map(
              (question: any) =>
                question && (
                  <QuestionInterface
                    key={question.id}
                    questId={question.id}
                    quest={question.question}
                    typeQuest={question.type}
                    answers={question.answers.map((ans: string) => ans)}
                    correctAn={question.correctAn}
                    isPreview={false}
                    addAnswer={addAnswerToList}
                  />
                ),
            )}
          </div>
        )}
      </>
    </React.Fragment>
  );
}; 
export default UserAnswerQuizz;
