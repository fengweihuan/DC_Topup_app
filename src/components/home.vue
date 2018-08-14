<template>
  <div class="hello">
    <router-view></router-view>
    <tabbar>
      <tabbar-item :selected ="homeTab === 'list'"  link="/home/orderlist">
        <img slot="icon" class="iconImg" src="../assets/list.png">
        <img slot="icon-active" class="iconImg" src="../assets/list_active.png">
        <span slot="label">订单列表</span>
      </tabbar-item>
      <tabbar-item  :selected ="homeTab === 'member'" link="/home/member">
        <img slot="icon" class="iconImg" src="../assets/member.png">
        <img slot="icon-active" class="iconImg" src="../assets/member_active.png">
        <span slot="label">会员</span>
      </tabbar-item>
      <tabbar-item :selected ="homeTab === 'mine'"  link="/home/mine">
        <img slot="icon" class="iconImg" src="../assets/mine.png">
        <img slot="icon-active" class="iconImg" src="../assets/mine_active.png">
        <span slot="label">个人中心</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell } from 'vux'
import { mapState } from 'vuex'
export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  },
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    ...mapState({
      homeTab: state => state.homeTab
    })
  },
  methods: {
    test () {
      this.$router.push('/fromWord')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.iconImg{
  height: 24px;
  width: 24px;
}
</style>
