import moment from 'moment';

const arrivalTimeCompare = (arrivalTime) => {
  const arrival = moment(arrivalTime).utc();
  const allowedArrivalTime = moment('02:15 PM', 'hh:mm A').utc();
  const standardArrivalTime = moment('02:00 PM', 'hh:mm A').utc();

  const isLate = arrival.isSameOrAfter(allowedArrivalTime);
  const isEarly = arrival.isBefore(standardArrivalTime);

  const text = isLate ? 'late' : isEarly ? 'early' : 'on time';

  return text;
};

const departureTimeCompare = (departureTime) => {
  const arrival = moment(departureTime).utc();
  const allowedDepartureTime = moment('11:15 PM', 'hh:mm A').utc();
  const standardDepartureTime = moment('11:00 PM', 'hh:mm A').utc();

  const isLate = arrival.isSameOrAfter(allowedDepartureTime);
  const isEarly = arrival.isBefore(standardDepartureTime);

  const text = isLate ? 'late' : isEarly ? 'early' : 'on time';

  return text;
};

const calcTimeStayed = (minutesWorked) => {
  const hours = String(Math.floor(minutesWorked / 60)).padStart(2, 0),
    minutes = String(Math.round(minutesWorked % 60)).padStart(2, 0),
    hoursAndMinutes = `${hours}:${minutes}`;

  return hoursAndMinutes;
};

export { arrivalTimeCompare, departureTimeCompare, calcTimeStayed };
