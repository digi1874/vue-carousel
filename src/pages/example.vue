<template>
  <div>
    <h1>使用</h1>
    <div>
      <d-carousel
        ref="carousel"
        :auto-play="formData.autoPlay"
        :auto-playTime="formData.autoPlayTime*1"
        :list-data="formData.listData"
        :in-animate="formData.inAnimate"
        :in-animate-other-side="formData.inAnimateOtherSide"
        :out-animate="formData.outAnimate"
        :out-animate-other-side="formData.outAnimateOtherSide"
        :show-indicator="formData.showIndicator"
        :speed="formData.speed"
        :waiting-time="formData.waitingTime*1"
        :style="{height: '200px'}"
      >
        <template slot-scope="{ record, index }">
          <div :style="{background: index % 2 === 0 ? '#9B07EF' : '#071EEF'}" class="list-item">
            {{ record }}
          </div>
        </template>
      </d-carousel>

      <div class="control">
        <button @click="prev">上一个</button>
        <button style="margin-left:8px" @click="next">下一个</button>
      </div>
    </div>

    <div class="form">
      <div class="form-item">
        <label for="autoPlay">自动轮播</label>
        <input v-model="formData.autoPlay" type="checkbox" name="autoPlay" id="autoPlay">
      </div>
      <div class="form-item">
        <label for="showIndicator">显示小点</label>
        <input v-model="formData.showIndicator" type="checkbox" name="showIndicator" id="showIndicator">
      </div>
      <div class="form-item">
        <label for="inAnimate">入场动画</label>
        <select v-model="formData.inAnimate" name="inAnimate" id="inAnimate">
          <option v-for="(item, index) in inAnimates" :key="index" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="form-item">
        <label for="inAnimateOtherSide">另一边入场动画</label>
        <select v-model="formData.inAnimateOtherSide" name="inAnimateOtherSide" id="inAnimateOtherSide">
          <option v-for="(item, index) in inAnimates" :key="index" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="form-item">
        <label for="outAnimate">离场动画</label>
        <select v-model="formData.outAnimate" name="outAnimate" id="outAnimate">
          <option v-for="(item, index) in outAnimates" :key="index" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="form-item">
        <label for="outAnimateOtherSide">另一边离场动画</label>
        <select v-model="formData.outAnimateOtherSide" name="outAnimateOtherSide" id="outAnimateOtherSide">
          <option v-for="(item, index) in outAnimates" :key="index" :value="item">{{ item }}</option>
        </select>
      </div>
      <div class="form-item">
        <label for="autoPlayTime">自动轮播时间（毫秒）</label>
        <input v-model="formData.autoPlayTime" type="number" name="autoPlayTime" id="autoPlayTime">
      </div>
      <div class="form-item">
        <label for="waitingTime">等待时间</label>
        <input v-model="formData.waitingTime" type="number" name="waitingTime" id="waitingTime">
      </div>
      <div class="form-item">
        <label for="speed">速度</label>
        <select v-model="formData.speed" name="speed" id="speed">
          <option value="">-</option>
          <option v-for="(item, index) in speeds" :key="index" :value="item">{{ item }}</option>
        </select>
      </div>
    </div>

    <pre><code ref="code" class="vue html">{{ code }}</code></pre>
  </div>
</template>

<script>
const defaultFormData = {
  autoPlay: true,
  autoPlayTime: 2000,
  inAnimate: 'fadeIn',
  inAnimateOtherSide: 'fadeIn',
  listData: [1, 2, 3, 4],
  outAnimate: 'fadeOut',
  outAnimateOtherSide: 'fadeOut',
  showIndicator: true,
  speed: '',
  waitingTime: 500
}

const cssPath = name => {
  if (/^fadeIn/.test(name)) {
    return `fading_entrances/${name}`
  } else if (/^fadeOut/.test(name)) {
    return `fading_exits/${name}`
  } else if (/^backIn/.test(name)) {
    return `back_entrances/${name}`
  } else if (/^backIn/.test(name)) {
    return `back_exits/${name}`
  } else if (/^bounceIn/.test(name)) {
    return `bouncing_entrances/${name}`
  } else if (/^bounceOut/.test(name)) {
    return `bouncing_exits/${name}`
  } else if (/^flip/.test(name)) {
    return `flippers/${name}`
  } else if (/^light/.test(name)) {
    return `lightspeed/${name}`
  } else if (/^rotateIn/.test(name)) {
    return `rotating_entrances/${name}`
  } else if (/^rotateOut/.test(name)) {
    return `rotating_exits/${name}`
  } else if (/^slideIn/.test(name)) {
    return `sliding_entrances/${name}`
  } else if (/^slideOut/.test(name)) {
    return `sliding_exits/${name}`
  } else if (/^roll/.test(name)) {
    return `specials/${name}`
  } else if (/^zoomIn/.test(name)) {
    return `zooming_entrances/${name}`
  } else if (/^zoomOut/.test(name)) {
    return `zooming_exits/${name}`
  }
}

