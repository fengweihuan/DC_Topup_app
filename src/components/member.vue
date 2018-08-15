<template>
  <div class="member">
    <tab :line-width=2  v-model="index" custom-bar-width="50px"	>
      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list" @click="demo2 = item" :key="index">{{item}}</tab-item>
    </tab>
    <swiper v-model="index" height="600px" :show-dots="false">
      <swiper-item v-for="(item, index) in list" :key="index">
        <div class="tab-swiper vux-center">{{item}} Container</div>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import { mapMutations } from 'vuex' 
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
const getlist = () => ['微信/QQ', '银行', '其他']
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
      demo2: '微信/QQ',
      list: getlist(),
    }
  },
  methods: {
    ...mapMutations(['changeHomeTab']),
    onItemClick (index) {
      console.log('on item click:', index)
    },
    hidePhone (phone) {
      return phone.slice(0, 3) + '****' + phone.slice(-4)
    },
  },
  created () {
    this.changeHomeTab('member')
  }
}
</script>
<style lang="less" scoped>

</style>

