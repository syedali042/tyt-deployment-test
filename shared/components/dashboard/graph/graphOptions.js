export const graphOptions = ({themeMode}) => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      colors: {
        forceOverride: true,
      },
      legend: {
        labels: {
          color: themeMode == 'light-mode' ? '#0C0D0E' : '#fff',
        },
      },
    },
    tooltips: {
      enabled: false,
    },
    legend: {
      display: false,
      labels: {
        usePointStyle: false,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          fontColor: themeMode == 'light-mode' ? '#0C0D0E' : '#fff',
          color: themeMode == 'light-mode' ? '#0C0D0E' : '#fff',
          autoSkip: true,
        },
        scaleLabel: {
          display: false,
          labelString: 'Month',
        },
      },
      y: {
        ticks: {
          min: 0,
          max: 1050,
          stepSize: 150,
          fontColor: themeMode == 'light-mode' ? '#0C0D0E' : '#fff',
          color: themeMode == 'light-mode' ? '#0C0D0E' : '#fff',
        },
        display: true,
        grid: {
          display: true,
          drawBorder: false,
          zeroLineColor: 'rgba(142, 156, 173,0.1)',
        },
        scaleLabel: {
          display: false,
          labelString: 'sales',
        },
      },
    },
    title: {
      display: false,
      text: 'Normal Legend',
    },
  };
};

export const labels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const data = [30, 20, 50, 40, 50, 100, 80, 70, 50, 60, 40, 20];
