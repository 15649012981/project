import Vue from 'vue'
import CommonSelectAddress from './CommonLoading.vue'
const LoadingConstructor = Vue.extend(CommonSelectAddress) // 直接将Vue组件作为Vue.extend的参数
let nId = 1
let LoadingInstance = null

/**
 * 登录窗口
 * @param {object} option 配置
 * @return Promise
 */
const CommonLoading = {
  show: _option => {
    console.dir(require('./CommonLoading.vue'))
    console.dir(CommonSelectAddress)
    return new Promise((resolve, reject) => {
      if (!LoadingInstance) {
        let id = 'CommonLoading'
        let _option = {}
        LoadingInstance = new LoadingConstructor({
          data: _option
        })
        LoadingInstance.id = id
        LoadingInstance.vm = LoadingInstance.$mount() // 挂载但是并未插入dom，是一个完整的Vue实例
        LoadingInstance.dom = LoadingInstance.vm.$el
        document.body.appendChild(LoadingInstance.dom) // 将dom插入body
      }
      LoadingInstance.dom.style.zIndex = nId + 1001
    })
  },
  hide: () => {
    if (LoadingInstance) {
      document.body.removeChild(LoadingInstance.dom)
      LoadingInstance = null
    }
  }
}

export default CommonLoading
