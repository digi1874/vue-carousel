import Carousel from './Carousel.vue'

export function install (Vue) {
  Vue.component(Carousel.name, Carousel)
}

export { Carousel }

const carousel = {
  install,
  Carousel
}

export default carousel
