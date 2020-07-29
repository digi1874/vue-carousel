<template>
  <div>
    <h1>参数</h1>
    <div class="params">
      <table cellpadding="0" cellspacing="0" style="width:100%">
        <thead>
          <tr>
            <th>属性</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认值</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in params" :key="index">
            <td>{{ item.attribute }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.defaultValue }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      <a href="https://github.com/animate-css/animate.css" target="_blank">animate.css</a>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      params: [
        {
          attribute: 'autoPlay',
          description: '自动轮播',
          type: 'boolean',
          defaultValue: true
        },
        {
          attribute: 'autoPlayTime',
          description: '自动轮播时间（毫秒）',
          type: 'number',
          defaultValue: 2000
        },
        {
          attribute: 'inAnimate',
          description: '入场动画 animate.css 动画名',
          type: 'animate.css 动画名',
          defaultValue: 'fadeIn'
        },
        {
          attribute: 'inAnimateOtherSide',
          description: '另一边入场动画 animate.css 动画名',
          type: 'animate.css 动画名',
          defaultValue: 'fadeIn'
        },
        {
          attribute: 'listData',
          description: '数据',
          type: 'array',
          defaultValue: []
        },
        {
          attribute: 'outAnimate',
          description: '离场动画 animate.css 动画名',
          type: 'animate.css 动画名',
          defaultValue: 'fadeOut'
        },
        {
          attribute: 'outAnimateOtherSide',
          description: '另一边离场动画 animate.css 动画名',
          type: 'animate.css 动画名',
          defaultValue: 'fadeOut'
        },
        {
          attribute: 'showIndicator',
          description: '是否显示小点',
          type: 'boolean',
          defaultValue: true
        },
        {
          attribute: 'speed',
          description: '动画速度',
          type: 'faster | fast | slow | slower',
          defaultValue: '-'
        },
        {
          attribute: 'waitingTime',
          description: '等待时间（毫秒）。播放动作中，不可操作下一个动作，等待时间过后方可操作',
          type: 'number',
          defaultValue: 500
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.params {
  overflow-y: auto;

  table {
    min-width: 1024px;
  }
}
</style>
