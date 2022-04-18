<template>
  <div id="app">
    <div class="app-header" v-if="isShowHeader">
      <van-nav-bar
        :title="title"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <div :class="isShowHeader ? 'app-content' : ''">
      <router-view />
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar, Toast } from "vant";
// import { getUserApi } from "@s/api";

Vue.use(NavBar);
Vue.use(Toast);
export default {
  data() {
    return {
      isShowHeader: "",
      transitionName: "",
    };
  },
  watch: {
    $route(to, from) {
      window.mztMiniApp.stores.isBack = false;
      this.isShowHeader = to.meta.isShowHeader;
      this.title = to.meta.title;
    },
  },
  methods: {
    onSwipeRight() {
      window.mztMiniApp.goback();
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      Toast("按钮");
    },
  },
};
</script>
<style lang="scss">
#app {
  width: 100%;
  -webkit-overflow-scrolling: touch; // 处理苹果滑动卡顿效果
  overflow-x: hidden;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  position: absolute;
  top: 0;
  width: 100%;
  transition: transform 0.2s;
}
.slide-left-enter,
.slide-right-leave-to {
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}
.slide-right-leave-active {
  z-index: 2;
}
.app-content {
  margin-top: 45px;
  height: calc(100% - 45px);
}
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  .van-hairline--bottom::after {
    border-bottom-width: 0;
  }
  .van-nav-bar__content {
    background-color: #0180cf;
    color: #fff;
    border-bottom: none;
    .van-nav-bar__text,
    .van-nav-bar__title,
    .van-nav-bar__arrow {
      color: #fff;
    }
    .van-nav-bar__title {
      font-size: 12px;
    }
  }
}
</style>
