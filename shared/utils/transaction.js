export const generateMonthYearLabelsArray = ({startDate, endDate}) => {
  if (!endDate) {
    let start = new Date(startDate);
    let array = [];

    for (let i = 0; i < 12; i++) {
      array.push(
        start.toLocaleString('default', {month: 'short', year: 'numeric'})
      );
      start.setMonth(start.getMonth() + 1);
    }

    return array;
  } else {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let array = [];

    // Skip the first month
    start.setMonth(start.getMonth());

    while (start <= end) {
      array.push(
        start.toLocaleString('default', {month: 'short', year: 'numeric'})
      );
      start.setMonth(start.getMonth() + 1);
    }

    return array;
  }
};

export const sumAmountsByMonth = (array, startDate) => {
  const resultArray = Array(12).fill(0);
  const startMonth = new Date(startDate).getMonth();

  array.forEach(function (obj) {
    const month = new Date(obj.date).getMonth();
    resultArray[(month - startMonth + 12) % 12] += obj.amount;
  });

  return resultArray;
};

export const getMonthDifference = (startDate, endDate) => {
  endDate = new Date(endDate);
  startDate = new Date(startDate);
  return (
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear()) +
    1
  );
};
