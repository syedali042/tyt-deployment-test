'use client';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {ssr: false});

const AverageTipApexChart = () => {
  const series = [
    {
      data: [
        45, 23, 32, 67, 49, 72, 52, 55, 46, 54, 32, 74, 88, 36, 36, 32, 48, 54,
      ],
      color: '#F7B731',
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
export default AverageTipApexChart;
