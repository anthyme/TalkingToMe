import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { Chart, PieSeries } from '@devexpress/dx-react-chart-material-ui'
import PieGraph from './PieGraph'
import BarGraph from './BarGraph'
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core'
import Radio from '@material-ui/core/Radio'

interface IProps {
  results: any
  questionId: number
  typeQuest: string
}

const GraphInterface: React.FC<IProps> = (props) => {
  const [results, setResults] = useState(Object)
  const [showResults, setShowResults] = useState(false)
  const [value, setValue] = React.useState('Pie graph')

  const questionResults = props.results
  const questionId = props.questionId
  const typeQuest = props.typeQuest

  const handleChange = (event: any) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    console.log(questionResults)
    if (questionResults) {
      let answerList: any[] = []
      questionResults.forEach(
        (answer: { questionId: number; listAnswers: any }) => {
          console.log(answer)
          if (answer.questionId === questionId) {
            answer.listAnswers.forEach((answers: any) => {
              answerList = [...answerList, answers]
            })
          }
        },
      )
      console.log(answerList)
      setResults(answerList)
    }
  }, [])

  useEffect(() => {
    setShowResults(true)
  }, [results])
  switch (typeQuest) {
    case 'UCQ':
      return (
        <div>
          {showResults ? (
            <FormControl component="fieldset">
              <FormLabel component="legend">Chart type</FormLabel>
              <RadioGroup
                aria-label="Graph type"
                name="answerGraph"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Pie graph"
                  control={<Radio />}
                  label="Pie graph"
                />
                <FormControlLabel
                  value="Bar graph"
                  control={<Radio />}
                  label="Bar graph"
                />
              </RadioGroup>
            </FormControl>
          ) : (
            <></>
          )}
          {showResults ? (
            value === 'Pie graph' ? (
              <PieGraph results={results} />
            ) : (
              <BarGraph results={results} />
            )
          ) : (
            <></>
          )}
        </div>
      )
    case 'TEXT':
      return <div>Text answers not yet implemented</div>
    default:
      return <></>
  }
}

export default GraphInterface
