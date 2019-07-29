<template>
  <div>
    <div class="set-score-view">
      <p>
        得分:<span id="score">{{score}}</span>
      </p>
    </div>
    <div
      @touchstart.prevent="touchStartListen"
      @touchmove.prevent="touchMoveListen"
      @touchend="touchEndListen"
      class="grid-panel"
      v-html="domHtml"
    >
    </div>
    <div
      v-show="state === 0"
      class="game-over fb fb-main-center fb-cross-center"
    >
      <p class="font-30 fb fb-col">
        <span>游戏结束</span>
        <span>得分: {{score}}</span>
        <a
          @click="newGame"
          class="btn font-18"
        >重新开始</a>
      </p>
    </div>
  </div>
</template>

<script>
import { isMobile } from '../utils/comUtils'
export default {
  name: 'GameViewOne',
  components: {},
  props: {
    sample: String
  },
  data () {
    return {
      percentX: '', // 滑动相对参量X
      percentY: '', // 滑动相对参量Y
      domHtml: '', // 渲染的dom块
      score: '', // 当前分数
      state: 1, // 游戏状态
      data: [], // 格子数字回显
      rnNum: 4, // 行数
      cnNum: 4 // 列数
    }
  },
  computed: {},
  watch: {},
  beforeCreate () { },
  created () {
    this.touch = {}
  },
  beforeMount () { },
  mounted () {
    this.startGame()
    if (!isMobile) {
      let _this = this
      document.onkeydown = function (e) {
        switch (e.keyCode) {
          case 37: _this.moveLeftSet(); break
          case 38: _this.moveUpSet(); break
          case 39: _this.moveRightSet(); break
          case 40: _this.moveDownSet(); break
        }
      }
    }
  },
  beforeUpdate () {
  },
  updated () { },
  activated () { },
  deactivated () { },
  beforeDestroy () { },
  destroyed () { },
  methods: {
    newGame () {
      this.startGame()
    },
    touchStartListen (e) {
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
    },
    touchMoveListen (e) {
      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageY - this.touch.startY
      this.percentX = deltaX / window.innerWidth
      this.percentY = deltaY / window.innerHeight
    },
    touchEndListen (e) {
      console.log(Math.abs(this.percentY) > Math.abs(this.percentX))
      if (Math.abs(this.percentY) > Math.abs(this.percentX) && isMobile) {
        if (this.percentY < -0.1) { // 向上滑动
          console.log(3)
          this.moveUpSet()
        } else if (this.percentY > 0.1) { // 向下滑动
          this.moveDownSet()
        }
      } else {
        if (this.percentX < -0.15) { // 向左滑动
          this.moveLeftSet()
        } else if (this.percentX > 0.15) { // 向右滑动
          this.moveRightSet()
        }
      }
    },
    initGrid () { // 初始化栅格显示页面
      let arr = [] // 格子二位数组存储
      let domHtmlGrid = '' // 底层格子
      let domHtmlCell = '' // 变动格子
      for (let rNum = 0; rNum < this.rnNum; rNum++) {
        for (let cNum = 0; cNum < this.cnNum; cNum++) {
          arr.push('' + rNum + cNum)
        }
      }
      arr.forEach(() => {
        domHtmlGrid += '<div class="grid-cell lattice font-60"></div>'
      })
      arr.forEach((item) => {
        domHtmlCell += `<div class="cell-top lattice font-60" data-c="r${item}"></div>`
      })
      this.domHtml = domHtmlGrid + domHtmlCell
    },
    startGame () { // 游戏初始化
      this.score = 0
      this.state = 1
      this.data = []
      this.initGrid() // 制空
      for (let r = 0; r < this.rnNum; r++) {
        this.data[r] = []
        for (let c = 0; c < this.cnNum; c++) {
          this.data[r][c] = 0
        }
      }
      this.startRandomNum() // 随机数生成
      this.$nextTick(() => {
        this.updateViewHtml() // 更新视图
      })
    },
    startRandomNum () { // 初始随机数
      while (true) {
        let r = parseInt(Math.random() * this.rnNum)
        let c = parseInt(Math.random() * this.cnNum)
        if (this.data[r][c] === 0) {
          this.data[r][c] = Math.random() < 0.5 ? 2 : 4
          break
        }
      }
    },
    updateViewHtml () { // 更新视图
      for (let r = 0; r < this.rnNum; r++) {
        for (let c = 0; c < this.cnNum; c++) {
          let elelist = document.querySelectorAll(`[data-c="r${r + '' + c}"]`)[0]
          if (this.data[r][c] !== 0) {
            elelist.innerHTML = this.data[r][c]
          } else {
            elelist.innerHTML = ''
          }
        }
      }
    },
    gameOverCheck () { // 游戏结束样式
      for (let r = 0; r < this.rnNum; r++) {
        for (let c = 0; c < this.cnNum; c++) {
          if (this.data[r][c] === 0) {
            this.state = 1
            return false
          }
          if (c < this.cnNum - 1 && this.data[r][c] === this.data[r][c + 1]) {
            this.state = 1
            return false
          }
          if (r < this.rnNum - 1 && this.data[r][c] === this.data[r + 1][c]) {
            this.state = 1
            return false
          }
        }
      }
      this.state = 0
      return true
    },
    moveView (callBack) { // 移动视图控制
      const before = String(this.data) // 操作前
      callBack() // 执行操作逻辑
      let after = String(this.data) // 操作后
      if (before !== after) { // 操作后生成随机数
        this.startRandomNum()
        if (this.gameOverCheck()) {
          this.state = 0
        }
        this.updateViewHtml() // 更新视图
      }
    },
    moveLeftSet () { // 向左移动
      const leftView = () => {
        for (let r = 0; r < this.rnNum; r++) { // 遍历行
          this.leftMoveRow(r)
        }
      }
      this.moveView(leftView)
    },
    leftMoveRow (r) { // 向左移动r行
      for (let c = 0; c < this.cnNum - 1; c++) { // 遍历当前行所有元素判断移动
        let nextC = this.checkNexRow(r, c) // 找到不为0的列
        if (nextC === -1) {
          break
        } else {
          if (this.data[r][c] === 0) { // 遍历当前块如果为0 、将下一个不为0的替换到当前块、 不为0的块儿置为0、 重新从当前块儿遍历
            this.data[r][c] = this.data[r][nextC]
            this.data[r][nextC] = 0
            c--
          } else if (this.data[r][c] === this.data[r][nextC]) { // 相等是当前块儿*2 、分数添加、不为0的块儿置为0
            this.data[r][c] = this.data[r][c] * 2
            this.score += this.data[r][c]
            this.data[r][nextC] = 0
          }
        }
      }
    },
    checkNexRow (r, c) { // 检查r行下一列是否为0
      for (let nextC = c + 1; nextC < this.cnNum; nextC++) { // 遍历返回下一个不为0的位置
        if (this.data[r][nextC] !== 0) {
          return nextC
        }
      }
      return -1
    },
    moveRightSet () { // 向右移动
      const rightView = () => {
        for (let r = 0; r < this.rnNum; r++) { // 遍历行
          this.rightMoveRow(r)
        }
      }
      this.moveView(rightView)
    },
    rightMoveRow (r) { // 向右移动r行
      for (let c = this.cnNum - 1; c > 0; c--) { // 遍历当前行所有元素判断移动
        let nextC = this.checkPreRow(r, c) // 找到不为0的列
        if (nextC === -1) {
          break
        } else {
          if (this.data[r][c] === 0) { // 遍历当前块如果为0 、将上一个不为0的替换到当前块、 不为0的块儿置为0、 重新从当前块儿遍历
            this.data[r][c] = this.data[r][nextC]
            this.data[r][nextC] = 0
            c++
          } else if (this.data[r][c] === this.data[r][nextC]) { // 相等是当前块儿*2 、分数添加、不为0的块儿置为0
            this.data[r][c] = this.data[r][c] * 2
            this.score += this.data[r][c]
            this.data[r][nextC] = 0
          }
        }
      }
    },
    checkPreRow (r, c) { // 检查r行上一列是否为0
      for (let nextC = c - 1; nextC >= 0; nextC--) { // 遍历返回前一个不为0的位置
        if (this.data[r][nextC] !== 0) {
          return nextC
        }
      }
      return -1
    },
    moveUpSet () { // 向上移动
      const upView = () => {
        for (let c = 0; c < this.cnNum; c++) { // 遍历列
          this.upMoveCol(c)
        }
      }
      this.moveView(upView)
    },
    upMoveCol (c) { // 向上移动
      for (let r = 0; r < this.rnNum - 1; r++) { // 遍历当前列所有元素判断移动
        let nextR = this.checkDownCol(r, c) // 找到不为0的行
        if (nextR === -1) {
          break
        } else {
          if (this.data[r][c] === 0) { // 遍历当前块如果为0 、将下一个不为0的替换到当前块、 不为0的块儿置为0、 重新从当前块儿遍历
            this.data[r][c] = this.data[nextR][c]
            this.data[nextR][c] = 0
            r--
          } else if (this.data[r][c] === this.data[nextR][c]) { // 相等是当前块儿*2 、分数添加、不为0的块儿置为0
            this.data[r][c] = this.data[r][c] * 2
            this.score += this.data[r][c]
            this.data[nextR][c] = 0
          }
        }
      }
    },
    checkDownCol (r, c) { // 检查c列下一行是否为0
      for (let nextR = r + 1; nextR < this.cnNum; nextR++) { // 遍历返回下一个不为0的位置
        if (this.data[nextR][c] !== 0) {
          return nextR
        }
      }
      return -1
    },
    moveDownSet () { // 向下移动
      const downView = () => {
        for (let c = 0; c < this.cnNum; c++) { // 遍历列
          this.downMoveCol(c)
        }
      }
      this.moveView(downView)
    },
    downMoveCol (c) { // 向下移动r行
      for (let r = this.rnNum - 1; r > 0; r--) { // 遍历当前行所有元素判断移动
        let nextR = this.checkUpCol(r, c) // 找到不为0的行
        if (nextR === -1) {
          break
        } else {
          if (this.data[r][c] === 0) { // 遍历当前块如果为0 、将上一个不为0的替换到当前块、 不为0的块儿置为0、 重新从当前块儿遍历
            this.data[r][c] = this.data[nextR][c]
            this.data[nextR][c] = 0
            r++
          } else if (this.data[r][c] === this.data[nextR][c]) { // 相等是当前块儿*2 、分数添加、不为0的块儿置为0
            this.data[r][c] = this.data[r][c] * 2
            this.score += this.data[r][c]
            this.data[nextR][c] = 0
          }
        }
      }
    },
    checkUpCol (r, c) { // 检查c列上一行是否为0
      for (let nextR = r - 1; nextR >= 0; nextR--) { // 遍历返回前一个不为0的位置
        if (this.data[nextR][c] !== 0) {
          return nextR
        }
      }
      return -1
    }
  }
}
</script>

