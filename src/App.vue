<template>
  <div id="app">
    <div v-transfer-dom class="register" ref="register">
      <confirm v-model="show"
      title="绑定手机"
      @on-confirm="onConfirm"
      :close-on-confirm="false"
      @on-hide="onHide"
      mask-z-index = "999"
      class="confirm_content">
        <div style="text-align:center;" >
          <div class=" tel_input">
            <x-input v-model="phone" placeholder="请填写手机号码" required is-type="china-mobile" type='number'></x-input>
          </div>
          <div class="warp">
            <div class="tel_input proving">
              <x-input v-model="proving"  placeholder="输入验证码" required  type='number'></x-input>
            </div>
            <div class="prving_btn">
              <x-button @click.native="clickHandle" :type="provingType"  :disabled="provingDisabled">{{ provingText }}</x-button>
            </div>
          </div>
        </div>
      </confirm>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import storge from '@/utils/storge'
import { Confirm, XInput, XButton } from 'vux'
import { setInterval, clearInterval } from 'timers'
export default {
  name: 'app',
  data () {
    return {
      show: false,
      phone: '',
      proving: '',
      provingType: 'primary',
      provingDisabled: false,
      provingText: '获取验证'
    }
  },
  components: {
    Confirm,
    XInput,
    XButton
  },
  created () {
    let openid = storge.getItem('openid')
    // if (!openid) {
    //   this.$router.push('/auth')
    // }
  },
  methods: {
    async onConfirm (value) {
      this.show = false
      // 发送校验验证吗ajax
      let res = await this.$http.post('customer/login', {
        customer_mobile: this.phone,
        sms_code: this.proving
      })
      console.log(res)
      if(res.data.errno === 0) {
        this.$vux.toast.show({
          text: '注册成功'
        })
        storge.setItem('isLogin', 'yes')
        this.getUserInfo()
      }
    },
    onHide () {
      // console.log('onHide')
      this.proving = ''
      this.phone = ''
    },
    clickHandle () {
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(this.phone)) {
        this.$vux.toast.text('请输入正确的手机', 'top')
        return false
      }
      this.sendPhone()
      this.provingType = ''
      this.provingDisabled = true
      this.provingText = 60
      let timer = setInterval(() => {
        if (this.provingText <= 0) {
          this.provingType = 'primary'
          this.provingDisabled = false
          this.provingText = '获取验证'
          clearInterval(timer)
        } else {
          this.provingText -- 
        }
      }, 1000)
    },
    // 发送手机号码
    async sendPhone () {
      // console.log(this.$http)customer_mobile: this.phone
      // let res = await this.$http.get('customer/login?customer_mobile=' + this.phone)
      let res = await this.$http.post('customer/sms',{
        customer_mobile: this.phone,
        sms_template: 'check_code'
      })
    },
    // 获取用户信息
    async getUserInfo () {
      // ajax获取用户信息
      let res = await this.$http.get('customer/info' )
      console.log(res)
      if(res.data.errno === 0) {
        let userInfo = {
          customer_mobile: res.data.data.customer_mobile,
          customer_name: res.data.data.customer_nickname ,
          customer_avatar: res.data.data.customer_avatar 
        }
        storge.setItem('userInfo', userInfo)
        console.log(storge.getItem('userInfo'))
      }
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import './style/base.less';

body {
  background-color: #fbf9fe;
  .register{
    .tel_input{
      border-radius: 6px;
      border: 1px solid #ddd;
    }
    .warp{
      margin-top: 10px;
      display: flex;
      .prving_btn{
        flex: 1;
      }
      .proving{
        // width: 30vw
        flex: 1;
        margin-right: 10px;
      }
    }
  }
}
</style>
