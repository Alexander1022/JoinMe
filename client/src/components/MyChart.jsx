import React from "react";
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';

function MyChart({ interests, dataSet })
{

    const rand = (min, max) => {
        return parseInt(Math.random() * (max - min + 1), 10) + min;
    }

    const getRandomColor = () => {
        var h = 152;
        var s = rand(0, 50);
        var l = rand(1, 70);
        return 'hsl(' + h + ',' + s + '%,' + l + '%)';
    }


    return (
        <Chart
            type='doughnut'
            data={{
                labels: interests,
                datasets: [
                    {
                        label: 'Interests',
                        data: dataSet,
                        backgroundColor: interests.map(i => getRandomColor())
                    },
                ],
            }}
        />
    )
}
export default MyChart;