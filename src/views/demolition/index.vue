<template>
  <div class="demolition">
    <img class="demolition-img" :src="dataInfo.labor_force" alt="" />
    <div class="demolition-content">
      <p class="demolition-content-t">您好:</p>
      <div class="demolition-introduce" v-html="dataInfo.introduce"></div>
      <div style="margin: 20px 0">
        <van-button type="primary" color="#079ef7" block to="/myNote"
          >立即登记</van-button
        >
      </div>
      <p class="demolition-content-t">温馨提示：</p>
      <div class="demolition-introduce" v-html="dataInfo.reminder"></div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button } from "vant";
Vue.use(Button);
import { laborForcetApi } from "@s/api";
export default {
  data() {
    return {
      dataInfo: {},
    };
  },
  created() {
    this.getDataInfo();
  },
  methods: {
    getDataInfo() {
      laborForcetApi().then((res) => {
        this.dataInfo = res;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.demolition {
  background-color: #fff;
  height: 100%;
}
.demolition-img {
  height: 152px;
  width: 100%;
  object-fit: cover;
}
.demolition-content {
  padding: 20px 15px;
  .demolition-content-t {
    font-size: 16px;
  }
}
.demolition-introduce {
  font-size: 14px;
  text-indent: 30px;
  line-height: 25px;
}
</style>