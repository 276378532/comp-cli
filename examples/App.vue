<template>
   <div style="height:100%">
    <el-container style="height:100%">
      <el-header height="40">
        <header-model></header-model>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <menu-model></menu-model>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import HeaderModel from './components/header'
import MenuModel from './components/menu'
export default {
  components: {
    HeaderModel,
    MenuModel
  },
  name: 'App',
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['getCounter'])
  },

  methods: {
    ...mapActions(['add'])
  }
};
</script>

<style lang="scss" >
@import './assets/styles/var.scss';
.App {
  text-align: center;
  color: $primary-color;
  font-size: 28px;
}
.content{
  text-align: left;
  h2,h3,h4{
    font-weight: 400;
    color: #1f2f3d;
  }
  h2{
     font-size: 28px;
     margin-top: 0px;
     .header-anchor{
       width: 16px;
       height: 34px;
     }
  }
  h3{
     font-size: 22px;
     .header-anchor{
       width: 13px;
       height: 27px;
     }
  }
  h4{
    font-size: 18px;
  }
  p{
    font-size: 14px;
    color: #5e6d82;
  }
  .header-anchor{
    float: left;
    margin-left: -20px;
    opacity: 0;
    cursor: pointer;
    color: #409eff;
    &:hover{
      opacity: 0.7;
    }
  }
}
</style>