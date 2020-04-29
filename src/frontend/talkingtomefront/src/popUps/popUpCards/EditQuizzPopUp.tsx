import React, { useState, useEffect, ChangeEvent } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import QuizzEdit from '../../editQuizz/QuizzEdit'
import { useSelector, useDispatch } from 'react-redux'
import { InitialState } from '../../store/reducers/MainReducer'
import { RootDispatcher } from '../../store/MainDispatcher'
import { putQuizz } from '../../dataTransfers/Posts/DataQuizzPost'
import { getQuizzById } from '../../dataTransfers/Fetchs/DataQuizzFetch'
import { createQJson } from '../../dataTransfers/jsonCreators/CreateJson'
import { TextField, IconButton, Icon, Tooltip } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

interface IProps {
  quizz: any
  onClose: any
  open: boolean
}

interface StateProps {
  questionIdRdx: number
  questionRdx: Object
  changeRequestRdx: number
}

const EditQuizzPopUp: React.FC<IProps> = (props) => {
  const [id, setId] = useState(props.quizz.id)
  const [questionsID, setQuestionsId] = useState([0])
  const [questionsJson, setQuestionsJson] = useState([{}])
  const [quizzName, setQuizzName] = useState('')
  const [baseQuestions, setBaseQuestions] = useState([0])
  const quizzId = id
  const { questionIdRdx, questionRdx, changeRequestRdx } = useSelector<
    InitialState,
    StateProps
  >((state: InitialState) => {
    return {
      questionIdRdx: state.questionIdRdx,
      questionRdx: state.questionRdx,
      changeRequestRdx: state.changeRequestRdx,
    }
  })
  const dispatch = useDispatch()
  const rootDispatcher = new RootDispatcher(dispatch)

  const PutQuizz = async () => {
    await putQuizz(questionsJson, quizzId, quizzName)
    setQuestionsId([0])
    setQuizzName('')
    setQuestionsJson([{}])
    rootDispatcher.setChangeRequestRdx(changeRequestRdx + 1)
  }

  useEffect(() => {
    if (questionIdRdx !== -1) {
      let newQuestionJson = questionsJson
      newQuestionJson[questionIdRdx] = questionRdx
      setQuestionsJson(newQuestionJson)
    }
  }, [questionRdx])

  useEffect(() => {
    getQuizzById(quizzId).then((response) => {
      var count: number = 0
      setQuizzName(response.name)
      response.questions.forEach((element: any) => {
        if (count !== 0) {
          let newTable = [...questionsID, count]
          let newQuestionJson = questionsJson
          newQuestionJson.push({})
          newQuestionJson[count] = createQJson(element)
          setQuestionsId(newTable)
          setQuestionsJson(newQuestionJson)
          var baseQTable = [...baseQuestions, element.id]
          setBaseQuestions(baseQTable)
          count++
        } else {
          let newQuestionJson = questionsJson
          newQuestionJson[count] = createQJson(element)
          setQuestionsJson(newQuestionJson)
          setQuestionsId([0])
          setBaseQuestions([element.id])
          count++
        }
      })
      console.log(questionsJson)
    })
  }, [])

  const AddNewQuestion = () => {
    let newQuestionId = questionsID[questionsID.length - 1] + 1
    let newTable = [...questionsID, newQuestionId]
    setQuestionsId(newTable)
    rootDispatcher.setQuestionIdRdx(newQuestionId)
  }

  const handleClose = () => {
    props.onClose()
    rootDispatcher.setAnswerIdRdx(-1)
    rootDispatcher.setQuestionIdRdx(-1)
  }

  const onSubmitEdit = () => {
    PutQuizz()
    props.onClose()
  }

  const handleQuestionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuizzName(event.target.value)
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editing Quizz</DialogTitle>
        <TextField
          required
          label="Quizz Name"
          value={quizzName}
          autoComplete="fname"
          className="quizzName"
          onChange={handleQuestionChange}
        />
        <DialogContent>
          <>
            <QuizzEdit
              questionsID={questionsID}
              questionsJson={questionsJson}
            />
          </>
        </DialogContent>
        <DialogActions>
          <Tooltip title={'add Question'} placement="left">
            <IconButton aria-label="delete" className="deleteButton" onClick={AddNewQuestion}>
              <AddCircleOutlineIcon style={{ color: green[500] }}>
                add_circle
              </AddCircleOutlineIcon>
            </IconButton>
          </Tooltip>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmitEdit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default EditQuizzPopUp
