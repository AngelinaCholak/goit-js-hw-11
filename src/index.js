import axios from 'axios';
import notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '39381155-05fe4f33c27a39bf4e8d5348c';

const queryParams = {
  key: API_KEY,
  q: '', // Початково пустий рядок
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
};

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search');
const loadMoreButton = document.querySelector('.load-more');
const searchButton = document.querySelector('.search-button');
let currentPage = 1;
let totalHits = 0;
let currentQuery = '';
const gallery = document.querySelector('.gallery');

function appendImagesToPage(images) {
  const markup = images
    .map(
      ({ webformatURL, tags, likes, views, comments, downloads }) =>
        `<div class="photo-card">
          <a href="${webformatURL}" data-lightbox="gallery" data-title="${tags}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item"><b>Likes:</b> ${likes}</p>
            <p class="info-item"><b>Views:</b> ${views}</p>
            <p class="info-item"><b>Comments:</b> ${comments}</p>
            <p class="info-item"><b>Downloads:</b> ${downloads}</p>
          </div>
        </div>`
    )
    .join('');

  gallery.innerHTML += markup;
}

async function performSearch(query) {
  try {
    searchButton.disabled = true;
    const response = await axios.get('https://pixabay.com/api/', {
      params: { ...queryParams, q: query, page: currentPage },
    });

    const images = response.data.hits;
    totalHits = response.data.totalHits;

    if (currentPage === 1) {
      clearGallery();
    }

    appendImagesToPage(images);

    if (currentPage * queryParams.per_page >= totalHits) {
      loadMoreButton.style.display = 'none';
      notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    } else {
      loadMoreButton.style.display = 'block';
    }

    const lightbox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionType: 'data',
    });

    // if (currentPage === 1) {
    //   notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    // }

    currentQuery = query;
  } catch (error) {
    console.error('Помилка запиту до API Pixabay:', error);
  } finally {
    searchButton.disabled = false;
  }
}

function clearGallery() {
  gallery.innerHTML = '';
}

function handleFormSubmit(event) {
  event.preventDefault();
  const searchQuery = searchInput.value.trim();

  if (searchQuery) {
    currentPage = 1;
    performSearch(searchQuery);
  }
}

searchForm.addEventListener('submit', handleFormSubmit);

searchButton.addEventListener('click', () => {
  const searchQuery = searchInput.value.trim();

  if (searchQuery) {
    currentPage = 1;
    performSearch(searchQuery);
  }
});

loadMoreButton.addEventListener('click', () => {
  currentPage++;
  performSearch(currentQuery);
});

performSearch(queryParams.q);
