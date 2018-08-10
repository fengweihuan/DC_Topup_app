<template>
<div class="orderlist">
    订单列表
    <router-link tag="p" to="/fromWord">呵呵达</router-link>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {

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
    ...mapMutations(['changeHomeTab'])
  }
}
</script>
<style lang="less" scoped>

</style>

