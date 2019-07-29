import Vue from 'vue'
import CommonToast from './CommonToast.vue'
const CommonToastConstructor = Vue.extend(CommonToast) // 组件拓展到vue实例下
let domContent = {} // dom容器
const Toast = req => {
  return new Promise((resolve, reject) => {
    let id = 'CommonToast'
    let option = {} // 存储参数容器
    if (req && (req !== {})) {
      if (!req.msg) {
        reject(new Error('msg参数不能为空'))
        return
      }
      option.msg = req.msg || '提示toast'
      option.onClose = function () {
        Toast.close()
      }
      domContent = new CommonToastConstructor({
        data: option
      })
      domContent.id = id
      domContent.vm = domContent.$mount() // 挂载但是并未插入dom，是一个完整的Vue实例
      domContent.dom = domContent.vm.$el
      document.body.appendChild(domContent.dom) // 将dom插入body
    }
  })
}

Toast.close = function () {
  if (domContent) {
    document.body.removeChild(domContent.dom)
    domContent = null
  }
}

export default Toast
