<template>
<div class="orderlist">
    <!-- 订单列表 -->
    <!-- <router-link tag="p" to="/fromWord">呵呵达</router-link> -->
    <tab :line-width=2  v-model="tabindex" custom-bar-width="50px"	>
      <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list" @click="demo2 = item" :key="index">{{item}}</tab-item>
    </tab>
    <swiper v-model="tabindex" :height="scrollHeight" :show-dots="false" :min-moving-distance="50">
      <swiper-item v-for="(item, index) in list" :key="index">
        <scroll 
          :data="listData[index]" 
          :style="{height: scrollHeight}"
          :pullup="true"
          @scrollToEnd="scrollToEnd">
          <div class="tab-swiper vux-center">
            <div class="tab_list vux-1px-b" :class="'tab' + index" v-for="(list, index1) in listData[index]" :key="index1">
              <p class="list_no">订单编号:  {{ list.order_code }}</p>
              <p class="list_name">{{list.order_receiver ? list.order_receiver : '未知姓名'}}</p>
              <p>手机号码:  {{ list.mobile_no ? hidePhone(list.mobile_no) : '未知' }}</p>
              <x-button v-if="index === 0" :type=" list.order_status === 'new' ? 'primary' : ''" class="receive" @click.native="receiveHandle(list)">接单</x-button>
            </div>
            <p class="tips" v-if="listData[index].length === 0">暂无数据！</p>
          </div>
        </scroll>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import scroll from '@/components/common/scroll.vue'
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
const getlist = () => ['待充值业务', '我的订单']
export default {
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    scroll
  },
  data () {
    return {
      tabindex: 0,
      demo2: '待充值业务',
      list: getlist(),
      pageSize: 10,
      listData: [[],[]],
      scrollHeight: '600px'
    }
  },
  created () {
    this.changeHomeTab('list')
    this.tabindex = this.$route.query.tabindex == 1 ? 1 : 0
    this.scrollHeight = window.innerHeight - 44 - 53 + 'px' 
    getlist().forEach((list, index, arr) => {
      this['pageIndex' + index] = 0
      this['totalPage' + index] = 0
    })
    this.getListData(0)
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
  watch: {
    tabindex (index) {
      if(this.listData[index].length === 0) {
        this.getListData(index)
      }
    }
  },
  methods: {
    ...mapMutations(['changeHomeTab']),
    // 翻页
    scrollToEnd () {
      this.getListData(this.tabindex)
    },
    hidePhone (phone) {
      return phone.slice(0, 3) + '****' + phone.slice(-4)
    },
    // 接单
    async receiveHandle (row) {
      console.log(row)
      let res = await this.$http.post('order/pick', {
        order_id: row.order_id + ''
      })
      if(res.data.errno === 0) {
        this.$vux.toast.show({
          text: '接单成功'
        })
        this.getListData(0)
      }
    },
    async getListData(index) {
      let pageIndex = this['pageIndex' + index]
      let totalPage = this['totalPage' + index] 
      if( pageIndex > totalPage) {
        return false
      }
      pageIndex ++
      let url = index === 0 ? 'order/list': 'order/history'
      let res = await this.$http.get(url, {
        params: {
          current_page: pageIndex,
          number_per_page: 20
        }
      })
      // console.log(res)
      if(res.data.errno === 0) {
        this['pageIndex' + index] = res.data.data.currentPage
        this['totalPage' + index] = res.data.data.totalPages
        this.listData[index].push(...res.data.data.data)
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .orderlist{
    .tab-swiper{
      padding: 0 15px;
    }
    .tab_list{
      padding:  15px 0px;
      position: relative;
      color: #666;
      &.tab1{
        p{
          width: 100%;
        }
      }
      p{
        white-space: nowrap;
        width: 56vw;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .receive{
        width: 100px;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%)
      }
      &:last-child::after{
        display: none;
      }
    }
    .tips{
      color: #999;
      text-align: center;
      margin-top: 40px;
    }
  }
</style>

