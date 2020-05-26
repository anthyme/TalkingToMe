import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
  Legend,
  Title,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

interface IProps{
  results: [Object]
  quest: string
}

 const PieGraph: React.FC<IProps> = (props) => {
  const results =props.results;
  const quest = props.quest;

    return (
      <Paper>
        <Chart
          data={results}
        >
          <PieSeries
            valueField="count"
            argumentField="answer"
          />
          <Legend />
          <Title text={quest} />
        </Chart>
      </Paper>
    );
  }

export default PieGraph;