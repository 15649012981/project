<template>
  <div
    @click="handleClickModelTwice"
    class="model"
  >
    <div class="content-block">
      <transition name="slide-fade">
        <div
          id="selectBlock"
          class="select-block"
        >
          <div class="btn-ctrl-container fb fb-main-between">
            <span @click="handleClose(0)">取消</span>
            <span @click="handleClose(1)">确定</span>
          </div>
          <div class="fb address-select-block">
            <div
              v-if="provinceList"
              class="only-block item-flex-1"
            >
              <span
                @click="fetchCityList(item.id, item.name)"
                :class="item.id === nowProvId ? 'active' : ''"
                v-for="(item, index) in provinceList"
                :key="index"
              >
                {{item.name}}
              </span>
            </div>
            <div
              v-if="cityList"
              class="only-block item-flex-1"
            >
              <span
                @click="fetchAreaList(item.id, item.name)"
                :class="item.id === nowCityId ? 'active' : ''"
                v-for="(item, index) in cityList"
                :key="index"
              >
                {{item.name}}
              </span>
            </div>
            <div
              v-if="areaList"
              class="only-block item-flex-1"
            >
              <span
                @click="handleAreaId(item.id, item.name)"
                :class="item.id === nowAreaId ? 'active' : ''"
                v-for="(item, index) in areaList"
                :key="index"
              >
                {{item.name}}
              </span>
            </div>
          </div>
        </div>

      </transition>
    </div>
  </div>
</template>

<script>
import { cityAreaData } from '@/utils/cityData'
export default {
  name: 'CommonToast',
  components: {
  },
  data () {
    return {
      // showBlock: true, // 选择块儿显示
      provinceList: '', // 省列表
      cityList: '', // 市列表
      areaList: '', // 区列表
      nowProvId: '', // 省Id
      nowCityId: '', // 市Id
      nowAreaId: '', // 区Id
      nowProvName: '', // 省
      nowCityName: '', // 市
      nowAreaName: '' // 区
    }
  },
  methods: {
    handleClickModelTwice (e) {
      let box = document.getElementById('selectBlock')
      if (box && !box.contains(e.target)) {
        this.handleClose(0)
      }
    },
    initViewData () { // 回显地址数据
      cityAreaData.forEach(res => {
        if (this.nowProvId === res.id) { // 回显省
          this.nowProvName = res.name
          this.cityList = res.city
          this.cityList.forEach(res => {
            if (this.nowCityId === res.id) { // 回显市
              this.nowCityName = res.name
              this.areaList = res.district
              this.areaList.forEach(res => {
                if (this.nowAreaId === res.id) { // 回显区
                  this.nowAreaName = res.name
                }
              })
            }
          })
        }
      })
      if (!this.nowProvName || !this.nowCityName || !this.nowAreaName) {
        console.error('回显id不对应，重置为初始数据')
      }
    },
    getProVinceData () { // 获取省列表
      let arr = [] // 省列表容器
      cityAreaData.forEach(res => {
        let obj = {}
        obj.id = res.id
        obj.name = res.name
        arr.push(obj)
      })
      this.provinceList = arr
      if (!this.nowProvId) {
        this.nowProvId = arr[0].id
        this.nowProvName = arr[0].name
        this.fetchCityList(this.nowProvId, this.nowProvName)
      }
    },
    fetchCityList (id, name) { // 获取市列表
      this.nowProvId = id
      this.nowProvName = name
      cityAreaData.forEach(res => {
        if (res.id === id) {
          this.cityList = res.city
          this.nowCityId = this.cityList[0].id
          this.nowCityName = this.cityList[0].name
          this.fetchAreaList(this.nowCityId, this.nowCityName)
        }
      })
    },
    fetchAreaList (id, name) { // 获取区列表
      this.nowCityId = id
      this.nowCityName = name
      this.cityList.forEach(res => {
        if (res.id === id) {
          if (res.district && res.district.length > 0) {
            this.areaList = res.district
            this.nowAreaId = this.areaList[0].id
            this.nowAreaName = this.areaList[0].name
          } else {
            this.areaList = ''
            this.nowAreaId = ''
            this.nowAreaName = ''
          }
        }
      })
    },
    handleAreaId (id, name) {
      this.nowAreaId = id
      this.nowAreaName = name
    },
    handleClose (item) {
      if (item === 1) {
        this.close({
          nowProvId: this.nowProvId || '', // 省Id
          nowCityId: this.nowCityId || '', // 市Id
          nowAreaId: this.nowAreaId || '', // 区Id
          nowProvName: this.nowProvName || '', // 省
          nowCityName: this.nowCityName || '', // 市
          nowAreaName: this.nowAreaName || '' // 区
        })
      } else {
        this.close(item)
      }
      // this.showBlock = false
    }
  },
  mounted () {
    this.getProVinceData()
    if (this.nowProvId && this.nowCityId && this.nowAreaId) { // 回显省市区
      this.initViewData()
    }
  }
}
</script>

<style lang="less" scoped>
.model {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.68);
  .content-block {
    height: 100%;
    width: 100%;
    background: transparent;
    position: relative;
    .select-block {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 4rem;
      background: #fff;
      width: 100%;
      .btn-ctrl-container {
        padding: 0 0.6rem;
        line-height: 0.8rem;
        height: 0.8rem;
        font-size: 0.32rem;
        border-bottom: 0.02rem solid #ddd;
      }
      .address-select-block {
        .only-block {
          height: 3.2rem;
          overflow-y: scroll;
          span {
            line-height: 0.8rem;
            height: 0.8rem;
            font-size: 0.32rem;
            text-align: center;
            display: block;
            &.active {
              background: #ddd;
            }
          }
        }
      }
    }
  }
}
</style>
