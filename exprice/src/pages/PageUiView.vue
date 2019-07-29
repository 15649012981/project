<template>
  <transition name="slide-fade">
    <div>
      <el-button
        type="success"
        @click="handleViewAddress"
      >地址选择</el-button>
      <el-button
        @click="tryToastComp"
        type="success"
      >toast插件</el-button>
      <el-button
        @click="handleViewLoading"
        type="success"
      >loading</el-button>
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
    handleViewAddress () { // 省市区选择
      this.$Address({ // 不传默认显示
        nowAreaId: 61,
        nowCityId: 4,
        nowProvId: 3
      }).then(res => {
        if (res !== 0) {
          alert(JSON.stringify(res))
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    tryToastComp () { // toast弹窗
      this.$Toast({ msg: '就不告诉你我怎么蹦出来的!!!' })
    },
    handleViewLoading () { // loading
      this.$Loading.show()
      setTimeout(() => {
        this.$Loading.hide()
      }, 2000)
    }
  },
  mounted () { }
}
</script>

<style lang="less" scoped>
.content {
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(../assets/sky.jpg);
  background-position: -20% 10%;
  background-size: contain;
  #particles-js {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
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
