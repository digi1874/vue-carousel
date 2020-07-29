<template>
  <div
    class="d-carousel"
    @mouseenter="stopAutoPlay"
    @mouseleave="startAutoPlay"
    @touchstart="touchstart"
    @touchend="touchend"
  >
    <div class="d-carousel-inner">
      <div
        v-for="(item, index) in listData"
        :key="index"
        class="item animated"
        :class="itemClasses[index]"
      >
        <slot :record="item" :index="index" />
      </div>
    </div>

    <div v-if="showIndicator" class="d-carousel-indicators">
      <div
        v-for="(item, index) in listData.length"
        class="item"
        :key="index"
        :class="{ active: index === activeIndex }"
        @click="activeIndex = index"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'd-carousel',
  props: {
    listData: {
      type: Array,
      default () {
        return []
      }
    },
    showIndicator: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    autoPlayTime: {
      type: Number,
      default: 2000
    },
    inAnimate: {
      type: String,
      default: 'fadeIn'
    },
    inAnimateOtherSide: {
      type: String,
      default: 'fadeIn'
    },
    outAnimate: {
      type: String,
      default: 'fadeOut'
    },
    outAnimateOtherSide: {
      type: String,
      default: 'fadeOut'
    },
    speed: {
      type: String,
      default: ''
    },
    waitingTime: {
      type: Number,
      default: 500
    }
  },
  data () {
    const itemClasses = this.listData.map(() => 'hide')
    itemClasses[0] = ''
    return {
      activeIndex: 0,
      isAutoPlay: this.autoPlay,
      playing: false,
      itemClasses
    }
  },
  watch: {
    listData () {
      this.startAutoPlay()
    },
    activeIndex (newVal, oldVal) {
      this.handleItemClasses(newVal, oldVal)
    },
    autoPlay () {
      this.startAutoPlay()
    }
  },
  mounted () {
    this.startAutoPlay()
    window.addEventListener('blur', this.stopAutoPlay)
    window.addEventListener('focus', this.startAutoPlay)
  },
  beforeDestroy () {
    window.removeEventListener('focus', this.startAutoPlay)
    window.removeEventListener('blur', this.stopAutoPlay)
  },
  methods: {
    stopAutoPlay () {
      this.isAutoPlay = false
      clearTimeout(this.autoPlayRun.timeout)
    },
    startAutoPlay () {
      this.isAutoPlay = this.autoPlay
      this.autoPlayRun()
    },
    autoPlayRun () {
      clearTimeout(this.autoPlayRun.timeout)

      if (!this.isAutoPlay || this.playing) {
        return
      }

      this.autoPlayRun.timeout = setTimeout(() => {
        this.isAutoPlay && this.next()
      }, this.autoPlayTime)
    },
    goIndex (index) {
      if (index < 0) {
        index = this.listData.length - 1
      } else if (index >= this.listData.length) {
        index = 0
      }
      this.activeIndex = index
    },
    prev () {
      !this.playing && this.goIndex(this.activeIndex - 1)
    },
    next () {
      !this.playing && this.goIndex(this.activeIndex + 1)
    },
    handleItemClasses (newIndex, oldIndex) {
      if (!this.listData.length || this.playing) return
      this.stopAutoPlay()
      this.playing = true

      const lastIndex = this.listData.length - 1
      let isOtherSideIn = newIndex < oldIndex || (newIndex === lastIndex && oldIndex === 0)
      if (newIndex === 0 && oldIndex === lastIndex) {
        isOtherSideIn = false
      }
      const itemClasses = []
      for (let i = 0; i < this.listData.length; i++) {
        if (i === newIndex) {
          itemClasses[i] = [isOtherSideIn ? this.inAnimateOtherSide : this.inAnimate, 'active']
        } else if (i === oldIndex) {
          itemClasses[i] = [isOtherSideIn ? this.outAnimateOtherSide : this.outAnimate]
        } else {
          itemClasses[i] = ['hide']
        }
        itemClasses[i].push(this.speed)
      }
      this.itemClasses = itemClasses
      if (this.waitingTime) {
        setTimeout(() => {
          this.playing = false
          this.startAutoPlay()
        }, this.waitingTime)
      } else {
        this.playing = false
        this.startAutoPlay()
      }
    },
    touchstart (e) {
      this.stopAutoPlay()
      this.touchstart.changedTouche = e.changedTouches[0]
    },
    touchend (e) {
      const moveX = this.touchstart.changedTouche.pageX - e.changedTouches[0].pageX
      const moveY = this.touchstart.changedTouche.pageY - e.changedTouches[0].pageY
      const move = Math.abs(moveY) > Math.abs(moveX) ? moveY : moveX
      move > 0 ? this.next() : this.prev()
    }
  }
}
</script>

<style lang="less">
.d-carousel {
  position: relative;
  z-index: 0;
  overflow: hidden;
  user-select: none;
  height: 100%;
}

.d-carousel-inner {
  position: relative;
  z-index: 1;
  overflow: hidden;
  margin: auto;
  height: 100%;

  & > .item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  & > .hide {
    z-index: -1;
    opacity: 0;
  }
  & > .active {
    z-index: 1;
  }
}

.d-carousel-indicators {
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: 10%;
  left: 0;
  margin: auto;
  text-align: center;

  & > .item {
    display: inline-block;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    background-color: rgba(0,0,0,.2);
    cursor: pointer;
    transition: background-color 0.5s ease;

    & + .item {
      margin-left: 10px;
    }

    &.active {
      background-color: #fff;
    }
  }
}
</style>
