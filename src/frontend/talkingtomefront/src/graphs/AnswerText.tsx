import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 3,
    border: 'solid',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    marginTop: 12,
    textAlign: 'center',
  },
  bigQuestion: {
    cursor: 'zoom-out',
  },
  smallQuestion: {
    cursor: 'zoom-in',
  },
})

interface IProps {
  answer: any
  question: string
}

const AnswerText: React.FC<IProps> = (props) => {
  const classes = useStyles()
  const answer = props.answer.answer
  const question = props.question
  const [bigQuestion, setBigQuestion] = useState(false)

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.smallQuestion}
          color="textSecondary"
          onClick={() => setBigQuestion(true)}
        >
          {answer}
        </Typography>
        {bigQuestion && (
          <Dialog
            open={bigQuestion}
            onClose={() => setBigQuestion(false)}
            aria-labelledby="form-dialog-title"
            fullWidth={true}
            maxWidth={'sm'}
            onClick={() => setBigQuestion(false)}
          >
            <DialogTitle id="max-width-dialog-title">{question}</DialogTitle>
            <div className={classes.bigQuestion}>
              <Typography className={classes.pos} color="textSecondary">
                {answer}
              </Typography>
            </div>
            <DialogActions>
              <Button onClick={() => setBigQuestion(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </CardContent>
    </Card>
  )
}
export default AnswerText
