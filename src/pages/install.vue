<template>
  <div>
    <h1>安装</h1>
    <h3 id="CDN">
      <a href="#CDN">CDN</a>
    </h3>
    <ul>
      <li>
        <pre><code>{{ cndCode }}</code></pre>
      </li>
    </ul>

    <h3 id="NPM">
      <a href="#NPM">NPM</a>
    </h3>
    <ul>
      <li>
        <pre><code class="bash">$ npm install @digi1874/vue-carousel animate.css</code></pre>
      </li>
      <li>
        <h5>引入</h5>
        <pre><code class="javascript">{{ npmCode1 }}</code></pre>
    或
        <pre><code class="vue javascript">{{ npmCode2 }}</code></pre>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // Unterminated template
      cndCode: '<scr' + 'ipt src="https://cdn.jsdelivr.net/npm/@digi1874/vue-carousel@0.1.0/carousel.min.js"></sc' + `ript>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@digi1874/vue-carousel@0.1.0/carousel.min.css">`,
      npmCode1: `// main.js
import Carousel form '@digi1874/vue-carousel'
Vue.use(Carousel)

// page.vue
...
<d-carousel>...</d-carousel>
..`,
      npmCode2: `// page.vue
...
<Carousel>...</Carousel>
...
import { Carousel } form '@digi1874/vue-carousel'
export default {
  components: { Carousel }
}
...`
    }
  }
}
</script>
