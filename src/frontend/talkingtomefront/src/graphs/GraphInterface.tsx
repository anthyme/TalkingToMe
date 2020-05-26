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
  Grid,
  makeStyles,
} from '@material-ui/core'
import Radio from '@material-ui/core/Radio'
import TextGraph from './TextGraph'

interface IProps {
  results: any
  questionId: number
  typeQuest: string
  quest: string
}

const GraphInterface: React.FC<IProps> = (props) => {
  const [results, setResults] = useState(Object)
  const [showResults, setShowResults] = useState(false)
  const [value, setValue] = React.useState('Pie graph')

  const questionResults = props.results
  const questionId = props.questionId
  const typeQuest = props.typeQuest
  const quest = props.quest

  const useStyles = makeStyles(() => ({
    gridSpacing: {
      padding: '2%',
    },
  }))
  const classes = useStyles()

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
                <Grid container spacing={8} className={classes.gridSpacing}>
                  <Grid item xs={3}>
                    <FormControlLabel
                      value="Pie graph"
                      control={<Radio />}
                      label="Pie graph"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControlLabel
                      value="Bar graph"
                      control={<Radio />}
                      label="Bar graph"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
          ) : (
            <></>
          )}
          {showResults ? (
            value === 'Pie graph' ? (
              <PieGraph results={results} quest={quest} />
            ) : (
              <BarGraph results={results} quest={quest} />
            )
          ) : (
            <></>
          )}
        </div>
      )
    case 'Text':
      return <div>{showResults ? <TextGraph results={results} quest={quest}/> : <></>}</div>
    default:
      return <></>
  }
}

export default GraphInterface
