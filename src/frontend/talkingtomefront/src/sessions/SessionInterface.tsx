import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { InitialState } from '../store/reducers/MainReducer';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Box,
  Select,
  MenuItem,
} from '@material-ui/core';
import {
  getSessionAndChatById,
  loadResults,
} from '../dataTransfers/Fetchs/DataSessionFetch';
import { useHistory } from 'react-router-dom';
import ChatInterface from '../chatBox/ChatInterface';
import GraphInterface from '../graphs/GraphInterface';
import QuestionInterface from '../talk/questionsPreview/QuestionInterface';
import { loadQuizzContent } from '../dataTransfers/Fetchs/DataQuestionFetch';
import { isEmpty } from 'lodash';

interface StateProps {
  userIdRdx: string;
  tokenIdRdx: string;
}

const SessionInterface = () => {
  const url = new URL(window.location.href);
  const sessionId = url.searchParams.get('sessionId');
  const [sessionDate, setSessionDate] = useState('');
  const [tab, setTab] = useState('Talk');
  const [talkName, setTalkName] = useState('');
  const [quizzId, setQuizzId] = useState('0');
  const [results, setResults] = useState(Object);
  const [showResults, setShowResults] = useState(false);
  const [listQuizzes, setListQuizzes] = useState([{}]);
  const [questionsData, setQuestionsData] = useState([{}]);
  const [showQuestion, setShowQuestion] = useState(false);
  const [groupId, setGroupId] = useState('');
  const [likedQuestions, setLikedQuestions] = useState<number[]>([]);
  const { userIdRdx, tokenIdRdx } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        userIdRdx: state.userIdRdx,
        tokenIdRdx: state.tokenIdRdx,
      };
    },
  );
  const history = useHistory();

  const changeToTalk = () => {
    setTab('Talk');
  };

  const changeToChat = () => {
    setTab('Chat');
  };

  const onChangeQuizz = async (value: string) => {
    setShowResults(false);
    setQuizzId(value);
    const responseData = await loadQuizzContent(value, tokenIdRdx);
    if (responseData) {
      showQuestions(responseData);
      const resData = await loadResults(groupId, value, tokenIdRdx);
      setResults(resData.listQuestions);
      setShowResults(true);
    }
  };
  const showQuestions = (data: any) => {
    setQuestionsData(data);
    setShowQuestion(true);
  };

  const showInitialFetchedData = (data: any) => {
    console.log('Louis data', data);
    console.log('Louis userIdRdx', userIdRdx);
    if (data) {
      var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Europe/Paris',
      };
      setTalkName(data.talkNQuizzes.talkName);
      setGroupId(data.session.groupId);
      setSessionDate(
        'Session of ' + new Date(data.date).toLocaleString('en-US', options),
      );
      for (let quizz of data.talkNQuizzes.quizzes) {
        setListQuizzes((listQuizzes) => [...listQuizzes, quizz]);
      }
    }
  };

  useEffect(() => {
    if (!isEmpty(results)) {
      setShowResults(true);
    }
  }, [results]);

  useEffect(() => {
    if (userIdRdx === '-1') {
      history.push('/');
    } else {
      sessionId &&
        getSessionAndChatById(sessionId, userIdRdx, tokenIdRdx).then(
          (json) => json && showInitialFetchedData(json),
        );
    }
  }, [history, sessionId, tokenIdRdx, userIdRdx]);

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
      marginTop: '6%',
    },
    startNQr: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '-5%',
      paddingRight: '2%',
    },
    smallQR: {
      cursor: 'zoom-in',
    },
    bigQR: {
      cursor: 'zoom-out',
    },
  }));
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="relative">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap>
            <Button onClick={changeToTalk} color="inherit">
              Talk
            </Button>
            <Button onClick={changeToChat} color="inherit">
              Chat
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
      {tab === 'Talk' ? (
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
          <Typography
            component="h4"
            variant="h5"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            {sessionDate}
          </Typography>
          <div className={classes.startNQr}>
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
            </div>
          </div>
          <div className={classes.quizzNQuest}>
            {showQuestion && <h3 className={classes.title}>Quizz preview</h3>}
            {showQuestion &&
              questionsData.map(
                (question: any) =>
                  question && (
                    <div>
                      <Box display="Flex" flexDirection="row" p={1} m={1}>
                        <Box width="50%">
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
                        </Box>
                        <Box width="40%" height="20%">
                          {showResults ? (
                            <GraphInterface
                              results={results}
                              questionId={question.id}
                              typeQuest={question.type}
                              quest={question.quest}
                            />
                          ) : (
                            <></>
                          )}
                        </Box>
                      </Box>
                    </div>
                  ),
              )}
          </div>
        </div>
      ) : (
        <ChatInterface
          talkerChat={false}
          connection={null}
          groupId={groupId}
          likedQuestions={likedQuestions}
          changeLikedQuestions={() => {
            return null;
          }}
          username={'Admin'}
          changeUserName={() => {
            return null;
          }}
          isChatActive={false}
        />
      )}
    </React.Fragment>
  );
};

export default SessionInterface;
