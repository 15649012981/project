<template>
  <transition name="slide-fade">
    <div class="content">
      <div class="rotateAll">
        <div class="faceOne">
          <img
            src="../assets/Jay1.jpg"
            alt=""
          >
        </div>
        <div class="faceTwo">
          <img
            src="../assets/Jay2.jpg"
            alt=""
          >
        </div>
        <div class="faceThree">
          <img
            src="../assets/Jay3.jpg"
            alt=""
          >
        </div>
        <div class="faceFour">
          <img
            src="../assets/Jay4.jpg"
            alt=""
          >
        </div>
        <div class="faceFive">
          <img
            src="../assets/Jay5.jpg"
            alt=""
          >
        </div>
        <div class="faceSix">
          <img
            src="../assets/Jay6.jpg"
            alt=""
          >
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {
  GameViewOne
} from '../components'

export default {
  name: 'CommonFormat',
  components: {
    GameViewOne
  },
  props: {
    sample: String
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () { },
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
.content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1500px;
  perspective-origin: 50% 100px;

  @keyframes spin {
    0% {
      transform: rotateX(0) rotateZ(0);
    }
    to {
      transform: rotateX(360deg) rotateZ(360deg);
    }
  }

  .rotateAll {
    width: 4rem;
    height: 4rem;
    position: relative;
    transform-style: preserve-3d;
    animation: spin 10s infinite linear;
    div {
      position: absolute;
      width: 4rem;
      height: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 4rem;
        width: 4rem;
      }
    }
    .faceOne {
      transform: translateZ(-2rem) rotateY(180deg);
    }
    .faceTwo {
      transform: rotateY(-270deg) translateX(2rem);
      transform-origin: top right;
    }
    .faceThree {
      transform: translateZ(2rem);
    }
    .faceFour {
      transform: rotateY(270deg) translateX(-2rem);
      transform-origin: center left;
    }
    .faceFive {
      transform: rotateX(-90deg) translateY(-2rem);
      transform-origin: top center;
    }
    .faceSix {
      transform: rotateX(90deg) translateY(2rem);
      transform-origin: bottom center;
    }
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
