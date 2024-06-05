import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChart = ({ report, timeFrame }) => {
    const data = {
        labels: report.map(product => product.productName),
        datasets: [
            {
                label: 'Total Income',
                data: report.map(product => product.totalIncome),
                backgroundColor: 'rgb(144, 238, 144)',
                borderColor: 'rgb(144, 238, 144)',
                borderWidth: 1.2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Total Income per Product - ${timeFrame}`,
            },
        },
    };

    return <div className="bar-chart-container"><Bar data={data} options={options} /></div>;
};

export default BarChart;
