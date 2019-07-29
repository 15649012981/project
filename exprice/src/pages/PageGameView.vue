<template>
  <transition name="slide-fade">
    <div class="content fb fb-main-center fb-cross-center">
      <game-view-one></game-view-one>
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
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  activated () {},
  deactivated () {},
  beforeDestroy () {},
  destroyed () {},
  methods: {
  }
}
</script>

<style scoped>
.content{
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: transparent;
}
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .4s ease-out;
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(300px);
  opacity: 0;
}
</style>
