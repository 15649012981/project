import Toast from './CommonToast.js'
import Loading from './CommonLoading.js'
import Address from './CommonSelectAddress.js'

const install = function (Vue, opts = {}) {
  /* istanbul ignore if */
  if (install.installed) return
  Vue.prototype.$Toast = Toast
  Vue.prototype.$Loading = Loading
  Vue.prototype.$Address = Address
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default { install }
