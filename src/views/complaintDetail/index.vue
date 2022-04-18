<template>
  <div class="complain-d">
    <van-panel :title="info.content">
      <div class="complain-d-t">投诉时间：{{ info.time }}</div>
      <div class="complain-d-t">事件描述：{{ info.content }}</div>
    </van-panel>
    <van-panel title="投诉人基本信息">
      <div class="complain-d-cell">投诉人：{{ info.toushuren }}</div>
      <div class="complain-d-cell">联系电话：{{ info.tel }}</div>
      <div class="complain-d-cell">身份证号：{{ info.cardid }}</div>
      <div class="complain-d-cell">涉及投诉人数：{{ info.num }}人</div>
    </van-panel>
    <van-panel title="被投诉人基本信息">
      <div class="complain-d-cell">单位名称：{{ info.danwei }}</div>
      <div class="complain-d-cell">所属村镇：{{ info.cun }}</div>
      <div class="complain-d-cell">联系人：{{ info.phpel }}</div>
      <div class="complain-d-cell">联系方式：{{ info.phone }}</div>
    </van-panel>
    <van-panel v-if="info.status == 1" title="事件进展进度" status="待处理">
    </van-panel>
    <van-panel v-if="info.status == 2" title="事件进展进度" status="处理中">
    </van-panel>
    <van-panel v-if="info.status == 3" title="事件进展进度" status="已完成">
    </van-panel>
  </div>
</template>

<script>
import Vue from "vue";
import { Panel } from "vant";

Vue.use(Panel);
import { feedbackDetailApi } from "@s/api";
export default {
  data() {
    return {
      info: {},
      id: "",
      companyid: "",
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.companyid = this.$route.query.companyid;
    this.handleGetInfo();
  },
  methods: {
    handleGetInfo() {
      feedbackDetailApi({ id: this.id }).then((res) => {
        this.info = res;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.complain-d-t {
  font-size: 14px;
  color: #333;
  line-height: 40px;
  padding: 0 40px;
}
.complain-d-cell {
  font-size: 14px;
  color: blueviolet;
  line-height: 40px;
  padding: 0 40px;
}
</style>