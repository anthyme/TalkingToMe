import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import { withSearchValue } from '../enhancers/WithSearchValue'
import Answer from './Answer'
import QuizzCreator from './QuizzCreator'
import * as actions from '../store/ActionsTypes'
import _ from 'lodash'
import { CardActions } from '@material-ui/core'

//TODO - Keep changes upon revert, aka : Num of questions & content of each question
function QuizzQuestion(props) {
  const [answersId, setAnswersId] = useState([0, 1])
  const [value, setValue] = useState('')
  const [questionValue, setQuestionValue] = useState('')
  const [selectedValue, setSelectedValue] = React.useState('UCQ')
  const [show, setShow] = useState(true)
  const [answers, setAnswers] = useState(['', ''])

  const questionIdRdx = useSelector(state => state.questionId)
  const questionRdx = useSelector(state => state.question)
  const currentAnswerRdx = useSelector(state => state.currentAnswer)
  const currentAnswerIdRdx = useSelector(state => state.currentAnswerId)
  const dispatch = useDispatch()

  const debounceRedux = useCallback(_.debounce(setRedux, 1000), [])

  const questionJson = {
    "question": { questionValue },
    "type": { selectedValue },
    "answers": { answers },
    "rightAnswer": { value },
  }

  const ShowJson = () => {
    console.log(questionJson)
  }

  function setRedux(newJson) {
    dispatch({ type: actions.UPDATE_QUESTION_VALUE, payload: newJson })
  }

  const deleteQuestion = event => {
    //TODO - Change json to empty on quizzcreator
    setShow(false)
  }

  const handleQuestionTypeChange = event => {
    setSelectedValue(event.target.value)
  }

  const handleRadioChange = event => {
    setValue(event.target.value)
  }

  const handleQuestionChange = event => {
    setQuestionValue(event.target.value)
    console.log(value)
  }

  const addNewAnswer = () => {
    let newQuestionId = answersId[answersId.length - 1] + 1
    let newTable = [...answersId, newQuestionId]
    let newAnswersJson = ''
    let newAnswers = [...answers, newAnswersJson]
    setAnswersId(newTable)
    setAnswers(newAnswers)
  }

  useEffect(() => {
    if (props.questionId === questionIdRdx && currentAnswerRdx) {
      console.log('Hello!')
      console.log(questionRdx)
      let newAnswers = answers
      newAnswers[currentAnswerIdRdx] = currentAnswerRdx
      let newJson = questionJson
      setAnswers(newAnswers)
      debounceRedux(newJson)
    }
  }, [currentAnswerRdx, questionValue,value])

  if (show === true) {
    switch (selectedValue) {
      case 'UCQ':
        return (
          <React.Fragment>
            <Paper variant="outlined">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id={props.questionId}
                    name={questionValue}
                    label="Question"
                    fullWidth
                    autoComplete="fname"
                    onChange={handleQuestionChange}
                  />
                  <div>
                    <div>Question Type</div>
                    <Grid item xs={1}>
                      <RadioGroup
                        name="gender1"
                        value={selectedValue}
                        onChange={handleQuestionTypeChange}
                      >
                        <FormControlLabel
                          value="UCQ"
                          control={<Radio />}
                          label="UCQ"
                        />
                        <FormControlLabel
                          value="Text"
                          control={<Radio />}
                          label="Text"
                        />
                      </RadioGroup>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <p>Write all the possible answers and tick the correct one</p>
                  <RadioGroup
                    aria-label="quiz"
                    name="quiz"
                    value={value}
                    onChange={handleRadioChange}
                  >
                    <div>
                      {answersId.map(qId => (
                        <Answer answerId={qId} questionId={props.questionId} />
                      ))}
                    </div>
                  </RadioGroup>
                  <Button variant="outlined" onClick={addNewAnswer}>
                    Add Answer
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={deleteQuestion}
                  >
                    Delete Question
                  </Button>
                </Grid>
              </Grid>
              <Button variant="outlined" onClick={ShowJson}>
                Show Json
              </Button>
            </Paper>
          </React.Fragment>
        )
      case 'Text':
        return (
          <React.Fragment>
            <Paper variant="outlined">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id={props.questionId}
                    name={questionValue}
                    label="Question"
                    value=""
                    fullWidth
                    autoComplete="fname"
                    onChange={handleQuestionChange}
                  />
                  <div>
                    <TextField value="question Type :" />
                    <Grid item xs={1}>
                      <RadioGroup
                        name="gender1"
                        value={selectedValue}
                        onChange={handleQuestionTypeChange}
                      >
                        <FormControlLabel
                          value="UCQ"
                          control={<Radio />}
                          label="UCQ"
                        />
                        <FormControlLabel
                          value="Text"
                          control={<Radio />}
                          label="Text"
                        />
                      </RadioGroup>
                    </Grid>
                  </div>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={deleteQuestion}
                  >
                    Delete Question
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </React.Fragment>
        )
      default:
        return null
    }
  } else {
    return <></>
  }
}
export default QuizzQuestion // = withSearchValue(QuizzQuestion);
