import Swiper, { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

const slider = new Swiper('.header-slider', {
  loop: true,
  pagination: {
    el: '.slider-pagination',
    clickable: true,
  },
  modules: [Pagination],
});
