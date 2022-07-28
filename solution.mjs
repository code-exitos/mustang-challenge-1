import axios from 'axios';

const baseUrl = 'http://api.nbp.pl/api/cenyzlota';

const currentDate = new Date().toISOString().slice(0, 10);

const fetchPrices = async () => {
  const result = await (await axios.get(baseUrl)).data;

 console.log(result)
};

fetchPrices();

console.log(currentDate)
