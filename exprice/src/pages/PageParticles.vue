<template>
  <transition name="slide-fade">
    <div
      :style="{ height: pageHeight}"
      class="content"
    >
      <vue-particles
        color="#fff"
        :particleOpacity="0.7"
        :particlesNumber="30"
        shapeType="star"
        :particleSize="5"
        linesColor="#fff"
        :linesWidth="2"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      ></vue-particles>

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
      proId: this.$route.query.proId || '', // 对应id
      pageHeight: '' // 页面高度
    }
  },
  created () {
    this.pageHeight = `${window.innerHeight}px` // 动态读取窗口高度
  },
  methods: {
    handleViewAddress () {
      this.$Address({
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
