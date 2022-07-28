import axios from 'axios';

const baseUrl = 'http://api.nbp.pl/api/cenyzlota';

const currentDate = new Date();

const pricesLastFiveYears = [];

const fetchPricesByDates = async (startDate, endDate) => {
  console.log({startDate, endDate});
  const result = await (await axios.get(`${baseUrl}/${startDate}/${endDate}`)).data;

  pricesLastFiveYears.push(...result)
  console.log(pricesLastFiveYears)
};

// 1 year ago
let startDate = `${currentDate.getFullYear()-1}-${currentDate.toISOString().slice(6, 10)}`;
let endDate = currentDate.toISOString().slice(0, 10);
fetchPricesByDates(startDate, endDate);

// // 2 years ago
// startDate = `${+startDate - 1}-${currentDate.toISOString().slice(6, 10)}`;
// endDate = startDate;
// fetchPricesByDates(startDate, endDate);

// // 3 years ago
// startDate = `${+startDate - 1}-${currentDate.toISOString().slice(6, 10)}`;
// endDate = startDate;
// fetchPricesByDates(startDate, endDate);

// // 4 years ago
// startDate = `${+startDate - 1}-${currentDate.toISOString().slice(6, 10)}`;
// endDate = startDate;
// fetchPricesByDates(startDate, endDate);

// // 5 years ago
// startDate = `${+startDate - 1}-${currentDate.toISOString().slice(6, 10)}`;
// endDate = startDate;
// fetchPricesByDates(startDate, endDate);

console.log('final array: ', pricesLastFiveYears);
