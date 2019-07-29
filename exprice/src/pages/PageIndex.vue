<template>
  <div class="come-share-world">
    <div class="swiper-container swiper-container-vertical">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="content-nav font-30">
            <h3 class="title-set font-42">目录</h3>
            <p @click="handleJumpLink('/myself')">1、 介绍片</p>
            <p @click="handleJumpLink('/problem/view')">2、 开发问题总结片</p>
            <p @click="handleJumpLink('/animate/nav')">3、 动画</p>
            <p @click="handleJumpLink('/ui/element')">4、 插件</p>
            <p @click="handleJumpLink('/game')">5、 游戏</p>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="set-content-block fb fb-cross-center">
            <div
              contenteditable="true"
              class="text effect01 fb fb-cross-center fb-main-center"
            >欢迎，欢迎，热烈欢迎</div>
          </div>
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/dist/js/swiper.min.js'
import 'swiper/dist/css/swiper.min.css'
export default {
  name: 'CommonFormat',
  components: {
  },
  props: {
    sample: String
  },
  data () {
    return {
      heightSet: document.documentElement.clientHeight
    }
  },
  computed: {},
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    /* eslint-disable no-new */
    new Swiper('.swiper-container', {
      direction: 'vertical',
      height: this.heightSet,
      mousewheel: true,
      pagination: {
        el: '.swiper-pagination'
      }
    })
  },
  beforeUpdate () { },
  updated () { },
  activated () { },
  deactivated () { },
  beforeDestroy () { },
  destroyed () { },
  methods: {
    handleJumpLink (link) {
      this.$router.push({
        path: link
      })
    }
  }
}
</script>

<style lang="less" scoped>
.content-nav {
  .title-set {
    margin: 0 auto;
    padding: 1rem 0;
  }
  p {
    line-height: 0.72rem;
    height: 0.72rem;
    letter-spacing: 3px;
    width: 4rem;
    text-align: left;
    margin: 0 auto;
    cursor: pointer;
  }
}
.swiper-pagination {
  position: fixed;
}
.swiper-slide {
  height: 100%;
}
.set-content-block {
  height: 100%;
}
/* @import url(https://fonts.googleapis.com/css?family=Dosis:500, 800); */
.text {
  font-family: "微软雅黑", "Dosis", sans-serif;
  font-size: 0.8rem;
  text-align: center;
  font-weight: bold;
  line-height: 2rem;
  text-transform: uppercase;
  position: relative;
}
/*简单单纯的效果一*/
.effect01 {
  width: 100%;
  height: 100%;
  background-color: #7abcff;
  color: #ddc448;
  text-shadow: 0px 0px 0 #b89800, 1px -1px 0 #b39400, 2px -2px 0 #ad8f00,
    3px -3px 0 #a88b00, 4px -4px 0 #a38700, 5px -5px 0 #9e8300,
    6px -6px 0 #997f00, 7px -7px 0 #947a00, 8px -8px 0 #8f7600,
    9px -9px 0 #8a7200, 10px -10px 0 #856e00, 11px -11px 0 #806a00,
    12px -12px 0 #7a6500, 13px -13px 12px rgba(0, 0, 0, 0.55),
    13px -13px 1px rgba(0, 0, 0, 0.5);
}
</style>
