<template>
  <div id="app">
    <div v-transfer-dom class="register" ref="register">
      <confirm v-model="show"
      title="绑定手机"
      @on-confirm="onConfirm"
      :close-on-confirm="false"
      @on-hide="onHide">
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
      provingText: '获取验证码'
    }
  },
  components: {
    Confirm,
    XInput,
    XButton
  },
  created () {
    // console.log(window.localStorage.openid)
    let openid = window.localStorage.getItem('openid')
    console.log(openid)
    if (!openid) {
      // this.$router.push('/auth')
    }
    this.getUserInfo()
  },
  methods: {
    onConfirm (value) {
      console.log(this.proving)
      console.log('onConfirm')
      // 发送校验验证吗ajax
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
          this.provingText = '获取验证码'
          clearInterval(timer)
        } else {
          this.provingText -- 
        }
      }, 1000)
    },
    // 发送手机号码
    async sendPhone () {
      // console.log(this.$http)customer_mobile: this.phone
      let res = await this.$http.get('customer/login?customer_mobile=' )
      console.log(res)
    },
    // 获取用户信息
    getUserInfo () {
      // ajax获取用户信息
      let userInfo = {
        userName: '冯卫环',
        userAwater: 'http://p949rmsaf.bkt.clouddn.com/QQ%E5%9B%BE%E7%89%8720180516101622.jpg'
      }
      window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
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
