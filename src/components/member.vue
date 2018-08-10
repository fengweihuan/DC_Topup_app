<template>
  <div class="member">
    会员中心
  </div>
</template>
<script>
import { mapMutations } from 'vuex' 
export default {
  data () {
    return {

    }
  },
  methods: {
    ...mapMutations(['changeHomeTab'])
  },
  created () {
    this.changeHomeTab('member')
  }
}
</script>
<style lang="less" scoped>

</style>

