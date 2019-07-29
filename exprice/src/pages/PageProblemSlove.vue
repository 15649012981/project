<template>
  <transition name="slide-fade">
    <div class="text-content">
      <p>1、引入fastClick.js后，iOS高版本键盘弹起失效问题解决</p>
      <img src="../assets/problem1.png">
      <p>2、ios下，输入框聚焦固定定位会变成绝对定位问题</p>
      <img src="../assets/problem4.png">
      <p>3、IOS下，让输入框自动聚焦，需要事件驱动问题</p>
      <img src="../assets/problem5.png">
      <img src="../assets/problem6.png">
      <p>4、Vue-router处理切换页面时页面不置顶的问题</p>
      <img src="../assets/problem2.png">
      <p>5、ios下添加input监听事件，软键盘中文文本输入未选中输入内容时触发多次搜索的问题</p>
      <img src="../assets/problem3.png">
      <img src="../assets/problem7.png">
      <p>6、引起页面穿透问题</p>
      <span>
        *点击穿透问题：<br />点击蒙层（mask）上的关闭按钮，蒙层消失后发现触发了按钮下面元素的click事件
        蒙层的关闭按钮绑定的是touch事件，而按钮下面元素绑定的是click事件，touch事件触发之后，蒙层消失了，300ms后这个点的click事件fire，event的target自然就是按钮下面的元素，因为按钮跟蒙层一起消失了<br />
        *跨页面点击穿透问题：<br />如果按钮下面恰好是一个有href属性的a标签，那么页面就会发生跳转
        因为a标签跳转默认是click事件触发，所以原理和上面的完全相同<br />
        *另一种跨页面点击穿透问题：<br />这次没有mask了，直接点击页内按钮跳转至新页，然后发现新页面中对应位置元素的click事件被触发了
      </span>

    </div>
  </transition>
</template>

<script>
export default {
  name: 'PageCanvas',
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
  },
  beforeUpdate () { },
  updated () { },
  activated () { },
  deactivated () { },
  beforeDestroy () { },
  destroyed () { },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.text-content {
  p {
    text-align: left;
    font-size: 0.28rem;
    padding: 0.3rem 0;
  }
  img {
    width: 60%;
  }
  span {
    display: block;
    text-align: left;
    font-size: 0.2rem;
    line-height: 0.48rem;
  }
}
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.4s ease-out;
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(300px);
  opacity: 0;
}
</style>
