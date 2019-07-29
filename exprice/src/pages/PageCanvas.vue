<template>
  <transition name="slide-fade">
    <div class="content fb fb-main-center fb-cross-center">
      <canvas
        id="canvas"
        width="1000"
        height="500"
        style="background:#000;"
      ></canvas>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PageCanvas',
  data () {
    return {
      canvas: '',
      ctx: '',
      r: '',
      x: '',
      y: '',
      vy: 0, // 初始速度
      gravity: 8, // 定义重力加速度
      bounce: 0.7, // 定义反弹系数
      tRun: 0 // 运动时间
    }
  },
  computed: {},
  watch: {},
  beforeCreate () { },
  created () { },
  beforeMount () { },
  mounted () {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.r = 20
    this.x = this.canvas.width / 2
    this.y = this.canvas.height - 300
    this.timeInterval()
  },
  beforeUpdate () { },
  updated () { },
  activated () { },
  deactivated () { },
  beforeDestroy () { },
  destroyed () { },
  methods: {
    timeInterval () {
      let _this = this
      let timeInterval = setInterval(() => {
        _this.tRun += 0.005
        // _this.y += (0.5 * _this.gravity * (_this.tRun + 0.01) * (_this.tRun + 0.01) - (0.5 * _this.gravity * _this.tRun * _this.tRun))
        _this.y += 0.5 * _this.gravity * _this.tRun * _this.tRun
        _this.vy = _this.gravity * _this.tRun
        if (_this.y >= _this.canvas.height - 21 && _this.vy > 0) {
          _this.tRun = 0
          _this.vy *= _this.bounce
          // console.log(_this.y)
          clearInterval(timeInterval)
          _this.timeIntervalTwo()
        }
        _this.ctx.fillStyle = 'red'
        _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height)
        _this.ctx.beginPath()
        _this.ctx.arc(_this.x, _this.y, _this.r, 0, 2 * Math.PI)
        _this.ctx.stroke()
        _this.ctx.fill()
      }, 1)
    },
    timeIntervalTwo () {
      let _this = this
      if (_this.vy >= 0.1) {
        let timeIntervalTwo = setInterval(() => {
          // let vyTwo = _this.vy - _this.gravity * 0.01
          _this.vy -= _this.gravity * 0.005
          if (_this.vy < 0.01) {
            clearInterval(timeIntervalTwo)
            _this.tRun = 0
            _this.vy = 0
            // console.log(_this.y)
            _this.timeInterval()
          }
          _this.tRun += 0.005
          // _this.y = (_this.canvas.height - 20) - ((0.5 * _this.gravity * _this.tRun * _this.tRun) + (_this.vy * _this.tRun))
          _this.y -= ((0.5 * _this.gravity * _this.tRun * _this.tRun) + (_this.vy * _this.tRun))
          // console.log(((0.5 * _this.gravity * _this.tRun * _this.tRun) + (_this.vy * _this.tRun)))
          _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height)
          _this.ctx.beginPath()
          _this.ctx.arc(_this.x, _this.y, _this.r, 0, 2 * Math.PI)
          _this.ctx.stroke()
          _this.ctx.fill()
        }, 5)
      }
    }
  }
}
</script>

<style scoped>
.content {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: transparent;
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
