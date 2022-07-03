export function diffYMDHMS(date1: any, date2: any) {
  let years = date1.diff(date2, 'year');
  date2.add(years, 'years');

  let months = date1.diff(date2, 'months');
  date2.add(months, 'months');

  let days = date1.diff(date2, 'days');
  date2.add(days, 'days');

  let hours = date1.diff(date2, 'hours');
  date2.add(hours, 'hours');

  let minutes = date1.diff(date2, 'minutes');
  date2.add(minutes, 'minutes');

  //   let seconds = date1.diff(date2, 'seconds');

  return {days, hours, minutes};
}
