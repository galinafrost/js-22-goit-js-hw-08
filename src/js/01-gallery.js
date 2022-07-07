// Add imports above this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryEl = document.querySelector('.gallery')
const imgEl = generyImfEl()

function generyImfEl() {
    const img = galleryItems.map((el) => {
        return `<div class="gallery__item">
  <a class="gallery__item" href="${el.original}">
  <img class="gallery__image" src="${el.preview}" alt="${el.description}" />
</a>
</div>`
    }).join('')

    galleryEl.insertAdjacentHTML('afterbegin', img)

}

let lightbox = new SimpleLightbox('.gallery a', {
    navText: ['<', '>'],
    captionDelay: 250,
    captionsData: 'alt',
    captionPosition: 'top',

})