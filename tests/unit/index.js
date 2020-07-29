import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Carousel from '@/components'

describe('Carousel', () => {
  it('install', () => {
    Vue.use(Carousel)
    const wrapper = mount({
      template: '<d-carousel />'
    });
    expect(wrapper.find('.d-carousel').exists()).toBe(true)
    expect(wrapper.find('.d-carousel-inner').exists()).toBe(true)
    expect(wrapper.find('.d-carousel-indicators').exists()).toBe(true)
  })
})
