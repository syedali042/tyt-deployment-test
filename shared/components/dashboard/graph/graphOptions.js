export const graphOptions = {
  responsive: true,
  maintainAspectRatio: false,
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
        color: 'rgba(119, 119, 142, 0.08)',
      },
      ticks: {
        fontColor: '#b0bac9',
        autoSkip: true,
      },
      scaleLabel: {
        display: false,
        labelString: 'Month',
        fontColor: 'transparent',
      },
    },
    y: {
      ticks: {
        min: 0,
        max: 1050,
        stepSize: 150,
        fontColor: '#b0bac9',
      },
      display: true,
      grid: {
        display: true,
        drawBorder: false,
        zeroLineColor: 'rgba(142, 156, 173,0.1)',
        color: 'rgba(142, 156, 173,0.1)',
      },
      scaleLabel: {
        display: false,
        labelString: 'sales',
        fontColor: 'transparent',
      },
    },
  },
  title: {
    display: false,
    text: 'Normal Legend',
  },
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
