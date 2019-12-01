const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const WEEKDAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thrusday',
  'Friday',
  'Saturday',
];

export const getFormattedDateString = (dateStr) => {
  if (dateStr.includes('/')) {
    let temp = dateStr.split('/');

    dateStr = `20${temp[2]}-${temp[1]}-${temp[0]}`;
  }

  let date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    date = new Date(dateStr.split('/').join('-'));
  }

  let month = MONTH_NAMES[date.getMonth()];
  let weekday = WEEKDAY_NAMES[date.getDay()];
  let year = date.getFullYear();

  let day = date.getDate();

  if ([1, 21, 31].includes(day)) {
    day = `${day}st`;
  } else if (day === 2 || day === 22) {
    day = `${day}nd`;
  } else if (day === 3 || day === 23) {
    day = `${day}rd`;
  } else {
    day = `${day}th`;
  }

  // console.log(
  //   `month: ${date.getMonth()}, weekday = ${date.getDay()}, year = ${date.getFullYear()}, day = ${date.getDate()}`
  // );

  return `${weekday}, ${day} ${month} ${year}`;
};

export const getWinnerString = (winner, runs, wickets) => {
  if (runs > 0) {
    return `${winner} won by ${runs} runs`;
  } else if (wickets > 0) {
    return `${winner} won by ${wickets} wickets`;
  } else {
    return 'Match was tied';
  }
};

export const getLastPage = (total, perPage) => {
  return Math.ceil(total / perPage);
};
