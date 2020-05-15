import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  PieSeries,
} from '@devexpress/dx-react-chart-material-ui';

 const PieChartQuestion = ()=>{
  const data = [
    { country: 'Russia', area: 12 },
    { country: 'Canada', area: 7 },
    { country: 'USA', area: 7 },
    { country: 'China', area: 7 },
    { country: 'Brazil', area: 6 },
    { country: 'Australia', area: 5 },
    { country: 'India', area: 2 },
    { country: 'Others', area: 55 },
  ];

    return (
      <Paper>
        <Chart
          data={data}
        >
          <PieSeries
            valueField="area"
            argumentField="country"
          />
        </Chart>
      </Paper>
    );
  }

export default PieChartQuestion;