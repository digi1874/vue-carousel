<template>
  <div id="app">
    <header>
      <h3>一个依赖 animate.css v4 和 vue v2 的轮播组件</h3>
      <Github />
    </header>
    <hr>
    <p>对IE支持：IE10+</p>
    <hr>
    <Install />
    <hr>
    <Example />
    <hr>
    <Params />
    <hr>
    <footer>
      <Github />
      <p>created © 2020</p>
    </footer>
  </div>
</template>

<script>
import Github from './pages/github'
import Install from './pages/install'
import Example from './pages/example'
import Params from './pages/params'

export default {
  components: {
    Github,
    Install,
    Example,
    Params
  },
  name: 'App',
  mounted () {
    window.hljs.configure({ languages: ['html', 'bash', 'javascript'] })
    window.hljs.initHighlightingOnLoad()
  }
}
</script>

<style lang="less">
*, :after, :before {
  box-sizing: border-box;
}

html {
  line-height: 1.5;
  font-size: 16px;
  color: #333;
  background-color: #cfcfc7;
}

a[href^="#"] {
  color: #333;
}

hr {
  margin: 20px 0;
}

th {
  white-space: nowrap;
  background-color: rgba(0,0,0,.1);
}

th,
td {
  padding: 5px 10px;
  border-right: 1px solid rgba(0,0,0,.1);
  border-bottom: 1px solid rgba(0,0,0,.1);
}

tr:nth-child(even) {
  background-color: rgba(0,0,0,.05);
}

table {
  border-top: 1px solid rgba(0,0,0,.1);
  border-left: 1px solid rgba(0,0,0,.1);
  border-radius: 4px;
  background-color: rgba(0,0,0,.1);
}

#app {
  max-width: 1200px;
  margin: 20px auto;
}

pre {
  position: relative;
}

.hljs {
  font-family: Consolas,Monaco,Andale Mono,Ubuntu Mono,monospace;
  border-radius: 4px;
  padding: 15px 20px;
  &::after {
    position: absolute;
    top: 2px;
    right: 4px;
    font-size: 12px;
    color: #666;
  }

  &.html {
    &::after {
      content: 'html';
    }
  }

  &.bash {
    &::after {
      content: 'sh';
    }
  }

  &.javascript {
    &::after {
      content: 'js';
    }
  }

  &.vue {
    &::after {
      content: 'vue';
    }
  }
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

footer {
  text-align: center;
}
</style>
