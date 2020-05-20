import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  Legend,
  Title,
  BarSeries,
  ValueAxis,
  ArgumentAxis,
} from '@devexpress/dx-react-chart-material-ui';

interface IProps{
  results: [Object]
  quest:string
}

 const BarGraph: React.FC<IProps> = (props) => {
  const results =props.results;
  const quest = props.quest;

    return (
      <Paper>
        <Chart
          data={results}
        >
        <ArgumentAxis />
          <ValueAxis />
          <BarSeries
            valueField="count"
            argumentField="answer"
          />
          <Title text={quest} />

        </Chart>
      </Paper>
    );
  }

export default BarGraph;