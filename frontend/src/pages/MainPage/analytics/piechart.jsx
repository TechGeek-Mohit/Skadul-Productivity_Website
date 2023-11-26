import React from 'react';

import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


const PieChart = ({ numActiveTasks, numCompletedTasks }) => {
  const data = {
    labels: ['Incomplete Tasks', 'Completed Tasks'],
    datasets: [
      {
        data: [numActiveTasks, numCompletedTasks],
        backgroundColor: ['#36a2eb', '#ff6384'],
        hoverBackgroundColor: ['#36a2eb', '#ff6384'],
      },
    ],
  };

  return (
    <div>
      <h1>Productivity Statistics</h1>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
