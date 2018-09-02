<template>
  <div class="mine">
    <div class="banner">
      <div class="ban_l">
        <img :src="userAwater" :class="{'defalutAwater':!userAwater}" alt="" class="awater">
        <div class="vip" :class="isVip ? 'isVip' : ''">
          <img class="vip_img" :src="vipImg" alt="">
          <span>vip</span>
        </div>
      </div>
      <div class="ban_r">
        <p class=" user_list">
          <span class="user_img"><img src="../assets/info.png" alt=""></span>
          <span class="user_name user_text">{{userName}}</span>
        </p>
        <p class="user_list" style="margin-top:30px">
          <span class="user_img"><img src="../assets/phone.png" alt=""></span>
          <span class="user_tel user_text">{{phone && isLogin === 'yes' ? hidePhone(phone) : '暂无'}}</span><span @click.prevent="bindClick" class="tobinding" v-if="isLogin !== 'yes'">去绑定</span></p>
          
      </div>
    </div>
    <div class="banner banner1" >
      <div class="ban_l" style="flex: 1">
        <p>账户余额</p>
        <p>{{ wallet_balance / 1000 }}元</p>
      </div>
      <div class="ban_r" style="margin-right: 20px">
        <x-button type="primary" v-if="wallet_balance - 0 >= 5" @click.native="withdrawHandle">提现</x-button>
        <x-button  v-else>满5元可提现</x-button>
      </div>
    </div>
    <!-- <div class="tips">暂无更多</div> -->    
  </div>
</template>
<script>
import { mapMutations } from 'vuex' 
import storge from '@/utils/storge'
import VipImg from '@/assets/vip.png'
import NovipImg from '@/assets/novip.png'
import awaterImg from '@/assets/awater.png'
export default {
  data () {
    return {
      userName: '',
      phone: '',
      userAwater: '',
      isVip: false,
      vipImg: NovipImg,
      wallet_balance: '',
      isLogin: storge.getItem('isLogin')
    }
  },
  created () {
    this.changeHomeTab('mine')
    this.getUserInfo()
  },
  methods: {
    hidePhone (phone) {
      return phone.slice(0, 3) + '****' + phone.slice(-4)
    },
    bindClick () {
      this.$router.app.$children[0].show = true
    },
    withdrawHandle() {
      console.log(22)
      this.$vux.alert.show({
        title: '提示',
        content: '请回复公众号“提现”进行提现操作，自动提现功能将于近期开通。',
      })
    },
    // 获取用户信息
    async getUserInfo () {
      // ajax获取用户信息
      let res = await this.$http.get('customer/info' )
      console.log(res)
      if(res.data.errno === 0) {
        this.userName = res.data.data.customer_name ? res.data.data.customer_name : '未知'
        this.userAwater = res.data.data.customer_avatar ? res.data.data.customer_avatar : awaterImg
        this.phone = res.data.data.customer_mobile,
        this.wallet_balance = res.data.data.wallet_balance ? res.data.data.wallet_balance : ''
      }
    },
    ...mapMutations(['changeHomeTab'])
  },
  watch: {
    isVip (value) {
      if (value) {
        this.vipImg = VipImg
      } else {
        this.vipImg = NovipImg
      }
    }
  }
}
</script>
<style lang="less" scoped>
 @import '../style/index.less';
  .mine{
    padding: 10px;
    .banner{
      background-color: @themeColor;
      border-radius: 6px;
      color: #fff;
      padding: 20px 15px;
      display: flex;
      &.banner1 {
        background-color: #fff;
        margin-top: 20px;
        padding: 30px 15px;
        color: #666
      }
    }
    .awater{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #ddd;
      // margin: 4px auto ;
    }
    .ban_l{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .vip{
        display: flex;
        padding: 0 6px;
        background-color: #ddd;
        border-radius: 14px;
        font-size: 14px;
        margin-top: 8px;
        padding-bottom: 2px;
        color: #999;
        .vip_img{
          height: 20px;
          width: 20px;
          margin-right: 4px;
        }
        &.isVip {
          background-color: #f0b773;
          color: @themeColor;
        }
      }
    }
    .ban_r{
      margin-left: 30px;
    }
    .defalutAwater{
      // background: url(../../assets/HomeImg/awater.png) no-repeat;
      background-size: 40%;
      background-position: 50%;
      background-color: #ddd;
    }
    .user_list{
      height: 20px;
      display: flex;
        .tobinding{
          margin-left: 20px;
          height: 30px;
          width: 80px;
          border-radius: 30px;
          text-align: center;
          background-color: #f0b773;
          line-height: 30px;
        }
        .user_img{
          display: block;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #f0b773;
          display: flex;
          img{
            height: 20px;
            width: 20px;
            margin-left: 5px;
            margin-top: 5px;
          }
        }
        .user_text{
          margin-left: 10px;
        }
    }
    .tips{
      color: #999;
      text-align: center;
      margin-top: 100px;
    }
  }
</style>

