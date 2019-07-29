// 判断当前浏览器是PC端还是移动端
// true：移动端   false：PC端
export const isMobile = (() => {
  let sUserAgent = navigator.userAgent.toLowerCase()
  let bIsMobile = /AppleWebKit.*Mobile/i.test(navigator.userAgent)
  let bIsIpad = sUserAgent.match(/ipad/i) !== null
  let bIsIphoneOs = sUserAgent.match(/iphone os/i) !== null
  let bIsMidp = sUserAgent.match(/midp/i) !== null
  let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) !== null
  let bIsUc = sUserAgent.match(/ucbrowser/i) !== null
  let bIsAndroid = sUserAgent.match(/android/i) !== null
  let bIsCE = sUserAgent.match(/windows ce/i) !== null
  let bIsWM = sUserAgent.match(/windows mobile/i) !== null
  if (
    bIsMobile ||
    bIsIpad ||
    bIsIphoneOs ||
    bIsMidp ||
    bIsUc7 ||
    bIsUc ||
    bIsAndroid ||
    bIsCE ||
    bIsWM
  ) {
    return true
  } else {
    return false
  }
})()

/* 缓存操作 */
export const getItem = name => {
  if (window.sessionStorage) {
    let value = window.sessionStorage.getItem(name)
    return window.JSON.parse(value)
  }
  return (window.cache || {})[name]
}

export const setItem = (name, value) => {
  if (window.sessionStorage) {
    return window.sessionStorage.setItem(name, window.JSON.stringify(value))
  }
  ; (window.cache || {})[name] = value
}

export const removeItem = name => {
  if (window.sessionStorage) {
    return window.sessionStorage.removeItem(name)
  }
  ; (window.cache || {})[name] = null
}

/* 缓存操作 */
export const getLocalItem = (name) => {
  if (window.localStorage) {
    let value = window.localStorage.getItem(name)
    return window.JSON.parse(value)
  }
  return (window.cache || {})[name]
}

export const setLocalItem = (name, value) => {
  if (window.localStorage) {
    return window.localStorage.setItem(name, window.JSON.stringify(value))
  }
  (window.cache || {})[name] = value
}

export const removeLocalItem = (name) => {
  if (window.localStorage) {
    return window.localStorage.removeItem(name)
  }
  (window.cache || {})[name] = null
}

// 获取URL search对象
export const getSearchObj = () => {
  let _obj = {}
  let _search = window.location.search || ''

  if (_search) {
    _search = _search
      .substr(1)
      .replace(/&/g, '", "')
      .replace(/=/g, '": "')
    _search = JSON.parse(`{"${_search}"}`)
    _obj = _search
  }
  return _obj
}

export const getSearchValueByKey = (key) => {
  let _value = ''
  let _url = window.decodeURIComponent(window.location.href)
  let _startIndex = _url.search(key)
  if (_startIndex !== -1) {
    _startIndex = _startIndex + key.length + 1
    let _endIndex = _url.indexOf('&', _startIndex)
    if (_endIndex !== -1) {
      _value = _url.slice(_startIndex, _endIndex)
    } else {
      _value = _url.slice(_startIndex)
    }
  }
  return _value
}

export const adaptImg = src => {
  // 图片读取高宽适应外部容器
  let img = new Image()
  let imgMess = {
    width: '',
    height: ''
  }
  img.src = src
  let imgWidth = img.width // 图片实际宽度
  let imgHeight = img.height // 图片实际高度
  console.table({
    imgWidth: imgWidth,
    imgHeight: imgHeight,
    src: src
  })
  if (imgWidth < imgHeight) {
    imgMess.width = 'auto'
    imgMess.height = '100%'
    return imgMess
  } else {
    imgMess.width = '100%'
    imgMess.height = 'auto'
    return imgMess
  }
}
