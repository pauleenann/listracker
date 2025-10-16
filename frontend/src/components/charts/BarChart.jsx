import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { labels } from '../../data/barChartLabel';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export function BarChart() {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };
  
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Outstanding',
        data: [100,200,300,400,500,600,700],
        backgroundColor: '#3938EB',
      },
      {
        label: 'Collected',
        data: [150,250,350,450,550,650,750],
        backgroundColor: '#88ABE8',
      },
    ],
  };
  
  return (
    <div className="h-80">
      <Bar options={options} data={data} />
    </div>
  );
}
