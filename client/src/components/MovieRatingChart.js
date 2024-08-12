import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './MovieRatingChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const centerText = {
  id: 'centerText',
  beforeDraw(chart, args, options) {
    const { ctx, chartArea } = chart;

    const centerX = (chartArea.left + chartArea.right) / 2;
    const centerY = (chartArea.top + chartArea.bottom) / 2;

    ctx.save();
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 16px Arial';

    ctx.fillText(options.text, centerX, centerY);
    ctx.restore();
  },
};

function MovieRatingChart() {
  const [chartData, setChartData] = useState(null);
  const [maxRatingCount, setMaxRatingCount] = useState('');
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    console.log('별점 데이터 가져오기');
    axios
      .get('http://localhost:3003/rating/getRatings/' + user.no)
      .then((res) => {
        console.log(res.data.ratings);
        const ratings = res.data.ratings;
        const ratingCounts = [0, 0, 0, 0, 0];

        ratings.forEach((rating) => {
          if (rating.rating_score >= 1 && rating.rating_score <= 5) {
            ratingCounts[rating.rating_score - 1] += 1;
          }
        });

        const maxRatingCount = Math.max(...ratingCounts);
        console.log(ratingCounts);
        const maxRatingIndex = ratingCounts.indexOf(maxRatingCount);
        setMaxRatingCount(maxRatingIndex + 1);

        const backgroundColors = ratingCounts.map((count, index) =>
          index === maxRatingIndex ? 'rgb(207, 76, 76)' : 'rgb(142, 142, 142)'
        );

        const data = {
          labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
          datasets: [
            {
              label: '# of Votes',
              data: ratingCounts,
              backgroundColor: backgroundColors,
              borderColor: backgroundColors.map((color) =>
                color.replace('0.2', '1')
              ),
              borderWidth: 1,
              cutout: '70%',
            },
          ],
        };

        setChartData(data);
      })
      .catch((error) => {
        console.error('Error fetching the ratings:', error);
      });
  }, []);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      centerText: {
        text: `${maxRatingCount}점`,
      },
    },
    interaction: {
      mode: null,
      intersect: false,
      events: [],
    },
  };

  return (
    <div className={styles.movieRatingChart_container}>
      {chartData ? (
        <Doughnut data={chartData} options={options} plugins={[centerText]} />
      ) : (
        'Loading...'
      )}
    </div>
  );
}

export default MovieRatingChart;
