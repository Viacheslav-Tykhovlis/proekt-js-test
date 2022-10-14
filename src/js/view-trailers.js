import PopFilmsAPI from './fetch/fetch-trailer';

const filmSerchAPI = new PopFilmsAPI();

let btnTrailer;
let posterFilm;

const cardModal = document.querySelector('.modal_info');
const backdropTrailer = document.querySelector('.backdrop-trailer');
const modalFilm = document.querySelector('.modal-film-js');
const viewTrailer = document.querySelector('.trailer-modal-wrapper');

// виконується при кліку на кнопку трейлера
function clickBtnTrailer(evt) {
  backdropTrailer.classList.remove('is-hidden');
  document.addEventListener('keydown', eventKeydown, { capture: true });
  modalFilm.classList.add('modal-box-detale-trailler');
  backdropTrailer.addEventListener('click', backdrop, { capture: true });

  openTrailer(evt.target.dataset.id);
}

function closeModal() {
  backdropTrailer.classList.add('is-hidden');
  document.removeEventListener('keydown', eventKeydown);
  viewTrailer.innerHTML = '';
  modalFilm.classList.remove('modal-box-detale-trailler');
}

// вішає слухача на модалку для запуску трейлера
function addListenerTrailer() {
  btnTrailer = document.querySelector('.trailer__play-btn');
  posterFilm = document.querySelector('.modal__image');
  btnTrailer.addEventListener('click', clickBtnTrailer);
}

// знімає слухача трейлера
function removeListenerTrailer() {
  btnTrailer.removeEventListener('click', clickBtnTrailer);
}

function eventKeydown(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

function backdrop(evt) {
  if (evt.currentTarget === evt.target) {
    closeModal();
  }
}

function openTrailer(id) {
  filmSerchAPI
    .fetchTrailer(id)
    .then(data => {
      console.log(data.results);
      const trailer = data.results.find(film => film.type === 'Trailer');
      console.log(trailer);
      //   console.log(data.results[0].key);
      const key = trailer.key;
      const trailerYouTube = `<iframe style="width: 100%; height: 100%;" data-id="${id}" src="https://www.youtube.com/embed/${key}?autoplay=1" loading = "lazy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>Your browser does not support inline frames!</iframe>`;
      return (viewTrailer.innerHTML = trailerYouTube);
    })
    .catch(error => {
      viewTrailer.innerHTML = `<iframe style="width: 100%; height: 100%;" src="https://www.youtube.com/embed/GY8PkikQ8ZE" loading = "lazy" title="Error 404 not found - The Requested URL was Not Found on This Server" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>Your browser does not support inline frames!</iframe>`;
    });
}

export { addListenerTrailer, removeListenerTrailer };

// =============================

// import refs from './refs';
// import { findTrailer } from './services/movies-api';

// refs.cardMoveDetail.addEventListener('click', openModal);

// function openModal(e) {
//   if (e.target.id === 'trailerOpen') {
//     refs.trailer.classList.remove('is-hidden');
//     refs.bodyScroll.classList.add('is-openn');
//     document.addEventListener('keydown', eventKeydown);
//     refs.cardMoveDetail.classList.add('modal-box-detale-trailler');
//     refs.trailer.addEventListener('click', backdrop);

//     openTrailer(e.target.dataset.id);
//   }
// }

// function closeModal() {
//   refs.trailer.classList.add('is-hidden');
//   refs.bodyScroll.classList.remove('is-openn');
//   document.removeEventListener('keydown', eventKeydown);
//   refs.trailerWrap.innerHTML = '';
//   refs.cardMoveDetail.classList.remove('modal-box-detale-trailler');
// }

// function eventKeydown(event) {
//   if (event.code === 'Escape') {
//     closeModal();
//   }
// }

// function backdrop(evt) {
//   if (evt.currentTarget === evt.target) {
//     closeModal();
//   }
// }

// function openTrailer(id) {
//   findTrailer(id)
//     .then(data => {
//       const key = data.results[0].key;
//       const trailerYouTube = `<iframe style="width: 100%; height: 100%;" data-id="${id}" src="https://www.youtube.com/embed/${key}?autoplay=1" loading = "lazy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>Your browser does not support inline frames!</iframe>`;
//       return (refs.trailerWrap.innerHTML = trailerYouTube);
//     })
//     .catch(error => {
//       refs.trailerWrap.innerHTML = `<iframe style="width: 100%; height: 100%;" src="https://www.youtube.com/embed/GY8PkikQ8ZE" loading = "lazy" title="Error 404 not found - The Requested URL was Not Found on This Server" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>Your browser does not support inline frames!</iframe>`;
//     });
// }
