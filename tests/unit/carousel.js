import { mount } from '@vue/test-utils'
import Carousel from '@/components/Carousel.vue'
import { setTimeout } from 'core-js'

describe('Carousel.vue', () => {
  it('renders props.listData when passed', done => {
    const listData = ['a', 'b']
    const wrapper = mount(Carousel, {
      propsData: { listData },
      scopedSlots: {
        default: `
          <template slot-scope="{ record, index }">
            <div :id="'slot-' + index">
              {{ record }}
            </div>
          </template>
        `
      }
    })
    listData.forEach((value, index) => {
      expect(wrapper.find('#slot-' + index).text()).toMatch(value)
    })

    listData[2] = 'c'
    wrapper.setProps({ listData: [ ...listData ] })
    // wrapper.vm.listData = [ ...listData ]
    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('#slot-2').text()).toMatch(listData[2])
      wrapper.destroy()
      done()
    })
  })

  it('renders props.showIndicator when passed', () => {
    const wrapper = mount(Carousel, {
      propsData: { showIndicator: false }
    })
    expect(wrapper.find('.d-carousel-indicators').exists()).toBe(false)
  })

  it('renders props.autoPlay when passed', () => {
    const wrapper = mount(Carousel, {
      propsData: { autoPlay: false }
    })
    expect(wrapper.props().autoPlay).toBe(false)
  })

  it('renders props.autoPlayTime when passed', () => {
    const wrapper = mount(Carousel, {
      propsData: { autoPlayTime: 1500 }
    })
    expect(wrapper.props().autoPlayTime).toBe(1500)
  })

  it('renders props.inAnimate when passed', () => {
    const wrapper = mount(Carousel, {
      propsData: { inAnimate: 'fadeInRight' }
    })
    expect(wrapper.props().inAnimate).toBe('fadeInRight')
  })

  it('renders props.inAnimateOtherSide when passed', () => {
    const wrapper = mount(Carousel, {
      propsData: { inAnimateOtherSide: 'fadeInRight' }
    })
    expect(wrapper.props().inAnimateOtherSide).toBe('fadeInRight')
  })

  it('renders props.outAnimate when passed', () => {
    const wrapper = mount(Carousel, {
      propsData: { outAnimate: 'fadeInRight' }
    })
    expect(wrapper.props().outAnimate).toBe('fadeInRight')
  })

  it('renders props.outAnimateOtherSide when passed', () => {
    const wrapper = mount(Carousel, {
      propsData: { outAnimateOtherSide: 'fadeInRight' }
    })
    expect(wrapper.props().outAnimateOtherSide).toBe('fadeInRight')
  })

  it('renders props.speed when passed', done => {
    const wrapper = mount(Carousel, {
      propsData: { speed: 'faster', listData: [1, 2], autoPlay: false }
    })
    expect(wrapper.props().speed).toBe('faster')
    wrapper.vm.goIndex(1)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.animated').at(1).classes('faster')).toBe(true)
      done()
    })
  })

  it('can play automatically', done => {
    const wrapper = mount(Carousel, {
      propsData: {
        listData: [1, 2],
        autoPlayTime: 100  // 设置低值，加快测试
      }
    })
    const item0 = wrapper.findAll('.animated').at(0)
    const item1 = wrapper.findAll('.animated').at(1)
    expect(item0.classes('hide')).toBe(false)
    expect(item1.classes('hide')).toBe(true)

    setTimeout(() => {
      // 自动播放
      expect(item0.classes('fadeOut')).toBe(true)
      expect(item1.classes('fadeIn')).toBe(true)

      setTimeout(() => {
        // 自动播放
        expect(item0.classes('fadeIn')).toBe(true)
        expect(item1.classes('fadeOut')).toBe(true)

        // 取消自动播放
        wrapper.setProps({ autoPlay: false })
        setTimeout(() => {
          // 播放已停止
          expect(item0.classes('fadeIn')).toBe(true)
          expect(item1.classes('fadeOut')).toBe(true)

          // 恢复自动播放
          wrapper.setProps({ autoPlay: true })
          setTimeout(() => {
            // 自动播放已恢复
            expect(item0.classes('fadeOut')).toBe(true)
            expect(item1.classes('fadeIn')).toBe(true)
            done()
          }, 610)
        }, 610)
      }, 610)
    }, 610) // 500（动画时间） + 100（autoPlayTime）
  })

  it('mouseenter and mouseleave', done => {
    const wrapper = mount(Carousel, {
      propsData: { listData: [1, 2], autoPlayTime: 100, waitingTime: 0 }
    })
    const item0 = wrapper.findAll('.animated').at(0)
    const item1 = wrapper.findAll('.animated').at(1)
    expect(item0.classes('hide')).toBe(false)
    expect(item1.classes('hide')).toBe(true)

    // 鼠标移动进来，会触发停止自动播放
    wrapper.trigger('mouseenter')

    setTimeout(() => {
      // 播放已停止
      expect(item0.classes('fadeOut')).toBe(false)
      expect(item1.classes('fadeIn')).toBe(false)

      // 鼠标移动出去，会触发恢复自动播放
      wrapper.trigger('mouseleave')
      setTimeout(() => {
        // 自动播放已恢复
        expect(item0.classes('fadeOut')).toBe(true)
        expect(item1.classes('fadeIn')).toBe(true)
        done()
      }, 101)
    }, 101)
  })

  it('touch', done => {
    const inAnimate = 'fadeInRight'
    const outAnimate = 'fadeOutRight'
    const wrapper = mount(Carousel, {
      propsData: { listData: [1, 2, 3], autoPlayTime: 100, inAnimate, outAnimate, waitingTime: 1 }
    })
    const item0 = wrapper.findAll('.animated').at(0)
    const item1 = wrapper.findAll('.animated').at(1)
    const item2 = wrapper.findAll('.animated').at(2)
    expect(item0.classes('hide')).toBe(false)
    expect(item1.classes('hide')).toBe(true)
    expect(item2.classes('hide')).toBe(true)

    // 触摸移动开始，会触发停止自动播放
    wrapper.trigger('touchstart', { changedTouches: [{ pageX: 100, pageY: 100 }] })

    setTimeout(() => {
      // 播放已停止
      expect(item0.classes(outAnimate)).toBe(false)
      expect(item1.classes(inAnimate)).toBe(false)
      expect(item2.classes('hide')).toBe(true)

      // 触摸移动结束，向左运动
      wrapper.trigger('touchend', { changedTouches: [{ pageX: 1, pageY: 100 }] })
      wrapper.vm.$nextTick(() => {
        // 向左运动
        expect(item0.classes(outAnimate)).toBe(true)
        expect(item1.classes(inAnimate)).toBe(true)
        expect(item2.classes('hide')).toBe(true)

        setTimeout(() => {
          // 触摸移动，向左(上)运动
          wrapper.trigger('touchstart', { changedTouches: [{ pageX: 100, pageY: 100 }] })
          wrapper.trigger('touchend', { changedTouches: [{ pageX: 100, pageY: 1 }] })
          wrapper.vm.$nextTick(() => {
            expect(item0.classes('hide')).toBe(true)
            expect(item1.classes(outAnimate)).toBe(true)
            expect(item2.classes(inAnimate)).toBe(true)

            setTimeout(() => {
              // 触摸移动，向右运动
              wrapper.trigger('touchstart', { changedTouches: [{ pageX: 1, pageY: 100 }] })
              wrapper.trigger('touchend', { changedTouches: [{ pageX: 100, pageY: 100 }] })
              wrapper.vm.$nextTick(() => {
                expect(item0.classes('hide')).toBe(true)
                expect(item1.classes('fadeIn')).toBe(true)
                expect(item2.classes('fadeOut')).toBe(true)

                setTimeout(() => {
                  // 触摸移动，向右（下）运动
                  wrapper.trigger('touchstart', { changedTouches: [{ pageX: 100, pageY: 1 }] })
                  wrapper.trigger('touchend', { changedTouches: [{ pageX: 100, pageY: 100 }] })
                  wrapper.vm.$nextTick(() => {
                    expect(item0.classes('fadeIn')).toBe(true)
                    expect(item1.classes('fadeOut')).toBe(true)
                    expect(item2.classes('hide')).toBe(true)

                    setTimeout(() => {
                      // 自动播放已恢复
                      expect(item0.classes(outAnimate)).toBe(true)
                      expect(item1.classes(inAnimate)).toBe(true)
                      expect(item2.classes('hide')).toBe(true)
                      done()
                    }, 110)
                  })
                }, 10)
              })
            }, 10)
          })
        }, 10)
      })
    }, 10)
  })

  it('goIndex', done => {
    const wrapper = mount(Carousel, { propsData: { autoPlayTime: 100, waitingTime: 0 }})
    wrapper.vm.goIndex(-1)
    wrapper.vm.$nextTick(() => {
      wrapper.setProps({ listData: [1,1,1] })
      wrapper.vm.goIndex(0)
      wrapper.vm.$nextTick(() => {
        const item0 = wrapper.findAll('.animated').at(0)
        const item1 = wrapper.findAll('.animated').at(1)
        const item2 = wrapper.findAll('.animated').at(2)
        expect(item0.classes('fadeIn')).toBe(true)
        expect(item1.classes('hide')).toBe(true)
        expect(item2.classes('hide')).toBe(true)

        wrapper.vm.goIndex(2)
        wrapper.vm.$nextTick(() => {
          expect(item0.classes('fadeOut')).toBe(true)
          expect(item1.classes('hide')).toBe(true)
          expect(item2.classes('fadeIn')).toBe(true)
          done()
        })
      })
    })
  })
})
