export const generateMonthYearLabelsArray = ({startDate, endDate}) => {
  if (!endDate) {
    var start = new Date(startDate);
    var array = [];

    for (var i = 0; i < 12; i++) {
      array.push(
        start.toLocaleString('default', {month: 'short', year: 'numeric'})
      );
      start.setMonth(start.getMonth() + 1);
    }

    return array;
  } else {
    var start = new Date(startDate);
    var end = new Date(endDate);
    var array = [];

    // Skip the first month
    start.setMonth(start.getMonth() + 1);

    while (start <= end) {
      array.push(
        start.toLocaleString('default', {month: 'short', year: 'numeric'})
      );
      start.setMonth(start.getMonth() + 1);
    }

    return array;
  }
};

export const sumAmountsByMonth = (array) => {
  var resultArray = Array(12).fill(0);
  var startMonth = new Date(array[0]?.date).getMonth();

  array.forEach(function (obj) {
    var month = new Date(obj.date).getMonth();
    resultArray[(month - startMonth + 12) % 12] += obj.amount;
  });

  return resultArray;
};
