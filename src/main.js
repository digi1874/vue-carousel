import Vue from 'vue'
import App from './App.vue'

// import Carousel from './components'
// 运行 “npm run package” 生成。
import Carousel from '../npm_package'
import '../npm_package/dist/carousel.css'

import 'animate.css/source/_vars.css'
import 'animate.css/source/_base.css'
import 'animate.css/source/fading_entrances/fadeIn.css'
import 'animate.css/source/fading_entrances/fadeInBottomLeft.css'
import 'animate.css/source/fading_entrances/fadeInBottomRight.css'
import 'animate.css/source/fading_entrances/fadeInDown.css'
import 'animate.css/source/fading_entrances/fadeInDownBig.css'
import 'animate.css/source/fading_entrances/fadeInLeft.css'
import 'animate.css/source/fading_entrances/fadeInLeftBig.css'
import 'animate.css/source/fading_entrances/fadeInRight.css'
import 'animate.css/source/fading_entrances/fadeInRightBig.css'
import 'animate.css/source/fading_entrances/fadeInTopLeft.css'
import 'animate.css/source/fading_entrances/fadeInTopRight.css'
import 'animate.css/source/fading_entrances/fadeInUp.css'
import 'animate.css/source/fading_entrances/fadeInUpBig.css'

import 'animate.css/source/fading_exits/fadeOut.css'
import 'animate.css/source/fading_exits/fadeOutBottomLeft.css'
import 'animate.css/source/fading_exits/fadeOutBottomRight.css'
import 'animate.css/source/fading_exits/fadeOutDown.css'
import 'animate.css/source/fading_exits/fadeOutDownBig.css'
import 'animate.css/source/fading_exits/fadeOutLeft.css'
import 'animate.css/source/fading_exits/fadeOutLeftBig.css'
import 'animate.css/source/fading_exits/fadeOutRight.css'
import 'animate.css/source/fading_exits/fadeOutRightBig.css'
import 'animate.css/source/fading_exits/fadeOutTopLeft.css'
import 'animate.css/source/fading_exits/fadeOutTopRight.css'
import 'animate.css/source/fading_exits/fadeOutUp.css'
import 'animate.css/source/fading_exits/fadeOutUpBig.css'

import 'animate.css/source/back_entrances/backInDown.css'
import 'animate.css/source/back_entrances/backInLeft.css'
import 'animate.css/source/back_entrances/backInRight.css'
import 'animate.css/source/back_entrances/backInUp.css'

import 'animate.css/source/back_exits/backOutDown.css'
import 'animate.css/source/back_exits/backOutLeft.css'
import 'animate.css/source/back_exits/backOutRight.css'
import 'animate.css/source/back_exits/backOutUp.css'

import 'animate.css/source/bouncing_entrances/bounceIn.css'
import 'animate.css/source/bouncing_entrances/bounceInDown.css'
import 'animate.css/source/bouncing_entrances/bounceInLeft.css'
import 'animate.css/source/bouncing_entrances/bounceInRight.css'
import 'animate.css/source/bouncing_entrances/bounceInUp.css'

import 'animate.css/source/bouncing_exits/bounceOut.css'
import 'animate.css/source/bouncing_exits/bounceOutDown.css'
import 'animate.css/source/bouncing_exits/bounceOutLeft.css'
import 'animate.css/source/bouncing_exits/bounceOutRight.css'
import 'animate.css/source/bouncing_exits/bounceOutUp.css'

import 'animate.css/source/flippers/flipInX.css'
import 'animate.css/source/flippers/flipInY.css'
import 'animate.css/source/flippers/flipOutX.css'
import 'animate.css/source/flippers/flipOutY.css'

import 'animate.css/source/lightspeed/lightSpeedInLeft.css'
import 'animate.css/source/lightspeed/lightSpeedInRight.css'
import 'animate.css/source/lightspeed/lightSpeedOutLeft.css'
import 'animate.css/source/lightspeed/lightSpeedOutRight.css'

import 'animate.css/source/rotating_entrances/rotateIn.css'
import 'animate.css/source/rotating_entrances/rotateInDownLeft.css'
import 'animate.css/source/rotating_entrances/rotateInDownRight.css'
import 'animate.css/source/rotating_entrances/rotateInUpLeft.css'
import 'animate.css/source/rotating_entrances/rotateInUpRight.css'

import 'animate.css/source/rotating_exits/rotateOut.css'
import 'animate.css/source/rotating_exits/rotateOutDownLeft.css'
import 'animate.css/source/rotating_exits/rotateOutDownRight.css'
import 'animate.css/source/rotating_exits/rotateOutUpLeft.css'
import 'animate.css/source/rotating_exits/rotateOutUpRight.css'

import 'animate.css/source/sliding_entrances/slideInDown.css'
import 'animate.css/source/sliding_entrances/slideInLeft.css'
import 'animate.css/source/sliding_entrances/slideInRight.css'
import 'animate.css/source/sliding_entrances/slideInUp.css'

import 'animate.css/source/sliding_exits/slideOutDown.css'
import 'animate.css/source/sliding_exits/slideOutLeft.css'
import 'animate.css/source/sliding_exits/slideOutRight.css'
import 'animate.css/source/sliding_exits/slideOutUp.css'

import 'animate.css/source/specials/rollIn.css'
import 'animate.css/source/specials/rollOut.css'

import 'animate.css/source/zooming_entrances/zoomIn.css'
import 'animate.css/source/zooming_entrances/zoomInDown.css'
import 'animate.css/source/zooming_entrances/zoomInLeft.css'
import 'animate.css/source/zooming_entrances/zoomInRight.css'
import 'animate.css/source/zooming_entrances/zoomInUp.css'

import 'animate.css/source/zooming_exits/zoomOut.css'
import 'animate.css/source/zooming_exits/zoomOutDown.css'
import 'animate.css/source/zooming_exits/zoomOutLeft.css'
import 'animate.css/source/zooming_exits/zoomOutRight.css'
import 'animate.css/source/zooming_exits/zoomOutUp.css'

Vue.config.productionTip = false

Vue.use(Carousel)

new Vue({
  render: (h) => h(App)
}).$mount('#app')
