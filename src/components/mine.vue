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
          <span class="user_tel user_text">{{phone ? phone : '暂无'}}</span><span @click.prevent="bindClick" class="tobinding" v-if="!phone">去绑定</span></p>
          
      </div>
    </div>
    <div class="tips">暂无更多</div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex' 
import VipImg from '@/assets/vip.png'
import NovipImg from '@/assets/novip.png'
export default {
  data () {
    return {
      userName: '',
      phone: '',
      userAwater: '',
      isVip: false,
      vipImg: NovipImg
    }
  },
  created () {
    this.changeHomeTab('mine')
    let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    this.userName = userInfo.userName
    this.userAwater = userInfo.userAwater
    this.phone = userInfo.phone
  },
  methods: {
    bindClick () {
      this.$router.app.$children[0].show = true
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

