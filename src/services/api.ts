import axios from 'axios';

export const fetchData = async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return console.log(response.data);
};
