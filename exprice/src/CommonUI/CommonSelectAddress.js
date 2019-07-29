import Vue from 'vue'
import CommonSelectAddress from './CommonSelectAddress.vue'
const CommonSelectAddressConstructor = Vue.extend(CommonSelectAddress) // 组件拓展到vue实例下
let domContent = {} // dom容器
const Address = req => {
  return new Promise((resolve, reject) => {
    let id = 'CommonSelectAddress'
    let option = {} // 存储参数容器
    if (req) {
      if (!req.nowProvId || !req.nowCityId || !req.nowAreaId) {
        reject(new Error('省市区Id有缺失，请传入完整信息'))
        return
      }
      option.nowProvId = req.nowProvId || ''
      option.nowCityId = req.nowCityId || ''
      option.nowAreaId = req.nowAreaId || ''
    }

    option.close = function (res) {
      Address.handleClose()
      resolve(res)
    }
    domContent = new CommonSelectAddressConstructor({
      data: option
    })
    domContent.id = id
    domContent.vm = domContent.$mount() // 挂载但是并未插入dom，是一个完整的Vue实例
    domContent.dom = domContent.vm.$el
    document.body.appendChild(domContent.dom) // 将dom插入body
  })
}

Address.handleClose = function () {
  if (domContent) {
    document.body.removeChild(domContent.dom)
    domContent = null
  }
}

export default Address
