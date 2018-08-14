<template>
<div class="orderlist">
    <!-- 订单列表 -->
    <!-- <router-link tag="p" to="/fromWord">呵呵达</router-link> -->
    <tab :line-width=2  v-model="index" custom-bar-width="50px"	>
      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list" @click="demo2 = item" :key="index">{{item}}</tab-item>
    </tab>
    <swiper v-model="index" height="100px" :show-dots="false">
      <swiper-item v-for="(item, index) in list" :key="index">
        <div class="tab-swiper vux-center">{{item}} Container</div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
const getlist = () => ['订单列表', '我的订单']
export default {
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem
  },
  data () {
    return {
      index: 0,
      demo2: '订单列表',
      list: getlist(),
    }
  },
  created () {
    this.changeHomeTab('list')
    // console.log(this.$wechat)
    this.$wechat.getNetworkType({
      success (res) {
        let networkType = res.networkType // 返回网络类型2g，3g，4g，wifi
        console.log(networkType)
      }
    })
    // this.$http.post('/api').then(({data}) => {
    //   console.log(data)
    // })
  },
  methods: {
    ...mapMutations(['changeHomeTab']),
    onItemClick (index) {
      console.log('on item click:', index)
    },
  }
}
</script>
<style lang="less" scoped>

</style>

