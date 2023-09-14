import axios from 'axios';
import notiflix from 'notiflix';
import { queryMarkup } from './cat.js'; 

const API_KEY = '39381155-05fe4f33c27a39bf4e8d5348c';

// Параметри запиту
const queryParams = {
  key: API_KEY,
  q: 'пейзаж',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
};

console.log(queryParams);

axios
  .get('https://pixabay.com/api/', { params: queryParams })
  .then((response) => {
    const images = response.data.hits;
    queryMarkup(images); 

    if (images.length === 0) {
      notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  })
  .catch((error) => {
    console.error('Помилка запиту до API Pixabay:', error);
  });