const createCode = formData => {
  return `<template>
  <div>
    <Carousel
      ref="carousel"
      :list-data="[${formData.listData}]"` +
      (formData.autoPlay === defaultFormData.autoPlay ? '' : `
      :auto-play="${formData.autoPlay}"`) +
      (formData.autoPlayTime * 1 === defaultFormData.autoPlayTime ? '' : `
      :auto-playTime="${formData.autoPlayTime}"`) +
      (formData.inAnimate === defaultFormData.inAnimate ? '' : `
      in-animate="${formData.inAnimate}"`) +
      (formData.inAnimateOtherSide === defaultFormData.inAnimateOtherSide ? '' : `
      in-animate-other-side="${formData.inAnimateOtherSide}"`) +
      (formData.outAnimate === defaultFormData.outAnimate ? '' : `
      out-animate="${formData.outAnimate}"`) +
      (formData.outAnimateOtherSide === defaultFormData.outAnimateOtherSide ? '' : `
      out-animate-other-side="${formData.outAnimateOtherSide}"`) +
      (formData.showIndicator === defaultFormData.showIndicator ? '' : `
      :show-indicator="${formData.showIndicator}"`) +
      (formData.speed === defaultFormData.speed ? '' : `
      speed="${formData.speed}"`) +
      (formData.waitingTime * 1 === defaultFormData.waitingTime ? '' : `
      :waiting-time="${formData.waitingTime}"`) + `
      :style="{height: '200px'}"
    >
      <template slot-scope="{ record, index }">
        <div :style="{background: index % 2 === 0 ? '#9B07EF' : '#071EEF'}" class="list-item">
          {{ index }}
        </div>
      </template>
    </Carousel>
    <div class="control">
      <button @click="prev">上一个</button>
      <button style="margin-left:8px" @click="next">下一个</button>
    </div>
  </div>
</template>

<sc` + `ript>
import { Carousel } from '@digi1874/vue-carousel'
import 'animate.css/source/_vars.css'
import 'animate.css/source/_base.css'
import 'animate.css/source/${cssPath(formData.inAnimate)}.css'` +
(formData.inAnimate === formData.inAnimateOtherSide ? '' : `
import 'animate.css/source/${cssPath(formData.inAnimateOtherSide)}'`) + `
import 'animate.css/source/${cssPath(formData.outAnimate)}.css'` +
(formData.outAnimate === formData.outAnimateOtherSide ? '' : `
import 'animate.css/source/${cssPath(formData.outAnimateOtherSide)}'`) + `
import '@digi1874/vue-carousel/dist/carousel.css'

export default {
  components: { Carousel }
  methods: {
    prev () {
      this.$refs.carousel.prev()
    },
    next () {
      this.$refs.carousel.next()
    }
  }
}
</scr` + `ipt>

<style>
.list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>`
}

export default {
  data () {
    return {
      formData: { ...defaultFormData },
      inAnimates: [
        'fadeIn',
        'fadeInBottomLeft',
        'fadeInBottomRight',
        'fadeInDown',
        'fadeInDownBig',
        'fadeInLeft',
        'fadeInLeftBig',
        'fadeInRight',
        'fadeInRightBig',
        'fadeInTopLeft',
        'fadeInTopRight',
        'fadeInUp',
        'fadeInUpBig',
        'backInDown',
        'backInLeft',
        'backInRight',
        'backInUp',
        'bounceIn',
        'bounceInDown',
        'bounceInLeft',
        'bounceInRight',
        'bounceInUp',
        'flipInX',
        'flipInY',
        'lightSpeedInLeft',
        'lightSpeedInRight',
        'rotateIn',
        'rotateInDownLeft',
        'rotateInDownRight',
        'rotateInUpLeft',
        'rotateInUpRight',
        'slideInDown',
        'slideInLeft',
        'slideInRight',
        'slideInUp',
        'rollIn',
        'zoomIn',
        'zoomInDown',
        'zoomInLeft',
        'zoomInRight',
        'zoomInUp'
      ],
      outAnimates: [
        'fadeOut',
        'fadeOutBottomLeft',
        'fadeOutBottomRight',
        'fadeOutDown',
        'fadeOutDownBig',
        'fadeOutLeft',
        'fadeOutLeftBig',
        'fadeOutRight',
        'fadeOutRightBig',
        'fadeOutTopLeft',
        'fadeOutTopRight',
        'fadeOutUp',
        'fadeOutUpBig',
        'backOutDown',
        'backOutLeft',
        'backOutRight',
        'backOutUp',
        'bounceOut',
        'bounceOutDown',
        'bounceOutLeft',
        'bounceOutRight',
        'bounceOutUp',
        'flipOutX',
        'flipOutY',
        'lightSpeedOutLeft',
        'lightSpeedOutRight',
        'rotateOut',
        'rotateOutDownLeft',
        'rotateOutDownRight',
        'rotateOutUpLeft',
        'rotateOutUpRight',
        'slideOutDown',
        'slideOutLeft',
        'slideOutRight',
        'slideOutUp',
        'rollOut',
        'zoomOut',
        'zoomOutDown',
        'zoomOutLeft',
        'zoomOutRight',
        'zoomOutUp'
      ],
      speeds: ['faster', 'fast', 'slow', 'slower']
    }
  },
  computed: {
    code () {
      return createCode(this.formData)
    }
  },
  watch: {
    code () {
      this.$refs.code.textContent = this.code
      window.hljs.highlightBlock(this.$refs.code)
    }
  },
  methods: {
    prev () {
      this.$refs.carousel.prev()
    },
    next () {
      this.$refs.carousel.next()
    }
  }
}
</script>

<style lang="less" scoped>
.list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.control {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.form {
  display: flex;
  flex-wrap: wrap;
}

.form-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  min-width: 50%;

  label {
    margin-right: 10px;
    width: 180px;
    text-align: right;
    &::after {
      content: ' :';
    }
  }

  input[type="number"],
  select {
    width: 165px;
    border: 1px solid #e8e8e8;
    border-radius: 3px;
    padding: 5px 10px;
    outline: none;
  }
}
</style>
