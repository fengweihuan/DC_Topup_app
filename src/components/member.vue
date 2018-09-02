<template>
  <div class="member">
    <tab :line-width=2  v-model="index" custom-bar-width="50px"	>
      <tab-item class="vux-center" :selected="demo2 === items" v-for="(items, index) in list" @click="demo2 = items" :key="index">{{items}}</tab-item>
    </tab>
    <swiper v-model="index" :height="scrollHeight" :show-dots="false">
      <swiper-item v-for="(item, index) in list" :key="index">
         <scroll
          :data="listData[index]" 
          :style="{height: scrollHeight}"
          :pullup="true"
          @scrollToEnd="scrollToEnd">
          <div class="tab-swiper vux-center">
            <div class="tab_item vux-1px-b" v-for="(list, ind) in listData[index]" :key="ind">
              <a :href="list.voucher_url" style="display:inline-block;height:40px;"  class="item_button"><x-button type="primary" class="item_button">领取</x-button></a>
              <p class="item_title"> {{list.voucher_title}}</p>
              <p class="item_text"> {{list.voucher_claim_condition}} </p>
              <p class="item_content">
                <span   class="min_text" >{{ list.voucher_usage_condition }}</span>
                <span> {{ '|  截止至' + list.voucher_valid_to.slice(5, 10) }}</span>
              </p>
            </div>
          </div>
         </scroll>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import { mapMutations } from 'vuex' 
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
import scroll from '@/components/common/scroll.vue'
const getlist = () => ['微信/QQ', '银行', '其他']
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
      index: 0,
      demo2: '微信/QQ',
      list: getlist(),
      listData: [[],[],[]],
      pageIndex: 0,
      totalPage: 0,
      scrollHeight: '500px'
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
    scrollToEnd () {
      this.getListData()
    },
    async getListData() {
      if( this.pageIndex > this.totalPage) {
        return false
      }
      this.pageIndex ++
      let res = await this.$http.get('order/vouchers', {
        params: {
          current_page: this.pageIndex,
          number_per_page: 20
        }
      })
      // console.log(res)
      if(res.data.errno === 0) {
        console.log(res)
        this.pageIndex = res.data.data.currentPage
        this.totalPage = res.data.data.totalPages
        // this.listData[index].push(...res.data.data.data)
        let json = res.data.data.data
        json.forEach((item, index, arr) => {
          if (item.voucher_cate === '微信/QQ') {
            this.listData[0].push(item)
          } else if(item.voucher_cate === '银行') {
            this.listData[1].push(item)
          } else {
            this.listData[2].push(item)
          }
        })
      }
    }
  },
  created () {
    this.changeHomeTab('member')
    this.getListData()
    this.scrollHeight = window.innerHeight - 44 - 53 + 'px' 
  }
}
</script>
<style lang="less" scoped>
 @import '../style/index.less';
  .member{
    .tab-swiper{
      padding: 0 15px;
      background: #fff;
    }
    .item_text{
      color: @themeColor;
      margin-top: 3px;
      width: 60vw;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      display: inline-block;
    }
    .tab_item{
      padding: 10px 0;
      position: relative;
      .item_title{
        font-size: 18px;
      }
      .item_button{
        position: absolute;
        width: 80px;
        right: 10px;
        top: 50%;
        transform: translateY(-50%)
      }
      .item_content{
        margin-top: 3px;
        width: 70vw;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
</style>

