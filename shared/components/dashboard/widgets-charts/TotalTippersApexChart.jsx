'use client';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {ssr: false});

const TotalTippersApexChart = () => {
  const series = [
    {
      type: 'column',
      data: [19, 14, 15, 16, 12, 13, 18],
      color: '#05c3fb',
    },
  ];

  const options = {
    chart: {
      type: 'column',
      sparkline: {
        enabled: true,
      },
      stacked: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        columnWidth: '6',
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [2],
    },

    tooltip: {
      enabled: false,
    },
    xaxis: {
      categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
    },
    grid: {
      show: false,
      position: 'front',

      padding: {
        top: 0,
        right: 4,
        bottom: 0,
        left: 4,
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
        height={50}
        width={'100%'}
      />
    </div>
  );
};

export default TotalTippersApexChart;
