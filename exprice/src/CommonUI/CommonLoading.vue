<template>
  <transition name="fade">
    <div class="loading-box fb fb-main-center fb-cross-center">
      <div class="img-box fb fb-main-center fb-cross-center">
        <img
          src="../assets/common_loading.gif"
          alt=""
        >
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'CommonLoading',
  components: {
  },
  data () {
    return {
      viewStatus: false
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.loading-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 999;
}
.img-box {
  background: rgba(0, 0, 0, 0.8);
  width: 80px;
  height: 80px;
  border-radius: 6px;
  img {
    width: 45%;
  }
}
</style>