<style lang="less">
.grid-panel {
  width: 4.8rem;
  height: 4.8rem;
  margin: 0 auto;
  background: #bbada0;
  border-radius: 0.1rem;
  position: relative;
  [data-c^="r0"] {
    top: 0.16rem;
  }
  [data-c^="r1"] {
    top: 1.32rem;
  }
  [data-c^="r2"] {
    top: 2.48rem;
  }
  [data-c^="r3"] {
    top: 3.64rem;
  }
  [data-c^="r4"] {
    top: 4.8rem;
  }
  [data-c^="r5"] {
    top: 5.96rem;
  }
  [data-c^="r6"] {
    top: 7.12rem;
  }
  [data-c^="r7"] {
    top: 8.28rem;
  }
  [data-c$="0"] {
    left: 0.16rem;
  }
  [data-c$="1"] {
    left: 1.32rem;
  }
  [data-c$="2"] {
    left: 2.48rem;
  }
  [data-c$="3"] {
    left: 3.64rem;
  }
  [data-c$="4"] {
    left: 4.8rem;
  }
  [data-c$="5"] {
    left: 5.96rem;
  }
  [data-c$="6"] {
    left: 7.12rem;
  }
  [data-c$="7"] {
    left: 8.28rem;
  }
  .grid-cell {
    background: #ccc0b3;
    float: left;
    margin: 0.16rem 0 0 0.16rem;
  }
  .cell-top {
    color: #fff;
    background: #ddd;
    position: absolute;
    line-height: 1rem;
    font-size: 0.6rem;
    text-align: center;
  }
  .lattice {
    height: 1rem;
    width: 1rem;
    border-radius: 0.06rem;
  }
}
.game-over {
  position: fixed;
  background: rgba(0, 0, 0, 0.64);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  span {
    color: #fff;
  }
  .btn {
    padding: 0.15rem 0.3rem;
    border-radius: 0.04rem;
    background: #09bdc6;
    border: 0;
    color: #fff;
    margin-top: 0.6rem;
  }
}
.set-score-view {
  padding-bottom: 0.2rem;
  p {
    line-height: 0.6rem;
    font-size: 0.36rem;
    text-align: left;
  }
}
</style>
