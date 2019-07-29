<template>
  <div class="come-share-world">
    <div class="swiper-container swiper-container-vertical">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="content">
            <p class="title-set fb fb-cross-center fb-main-center">自我介绍</p>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="set-content-block fb fb-cross-center">
            <div class="content">
              <p class="book-title fb fb-main-center fb-cross-center">读书介绍</p>
              <div class="fb fb-main-between content-img-set">
                <img src="../assets/book_1 (1).png">
                <img src="../assets/book_1 (2).png">
                <img src="../assets/book_1 (3).png">
                <img src="../assets/book_1 (6).png">
                <img src="../assets/book_1 (5).png">
                <img src="../assets/book_1 (4).png">
              </div>
            </div>
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
.content {
  height: 100%;
  .title-set {
    height: 100%;
    font-size: 0.48rem;
  }
  .book-title {
    height: 2rem;
    font-size: 0.32rem;
  }
  .content-img-set {
    width: 100%;
    height: 6rem;
    img {
      width: 16%;
    }
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
</style>
