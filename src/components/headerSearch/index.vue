<template>
  <van-search
    v-model="searchValue"
    placeholder="请输入查询信息"
    :background="background"
    @focus="handleToPageSearch"
  >
    <template #left>
      <van-icon name="location" :color="color" size="14" />
      <div :style="'color:' + color" class="home-address">{{ city }}</div>
    </template>
  </van-search>
</template>

<script>
import Vue from "vue";
import { Search, Icon } from "vant";

Vue.use(Search);
Vue.use(Icon);
export default {
  props: {
    color: {
      type: String,
      default: "#e62129",
    },
    background: {
      type: String,
      default: "#ffffff",
    },
  },
  data() {
    return {
      searchValue: "",
      city: JSON.parse(localStorage.getItem("userInfo")).city || "泉州"
    };
  },
  methods: {
    handleToPageSearch() {
      this.$router.push({
        path: "/search",
      });
    },
  },
};
</script>

<style>
.home-address {
  font-size: 14px;
  padding-right: 5px;
  color: #e62129;
}
</style>