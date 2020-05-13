import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, CssBaseline, AppBar, Toolbar } from '@material-ui/core';
import { loadTalkNQuizzes } from '../dataTransfers/Fetchs/DataTalkFetch';
import { loadQuizzContent } from '../dataTransfers/Fetchs/DataQuestionFetch';
import QuestionInterface from './questionsPreview/QuestionInterface';
import { useHistory } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { CreateTalkHub } from '../signalR/CreateHub';
import { v4 as uuidv4 } from 'uuid';
import { InitialState } from '../store/reducers/MainReducer';
import { useSelector } from 'react-redux';
import { siteUrl } from '../constants';
import { HubConnection } from '@aspnet/signalr';

interface StateProps {
  userIdRdx: string;
  tokenIdRdx: string;
}

const TalkInterface = () => {
  const [quizzId, setQuizzId] = useState('0');
  const [listQuizzes, setListQuizzes] = useState([{}]);
  const [talkName, setTalkName] = useState('');
  const [showQuestion, setShowQuestion] = useState(false);
  const [connection, setConnection] = useState<HubConnection>();
  const [questionsData, setQuestionsData] = useState([{}]);
  const [groupId, setGroupId] = useState(uuidv4());

  const { userIdRdx, tokenIdRdx } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        userIdRdx: state.userIdRdx,
        tokenIdRdx: state.tokenIdRdx,
      };
    },
  );
  const qrString = `${siteUrl}TalkAnswer?talkId=${groupId}&ownerId=${userIdRdx}`;

  const url = new URL(window.location.href);
  const TalkId: string | null = url.searchParams.get('talkId');
  const history = useHistory();

  //Buttons
  const backToMenu = () => {
    history.push('/Menu');
    if (connection !== undefined) {
      connection?.stop();
    }
  };
  if (connection !== undefined) {
    connection.on('JoinedGroup', function (responseData) {
      console.log('A new User has joined the channel: ' + responseData);
    });

    connection.on('NewChannel', function (responseData) {
      console.log('The new channel is: ' + responseData);
    });

    connection.on('RequestCurrentQuizz', function (responseData) {
      connection.invoke('GetCurrentQuizz', groupId, quizzId);
    });
  }

  //Data Fetching
  const onChangeQuizz = async (value: string) => {
    setQuizzId(value);
    const responseData = await loadQuizzContent(value, tokenIdRdx);
    responseData && showQuestions(responseData);
  };

  const loadInit = async () => {
    const responseData = await loadTalkNQuizzes(TalkId, tokenIdRdx);
    responseData && showInitialFetchedData(responseData);
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
  };

  //UseEffects
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
      console.log('CreateTalkGroup: ' + groupId);
      connect.invoke('CreateTalkGroup', groupId, Number(TalkId));
    };
    createHubConnection();
    loadInit();
  }, []); //Load only once at first build

  const startQuizz = () => {
    if (connection !== undefined) {
      let qz: any = listQuizzes.filter(
        (q: any) => q.id === parseInt(quizzId),
      )[0];
      connection.invoke('StartQuizz', groupId, quizzId, qz.name);
      console.log(`Starting quizz ${quizzId}`);
    }
  };

  //CSS
  const useStyles = makeStyles((theme) => ({
    title: {
      textAlign: 'center',
    },
    button: {
      margin: 5,
    },
    fragmentMargin: {
      padding: 15,
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    quizzNQuest: {
      paddingLeft: '40px',
      paddingRight: '40px',
    },
    selectNStart: {
      marginBottom: '10px',
    },
  }));

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap>
            Talk
          </Typography>
          <Button
            variant="contained"
            onClick={backToMenu}
            className={classes.button}
          >
            Back to talks menu
          </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.fragmentMargin}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          {talkName}
        </Typography>
        <div className={classes.selectNStart}>
          <Select
            labelId="label"
            id="select"
            value={quizzId}
            onChange={(e: any) => onChangeQuizz(e.target.value)}
          >
            {!showQuestion && (
              <MenuItem value="0" disabled={true}>
                Select a quizz
              </MenuItem>
            )}
            {listQuizzes.map(
              (quizz: any) =>
                quizz.name && (
                  <MenuItem value={quizz.id} key={quizz.id}>
                    {quizz.name}
                  </MenuItem>
                ),
            )}
          </Select>
          <Button
            variant="outlined"
            color="primary"
            onClick={startQuizz}
            className={classes.button}
            disabled={quizzId === '0'}
          >
            Start Quizz
          </Button>
          <QRCode value={qrString} />
          <a
            href={`TalkAnswer?talkId=${groupId}&ownerId=${userIdRdx}&talkName=${talkName}`}
          >
            Link to a user page
          </a>
        </div>
        <div className={classes.quizzNQuest}>
          {showQuestion && <h3 className={classes.title}>Quizz preview</h3>}
          {showQuestion &&
            questionsData.map(
              (question: any) =>
                question && (
                  <QuestionInterface
                    key={question.id}
                    questId={question.id}
                    quest={question.quest}
                    typeQuest={question.type}
                    answers={question.answers.map(
                      (ans: {
                        id: number;
                        questionId: number;
                        response: string;
                      }) => ans.response,
                    )}
                    isPreview={true}
                    correctAn={question.correctAn}
                    addAnswer={() => {}} //Prop only useful for users but typescript needs us to declare it here too
                  />
                ),
            )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default TalkInterface;
