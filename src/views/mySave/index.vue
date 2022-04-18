<template>
  <div class="my-save">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div
        class="my-save-cell"
        v-for="(item, index) in collectionList"
        :key="index"
      >
        <p class="my-save-cell-p">
          <span>收藏职位：</span><span>{{ item.jobtitle }}</span>
        </p>
        <p class="my-save-cell-p">
          <span>招聘企业：</span><span>{{ item.companyname }}</span>
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
            @click="handleClick('cancel', item.id)"
            >取消收藏</van-button
          >
          <van-button
            type="info"
            size="small"
            @click="handleClick('see', item.jobid)"
            native-type="submit"
            >查看职位</van-button
          >
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import Vue from "vue";
import { List, Button, Dialog, Toast } from "vant";
Vue.use(List);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Toast);
import { userCollectionApi, cancelJobApi } from "@s/api";
export default {
  data() {
    return {
      finished: false,
      loading: false,
      collectionList: [],
      joblist_sum: 0,
    };
  },
  created() {
    this.getListData();
  },
  methods: {
    handleClick(type, id) {
      switch (type) {
        case "cancel":
          Dialog.confirm({
            title: "取消收藏",
            message: "确认取消收藏？",
          })
            .then(() => {
              cancelJobApi({ id }).then((res) => {
                Toast("取消收藏成功");
                this.getListData();
              });
            })
            .catch(() => {
              // on cancel
            });
          break;
        case "see":
          this.$router.push({
            path: "/jobDetail?id=" + id,
          });
          break;
      }
    },
    onLoad() {
      // if (this.joblist_sum > this.collectionList.length) {
      //   this.page = this.page + 1;
      //   this.getListData();
      // } else {
      //   this.finished = true;
      // }
    },
    getListData() {
      this.loading = true;
      userCollectionApi({
        uid: JSON.parse(localStorage.getItem("userInfo")).uid,
      }).then((res) => {
        this.loading = false;
        let { list } = res;
        this.collectionList = list;
        this.finished = true;
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