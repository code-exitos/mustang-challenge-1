import axios from 'axios';

const baseUrl = 'http://api.nbp.pl/api/cenyzlota';
const investmentAvailable = 135000;
const currentDate = new Date();
let pricesLastFiveYears = [];

const fetchPricesByDates = async (startDate, endDate) => {
  const response = (await axios.get(`${baseUrl}/${startDate}/${endDate}`)).data;

  pricesLastFiveYears = [...response, ...pricesLastFiveYears];
};

const getPricesFor5Years = async () => {
  // 1 year ago
  let startDate = `${currentDate.getFullYear() - 1}-${currentDate
    .toISOString()
    .slice(5, 10)}`;
  let endDate = currentDate.toISOString().slice(0, 10);
  await fetchPricesByDates(startDate, endDate);

  // 2 years ago
  endDate = startDate;
  startDate = `${+startDate.slice(0, 4) - 1}-${currentDate
    .toISOString()
    .slice(5, 10)}`;
  await fetchPricesByDates(startDate, endDate);

  // 3 years ago
  endDate = startDate;
  startDate = `${+startDate.slice(0, 4) - 1}-${currentDate
    .toISOString()
    .slice(5, 10)}`;
  await fetchPricesByDates(startDate, endDate);

  // 4 years ago
  endDate = startDate;
  startDate = `${+startDate.slice(0, 4) - 1}-${currentDate
    .toISOString()
    .slice(5, 10)}`;
  await fetchPricesByDates(startDate, endDate);

  // 5 years ago
  endDate = startDate;
  startDate = `${+startDate.slice(0, 4) - 1}-${currentDate
    .toISOString()
    .slice(5, 10)}`;
  await fetchPricesByDates(startDate, endDate);
};

getPricesFor5Years().then((_result) => {
  let minPrice = { price: 100000000000, date: '0' };
  let maxPrice = { price: -10000000000, date: '0' };
  let margin = 0,
    profit = 0,
    goldBoughtInGrams;

  pricesLastFiveYears.forEach((item) => {
    const minPriceDate = new Date(minPrice.date.slice(0, 4));
    const maxPriceDate = new Date(maxPrice.date.slice(0, 4));

    if (item.cena < minPrice.price) {
      minPrice.price = item.cena;
      minPrice.date = item.data;
    }

    if (item.cena > maxPrice.price) {
      maxPrice.price = item.cena;
      maxPrice.date = item.data;

      const currentMargin = maxPrice.price - minPrice.price;

      if (currentMargin > margin && maxPriceDate > minPriceDate) {
        margin = maxPrice.price - minPrice.price;
        goldBoughtInGrams = investmentAvailable / minPrice.price;
        profit = (goldBoughtInGrams * maxPrice.price).toFixed(2);
      }
    }
  });

  const bestInvestment = {
    bestBuy: minPrice.date,
    bestSell: maxPrice.date,
    profit: `$${profit}`,
    margin: `$${margin}`,
  };

  console.log(JSON.stringify(bestInvestment));

  return JSON.stringify(bestInvestment);
});
