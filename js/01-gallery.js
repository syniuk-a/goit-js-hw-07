import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log('galleryItems => ', galleryItems);

// Находим блок галерею
const galleryEl = document.querySelector('div.gallery');
// console.log('galleryEl => ', galleryEl);

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
// слушатель клик на галерею
galleryEl.addEventListener('click', replacementLinkImg);
// функция замены preview на original
function replacementLinkImg(event) {
  //блокируем действие браузера по умолчанию при клике, переход по ссылке не произойдет
  event.preventDefault();
  // если элемент на который click не содержит класс "gallery__image", то выходим из функции, а если есть то продолжаем выполнять основной код
  if (!event.target.classList.contains('gallery__image')) {
    return;
  };
  // записываем в константу ссылку на оригинальную картинку
  const currentImgUrl = event.target.dataset.source;
  // вызываем функцию открытия модального окна
  onOpenModal(currentImgUrl);
}

// функция открытия модального окна basicLightbox
function onOpenModal(currentImgUrl) {
  const createModal = basicLightbox.create(
    `<img class="image__modal" src="${currentImgUrl}"/>`
  );
  createModal.show();
  // включаем слушателя
  window.addEventListener('keydown', escCloseModal);
  // находим модалку
  const modal = document.querySelector('div.basicLightbox');
  // вешаем на нее слушателя кликов для отключения слушателя кликов и кнопок при закрытии по клику
  modal.addEventListener('click', removeClickModalListener);
};

function escCloseModal(event) {
  // находим модалку
  const modal = document.querySelector('div.basicLightbox');

  // console.log('code =>', event.code);
  // удаляем модалку
  if (event.code === 'Escape') {
    modal.remove();
    // отключаем слущатель
    window.removeEventListener('click', escCloseModal);

    // console.log('modal => ', modal);    
  };
};

// снимаем прослушиватель 
function removeClickModalListener() {
  window.removeEventListener('click', removeClickModalListener);
  window.removeEventListener('keydown', escCloseModal);
};
