'use client';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {ssr: false});

const TotalTipsAmountApexChart = () => {
  const series = [
    {
      data: [
        28, 56, 36, 32, 48, 54, 37, 58, 66, 53, 21, 24, 14, 45, 0, 32, 67, 49,
        52, 55, 46, 54, 130,
      ],
      color: '#ec82ef',
    },
  ];

  const options = {
    chart: {
      type: 'line',
      width: 100,
      height: 35,
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 3,
      curve: 'smooth',
    },
    tooltip: {
      enabled: false,
      marker: {
        show: false,
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        className="h-8 w-9 chart-dropshadow"
        options={options}
        series={series}
        type="line"
        height={70}
        width={'100%'}
      />
    </div>
  );
};
export default TotalTipsAmountApexChart;
