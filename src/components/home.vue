<template>
  <div class="hello">
    <router-view></router-view>
    <tabbar>
      <tabbar-item selected show-dot link="/home/orderlist">
        <!-- <img slot="icon" src="../assets/demo/icon_nav_msg.png"> -->
        <span slot="label">订单列表</span>
      </tabbar-item>
      <tabbar-item  link="/home/member">
        <!-- <img slot="icon" src="../assets/demo/icon_nav_article.png"> -->
        <span slot="label">会员</span>
      </tabbar-item>
      <tabbar-item badge="2" link="/home/mine">
        <!-- <img slot="icon" src="../assets/demo/icon_nav_cell.png"> -->
        <span slot="label">个人中心</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell } from 'vux'
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
</style>
