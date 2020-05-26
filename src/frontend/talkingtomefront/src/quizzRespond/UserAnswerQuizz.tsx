import * as signalR from '@aspnet/signalr';
import React, { useState, useEffect } from 'react';
import { CreateTalkHub } from '../signalR/CreateHub';
import { useSelector } from 'react-redux';
import { InitialState } from '../store/reducers/MainReducer';
import { v4 as uuidv4 } from 'uuid';
import { getQuizzById } from '../dataTransfers/Fetchs/DataQuizzFetch';
import {
  HubConnectionBuilder,
  HttpTransportType,
  HubConnection,
} from '@microsoft/signalr';
import QuestionInterface from '../talk/questionsPreview/QuestionInterface';
import {
  Typography,
  AppBar,
  Toolbar,
  makeStyles,
  Button,
} from '@material-ui/core';
import ChatInterface from '../chatBox/ChatInterface';
interface StateProps {
  userIdRdx: string;
  tokenIdRdx: string;
}
interface IProps {}
const UserAnswerQuizz: React.FC<IProps> = (props) => {
  const [quizzName, setQuizzName] = useState('');
  const [tab, setTab] = useState('Quizz');
  const [quizzId, setQuizzId] = useState(-1);
  const [questionsData, setQuestionsData] = useState([{}]);
  const [waitingQuizz, setWaitingQuizz] = useState(true);
  const [connection, setConnection] = useState<HubConnection>();
  const [hasValidated, setHasValidated] = useState(false);
  const url = new URL(window.location.href);
  const groupId: string | null = url.searchParams.get('talkId');
  const ownerId: string | null = url.searchParams.get('ownerId');
  const talkName: string | null = url.searchParams.get('talkName');
  const listAnswer = new Map();

  if (connection) {
    connection.on(
      'StartQuizz',
      (quests: any, quizzId: number, quizzName: string) => {
        setQuizzId(quizzId);
        setQuizzName(quizzName);
        showQuestions(quests);
      },
    );
    connection.on(
      'SetCurrentQuizz',
      (quests: any, quizzId: number, quizzName: string) => {
        if (quizzId !== -1) {
          setQuizzId(quizzId);
          setQuizzName(quizzName);
          showQuestions(quests);
        }
      },
    );
    connection.on('StopQuizz', () => {
      setWaitingQuizz(true);
      setQuizzId(-1);
      setQuizzName('');
      setQuestionsData([{}]);
      setHasValidated(false);
    });
  }

  const showQuestions = (data: any) => {
    if (data) {
      setQuestionsData(data);
      for (let d of data) {
        listAnswer.set(d.id, '');
      }
      setWaitingQuizz(false);
    }
  };

  const changeToChat = ()=>{
    setTab('Chat');
  };

  const changeToQuizz =()=>{
    setTab("Quizz");
  }

  const addAnswerToList = (questId: number, resp: string) => {
    listAnswer.set(questId, resp);
  };

  const saveAnswers = () => {
    if (!hasValidated && connection) {
      let questIdList: number[] = [];
      let answerList: string[] = [];
      listAnswer.forEach((value, key, map) => {
        questIdList.push(key);
        answerList.push(value);
      });
      connection.invoke(
        'SaveAnswers',
        groupId,
        quizzId,
        questIdList,
        answerList,
      );
    }
    setHasValidated(true);
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
      setConnection(connect);
      connect.invoke('JoinGroup', groupId, ownerId);
      connect.invoke('GetCurrentQuizz', groupId);
    };
    createHubConnection();
  }, []);

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: 5,
    },
    buttonNText: {
      display: 'grid',
      verticalAlign: 'middle',
      justifyContent: 'center',
    },
    center: {
      display: 'flex',
      justifyContent: 'center',
    },
  }));

  const classes = useStyles();
  
  return (
    <React.Fragment>
      <>
        <AppBar position="relative">
          <Toolbar className={classes.center}>
            <Typography variant="h4" align="center" color="inherit">
              {talkName}
            </Typography>
            <Button onClick = {changeToChat}>Chat</Button>
            <Button onClick = {changeToQuizz}>Quizz</Button>
          </Toolbar>
        </AppBar>

        {tab==="Quizz"?(waitingQuizz ? (
          <div className={classes.center}>
            <p>
              You don't have anything to do for now, just listen to the talk{' '}
              <span role="img" aria-label="Smiling Face with Smiling Eyes">
                😊
              </span>
            </p>
          </div>
        ) : (
          <div>
            <div className={classes.center}>
              <p>
                Please answer the following quizz{' '}
                <span role="img" aria-label="Nerd Face">
                  🤓
                </span>
              </p>
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
                    isPreview={hasValidated}
                    addAnswer={addAnswerToList}
                  />
                ),
            )}
            <div className={classes.buttonNText}>
              {hasValidated && <div>You have already sent your answers</div>}
              <Button
                variant="contained"
                color="primary"
                onClick={saveAnswers}
                className={classes.button}
                disabled={hasValidated}
              >
                Validate answers
              </Button>
            </div>
          </div>
        )):(
          <ChatInterface connection={connection} groupId={groupId}/>
        )}
      </>
    </React.Fragment>
  );
};
export default UserAnswerQuizz;
