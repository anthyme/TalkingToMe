import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  CssBaseline,
  AppBar,
  Toolbar,
  Dialog,
  Box,
} from '@material-ui/core'
import { loadTalkNQuizzes } from '../dataTransfers/Fetchs/DataTalkFetch'
import { loadQuizzContent } from '../dataTransfers/Fetchs/DataQuestionFetch'
import QuestionInterface from './questionsPreview/QuestionInterface'
import { useHistory } from 'react-router-dom'
import QRCode from 'qrcode.react'
import { CreateTalkHub } from '../signalR/CreateHub'
import { v4 as uuidv4 } from 'uuid'
import { InitialState } from '../store/reducers/MainReducer'
import { useSelector } from 'react-redux'
import { siteUrl, urlHub } from '../constants'
import {
  HubConnectionBuilder,
  HttpTransportType,
  HubConnection,
} from '@microsoft/signalr'
import GraphInterface from '../graphs/GraphInterface'
import { isEmpty } from 'lodash'
import { putTalk } from '../dataTransfers/Posts/DataTalkPost'

interface StateProps {
  userIdRdx: string
  tokenIdRdx: string
}

const TalkInterface = () => {
  const url = new URL(window.location.href)
  const [quizzId, setQuizzId] = useState('0')
  const [results, setResults] = useState(Object)
  const [showResults, setShowResults] = useState(false)
  const [listQuizzes, setListQuizzes] = useState([{}])
  const [talkName, setTalkName] = useState('')
  const [showQuestion, setShowQuestion] = useState(false)
  const [connection, setConnection] = useState<HubConnection>(CreateTalkHub())
  const [questionsData, setQuestionsData] = useState([{}])
  const [groupId, setGroupId] = useState(url.searchParams.get('groupId'))
  const [quizzRunning, setQuizzRunning] = useState(false)
  const [bigQR, setBigQR] = useState(false)

  const { userIdRdx, tokenIdRdx } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        userIdRdx: state.userIdRdx,
        tokenIdRdx: state.tokenIdRdx,
      }
    },
  )
  const qrString = `${siteUrl}TalkAnswer?talkId=${groupId}&ownerId=${userIdRdx}`

  const TalkId: string | null = url.searchParams.get('talkId')
  const history = useHistory()
  window.onbeforeunload = function(){
    connection?.stop();
 }
 const createHubConnection = async () => {
  //const connect = CreateTalkHub()
  try {
   // await connect.start()
    //Invoke method defined in server to add user to a specified group
  } catch (err) {
    console.log(err)
  }
 //await setConnection(connect)
  connection.start().then(()=>{
      connection.invoke('CreateTalkGroup', groupId, Number(TalkId))
    });
  console.log('CreateTalkGroup: ' + groupId)
}
  //Buttons
  const backToMenu = async () => {
    const json = [
      {
        url: 'NULL',
      },
    ]
    if (TalkId) {
      await putTalk('Talks/ChangeUrl/', json, parseInt(TalkId), tokenIdRdx)
    }
    history.push('/Menu')
    if (connection) {
      connection?.stop()
    }
  }

  if (connection) {
    connection.on('NewChannel', function (responseData: string) {
      console.log('The new channel is: ' + responseData)
    })
    connection.on('JoinedGroup', function (responseData: string) {
      console.log('A new User has joined the channel: ' + responseData)
    })
    connection.on('RequestCurrentQuizz', function (responseData: string) {
      connection.invoke('GetCurrentQuizz', groupId, quizzId)
    })
    connection.on('ShowResults', function (responseData: any) {
      setResults(responseData.listQuestions)
    })
  }

  //Data Fetching
  const onChangeQuizz = async (value: string) => {
    setQuizzId(value)
    setShowResults(false)
    const responseData = await loadQuizzContent(value, tokenIdRdx)
    responseData && showQuestions(responseData)
  }

  const loadInit = async () => {
    const responseData = await loadTalkNQuizzes(TalkId, tokenIdRdx)
    responseData && showInitialFetchedData(responseData)
  }

  //Data Showing
  const showInitialFetchedData = (data: any) => {
    setTalkName(data.talkName)
    for (let quizz of data.quizzes) {
      setListQuizzes((listQuizzes) => [...listQuizzes, quizz])
    }
  }

  const showQuestions = (data: any) => {
    setQuestionsData(data)
    setShowQuestion(true)
  }

  const startQuizz = () => {
    if (connection) {
      let quiz: any = listQuizzes.filter(
        (q: any) => q.id === parseInt(quizzId),
      )[0]
      connection.invoke('StartQuizz', groupId, quizzId, quiz.name)
      setQuizzRunning(true)
      setShowResults(false);
    }
  }

  const stopQuizz = async () => {
    if (connection) {
      await connection.invoke('StopQuizz', groupId, quizzId)
      connection.stop();
      setQuizzRunning(false)
    }
  }

  useEffect(() => {
    if (!isEmpty(results)) {
      setShowResults(true)
    }
  }, [results]) //Load only once at first build

  

  //UseEffects
  useEffect(() => {
    if (userIdRdx === '-1') {
      history.push('/')
    }
    setResults({})
    console.log(results)
    createHubConnection()
    loadInit()
  }, []) //Load only once at first build

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
  }))

  const classes = useStyles()

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
            End talk session
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
        <div className={classes.startNQr}>
          <div className={classes.selectNStart}>
            <Select
              labelId="label"
              id="select"
              value={quizzId}
              onChange={(e: any) => onChangeQuizz(e.target.value)}
              disabled={quizzRunning}
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
            {!quizzRunning ? (
              <Button
                variant="outlined"
                color="primary"
                onClick={startQuizz}
                className={classes.button}
                disabled={quizzId === '0'}
              >
                Start Quizz
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                onClick={stopQuizz}
                className={classes.button}
              >
                Stop Quizz
              </Button>
            )}
          </div>
          <div>
            <a
              href={`TalkAnswer?talkId=${groupId}&ownerId=${userIdRdx}&talkName=${talkName}`}
            >
              Link to a user page
            </a>
            <div className={classes.smallQR} onClick={() => setBigQR(true)}>
              <QRCode value={qrString} />
            </div>
            {bigQR && (
              <Dialog
                open={bigQR}
                onClose={() => setBigQR(false)}
                aria-labelledby="form-dialog-title"
              >
                <div className={classes.bigQR} onClick={() => setBigQR(false)}>
                  <QRCode value={qrString} size={512} />
                </div>
              </Dialog>
            )}
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
                              id: number
                              questionId: number
                              response: string
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
    </React.Fragment>
  )
}

export default TalkInterface
