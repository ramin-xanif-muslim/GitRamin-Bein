import moment from 'moment/min/moment-with-locales';
moment.locale('az');


var dateArray = []

export function getDaysBetweenDates(startDate, stopDate) {
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("LL"));
      currentDate = moment(currentDate).add(1, "days");
    }
    return dateArray;
}