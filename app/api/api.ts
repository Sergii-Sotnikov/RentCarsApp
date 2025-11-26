import axios from 'axios';

export const NextServer = axios.create({
  baseURL: 'https://car-rental-api.goit.global',
});



