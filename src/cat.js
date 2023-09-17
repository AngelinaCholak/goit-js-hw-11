import { queryParams } from "./index.js";

// const searchForm = document.querySelector('.search-form');
// const search = document.querySelector('.search');

// export function queryMarkup(images) {
//   const gallery = document.querySelector('.gallery');
//   const markup = images
//     .map(({ webformatURL, tags, likes, views, comments, downloads }) =>
//       `<div class="photo-card">
//         <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//         <div class="info">
//           <p class="info-item"><b>Likes:</b> ${likes}</p>
//           <p class="info-item"><b>Views:</b> ${views}</p>
//           <p class="info-item"><b>Comments:</b> ${comments}</p>
//           <p class="info-item"><b>Downloads:</b> ${downloads}</p>
//         </div>
//       </div>`
//     )
//     .join('');

//     gallery.insertAdjacentHTML('beforeend', markup); 
//     console.log(images);
// }

// let currentPage = 1; 
// let totalHits = 0;
// const loadMoreButton = document.querySelector('.load-more');
// loadMoreButton.addEventListener('click', () => {
//     currentPage++;
//     performSearch(queryParams.q);
// });


// async function performSearch(query) {
//   try {
//     const response = await axios.get('https://pixabay.com/api/', {
//       params: { ...queryParams, page: currentPage },
//     });

//     const images = response.data.hits;
//     totalHits = response.data.totalHits;

//     if (currentPage === 1) {
//       clearGallery();
//     }

//     queryMarkup(images);

//     if (currentPage * queryParams.per_page >= totalHits) {
//       loadMoreButton.style.display = 'none';
//       notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
//     } else {
//       loadMoreButton.style.display = 'block';
//     }
//   } catch (error) {
//     console.error('Помилка запиту до API Pixabay:', error);
//   }
// }

// function clearGallery() {
//   const gallery = document.querySelector('.gallery');
//   gallery.innerHTML = '';
// }

// function handleFormSubmit(event) {
//   event.preventDefault();
//   const searchQuery = event.currentTarget.elements.searchQuery.value.trim();
//   if (searchQuery) {
//     currentPage = 1;
//     performSearch(searchQuery);
//   }
// }
// document.querySelector('.search-form').addEventListener('submit', handleFormSubmit);

// performSearch(queryParams.q);