import * as signalR from '@aspnet/signalr';
import React, { useState, useEffect } from 'react';
import { CreateTalkHub } from '../signalR/CreateHub';
import { useSelector } from 'react-redux';
import { InitialState } from '../store/reducers/MainReducer';
import { v4 as uuidv4 } from 'uuid';
import { getQuizzById } from '../dataTransfers/Fetchs/DataQuizzFetch';
import { HubConnection } from '@aspnet/signalr';
import QuestionInterface from '../talk/questionsPreview/QuestionInterface';
import { Typography } from '@material-ui/core';
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

  if (connection !== undefined) {
    connection.on(
      'StartQuizz',
      (quests: any, quizzId: number, quizzName: string) => {
        setQuizzId(quizzId);
        setQuizzName(quizzName);
        showQuestions(quests);
      },
    );
    connection.on('SetCurrentQuizz',(quests: any, quizzId: number, quizzName: string) => {
      console.log("Entered setCurrenQuizz")
      if(quizzId!==-1){
        setQuizzId(quizzId);
        setQuizzName(quizzName);
        showQuestions(quests);
      }
    },
    );
  }

  const showQuestions = (data: any) => {
    setQuestionsData(data);
    setWaitingQuizz(false);
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

  return (
    <React.Fragment>
      <>
        {waitingQuizz ? (
          <div>
            <p>Waiting for a Quizz ... </p>
          </div>
        ) : (
          <div>
            <Typography
              variant="h4"
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
                    quest={question.question}
                    typeQuest={question.type}
                    answers={question.answers.map((ans: string) => ans)}
                    correctAn={question.correctAn}
                    isPreview={false}
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
