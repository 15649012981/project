<template>
  <transition name="fade">
    <div class="common-toast-container fb fb-main-center fb-cross-center">
      <div class="text-container">
        {{msg}}
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'CommonToast',
  components: {
  },
  data () {
    return {
      msg: '', // toast提示文本
      viewBlock: true // toast模块显示
    }
  },
  methods: {
    close () {
      this.viewBlock = false
    }
  },
  mounted () {
    let _this = this
    setTimeout(() => {
      _this.onClose()
    }, 1500)
  }
}
</script>

<style scoped>
.common-toast-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: transparent;
  z-index: 999;
}
.common-toast-container .text-container {
  padding: 20px 32px;
  max-width: 248px;
  color: #ffffff;
  border-radius: 4px;
  background: rgba(0, 0, 0, 1);
}
</style>
