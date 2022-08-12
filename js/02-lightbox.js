import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryEl = document.querySelector('ul.gallery');
console.log('galleryEl => ', galleryEl);

// создаём в памяти список изображений полученый из галереи
const galleryList = galleryItems
  .map(
    ({ preview, original, description }) => `<div class="gallery__item" >
  <a href="${original}" class="gallery__link">
    <img
    class="gallery__image"
    src="${preview}"
    alt="${description}" 
    data-source="${original}"
    />
</a>
</div >`
  )
  .join('');

// вывод галереи на экран
galleryEl.insertAdjacentHTML('afterbegin', galleryList);
// функционал слайдера (всплытие description)
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 150,
});