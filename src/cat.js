import { queryParams } from "./index.js";
const searchForm = document.querySelector('.search-form');
const search = document.querySelector('.search');
const loadMore = document.querySelector('.load-more');


export function queryMarkup(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(({ webformatURL, tags, likes, views, comments, downloads }) =>
      `<div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item"><b>Likes:</b> ${likes}</p>
          <p class="info-item"><b>Views:</b> ${views}</p>
          <p class="info-item"><b>Comments:</b> ${comments}</p>
          <p class="info-item"><b>Downloads:</b> ${downloads}</p>
        </div>
      </div>`
    )
    .join('');

    gallery.insertAdjacentHTML('beforeend', markup); 
    console.log(images);
}
