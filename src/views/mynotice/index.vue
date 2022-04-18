<template>
  <div class="my-save">
    <van-list :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="my-save-cell" v-for="(item, index) in jobList" :key="index">
        <p class="my-save-cell-p">
          <span>{{ title[0] }}：</span><span>{{ item.jobtitle }}</span>
        </p>
        <p class="my-save-cell-p">
          <span>应聘企业：</span><span>{{ item.companyname }}</span>
        </p>
        <p class="my-save-cell-p">
          <span>联系电话：</span><span>{{ item.tel }}</span>
        </p>
        <p class="my-save-cell-p">
          <span>负责人：</span><span>{{ item.mastername }}</span>
        </p>
        <p class="my-save-cell-p">
          <span>创建时间：</span><span>{{ item.createtime }}</span>
        </p>
        <div class="my-save-cell-btn">
          <van-button
            type="danger"
            size="small"
            native-type="submit"
            style="margin-right: 10px"
            >{{ item.status == 0 ? "未通知" : "已通知" }}</van-button
          >
          <van-button
            type="info"
            size="small"
            @click="handleClick('see', item.id)"
            native-type="submit"
            >查看职位</van-button
          >
        </div>
      </div>
    </van-list>
    <van-empty v-if="jobList.length == 0" description="暂无内容" />
  </div>
</template>

<script>
import Vue from "vue";
import { List, Button, Dialog, Toast, Empty } from "vant";
Vue.use(List);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Empty);
import { interviewNoticApi } from "@s/api";
export default {
  data() {
    return {
      finished: false,
      loading: false,
      jobList: [],
      joblist_sum: 0,
      title: [],
    };
  },
  created() {
    this.getListData();
  },
  methods: {
    handleClick(type, id) {
      switch (type) {
        case "see":
          this.$router.push({
            path: "/jobDetail?id=" + id,
          });
          break;
      }
    },
    onLoad() {
      // if (this.joblist_sum > this.jobList.length) {
      //   this.page = this.page + 1;
      //   this.getListData();
      // } else {
      //   this.finished = true;
      // }
    },
    getListData() {
      this.loading = true;
      interviewNoticApi({
        uid: JSON.parse(localStorage.getItem("userInfo")).uid,
      }).then((res) => {
        let { list, title } = res;
        this.title = title;
        this.jobList = list;
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.my-save-cell {
  background: #fff;
  margin-bottom: 10px;
  .my-save-cell-p {
    font-size: 13px;
    color: #333;
    border-bottom: 1px solid #fdf8f8;
    line-height: 35px;
    padding: 0 15px;
  }
  .my-save-cell-btn {
    display: flex;
    justify-content: flex-end;
    padding: 10px 15px;
  }
}
</style>