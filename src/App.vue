<template>
  <div id="app">
    <div v-transfer-dom class="register">
      <confirm v-model="show"
      title="绑定手机"
      @on-confirm="onConfirm"
      :close-on-confirm="false"
      @on-hide="onHide">
        <div style="text-align:center;" >
          <div class=" tel_input">
            <x-input v-model="phone"  placeholder="请填写手机号码" required is-type="china-mobile" type='tel'></x-input>
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
      show: true,
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
  methods: {
    onConfirm (value) {
      console.log(value)
      console.log('onConfirm')
    },
    onHide () {
      // console.log('onHide')
    },
    clickHandle () {
      console.log(666)
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(this.phone)) {
        this.$vux.toast.text('请输入正确的手机', 'top')
        return false
      }
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
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';

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
