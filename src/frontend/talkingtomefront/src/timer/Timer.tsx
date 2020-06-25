import React, { useState, useEffect, ChangeEvent } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

interface IProps {
  connection: any
  groupId?: string | null
  quizzId: string | null
}

const Timer: React.FC<IProps> = (props) => {
  const [counter, setCounter] = useState(0)
  const [countDown, setCountDown] = useState(false)
  const [timerValue, setTimerValue] = useState(0)
  const connection = props.connection
  const groupId = props.groupId
  const quizzId = props.quizzId
  // Third Attempts
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000)
    if (countDown && counter === 0) {
      setCountDown(false)
      if (connection) {
        connection.invoke('StopQuizz', groupId, quizzId)
      }
    }
    return () => {
      timer && clearInterval(timer)
    }
  }, [counter])

  const changeCounter = () => {
    setCounter(timerValue)
    setCountDown(true)
  }

  const onValueChange = (event: any) => {
    setTimerValue(event.target.value)
  }

  return (
    <div className="Timer">
      <div>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          onChange={onValueChange}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={changeCounter}
          disabled={quizzId === '0'}
        >
          Start Quizz
        </Button>
      </div>
      <div>Countdown: {counter}</div>
    </div>
  )
}

export default Timer
