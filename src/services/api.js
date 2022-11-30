import axios from 'axios';
//Base da URL : https://api.themoviedb.org/3/
//https://api.themoviedb.org/3/movie/now_playing?api_key=d63a2fd538d6bdc3430cdf7ac9d4c628&language=pt-br
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});
export default api;
