function Observer(data) { // 创建Observer构造函数
  this.data = data;
  this.walk(data);
}

Observer.prototype = {
  walk: function (data) { // 遍历对象属性值添加监听
    var _this = this
    Object.keys(data).forEach(function (key) {
      console.log('遍历数据键值' + key)
      // 添加属性监听
      _this.defineDataKey(data, key, data[key])
    })
  },
  defineDataKey: function (data, key, val) {
    // 递归遍历监听属性值
    var childData = observe(val)
    var dep = new Dep()
    Object.defineProperty(data, key, {
      enumerable: true, // 是否可枚举
      configurable: true, // 是否可替换和删除
      get: function getter () {
        if (Dep.target) {
          // 在这里添加一个订阅者
          console.log('hahha' + Dep.target)
          dep.addSub(Dep.target)
        }
        return val
      },
      set: function setter (newValue) {
        if (newValue === val) {
          return
        }
        val = newValue
        /**
         * 替换当前子属性值
         * 判断添加属性值监听
         */
        childData = observe(newValue)
        dep.notify()
      }
    })
  }
}
// 子属性添加监听
function observe(value, vm) {
  if (!value || typeof value !== 'object') {
      return;
  }
  return new Observer(value);
};

// 数据收集处理机制
function Dep () {
  this.subs = [] // 数据收集容器
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub)
  },
  notify: function () { // 数据遍历变更
    this.subs.forEach(function (sub) {
      /**
       * sub 来自Watcher
       */
      sub.update()
    })
  }
}