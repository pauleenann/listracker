import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { labels } from '../../data/donutChartLabel';

ChartJS.register(ArcElement, Tooltip, Legend);

export function DonutChart() {
  const data = {
    labels: labels,
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          '#010073',
          '#3938EB',
          '#88ABE8',
          '#7070FF',
          '#5151A8',
        ],
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'left',
        labels: {
          boxWidth: 20,
          padding: 10,
        },
      },
    },
  };

  return (
    <div className="flex w-full h-60">
      <div className="flex-1 h-full">
        <Doughnut 
        data={data} 
        options={options} />
      </div>
    </div>
  );
}
