<template>
  <transition name="slide-fade">
    <div>
      <el-button
        type="success"
        @click="handleJumpLink('/canvas/view')"
      >小球跳动Canvas</el-button>
      <el-button
        @click="handleJumpLink('/particles')"
        type="success"
      >离子动画依赖包</el-button>
      <el-button
        @click="handleJumpLink('/three/view')"
        type="success"
      >立体旋转</el-button>
    </div>

  </transition>
</template>
<script>
// import CommonSelectAddress from '../CommonUI/CommonSelectAddress.vue'
export default {
  name: 'product',
  components: {
    // CommonSelectAddress
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    handleJumpLink (link) {
      this.$router.push({
        path: link
      })
    }
  },
  mounted () { }
}
</script>

<style lang="less" scoped>
.container-style {
  height: 500px;
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
