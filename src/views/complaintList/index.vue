<template>
  <div class="complaint">
    <!------------- 顶部搜索 ---------->
    <div class="home-header-wap">
      <headerSearch background="#3274e5" color="#ffffff"></headerSearch>
    </div>
    <!------------- 图片轮播 ---------->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in bannerlist" :key="index">
        <img v-lazy="image.thumb" @click="handleToPage(image)" />
      </van-swipe-item>
    </van-swipe>
    <div>
      <van-tabs v-model="status" @change="handleChangeStatus">
        <van-tab
          v-for="(item, index) in typeList"
          :title="item.name"
          :key="index"
          :name="item.type"
        >
          <van-list
            v-if="dataList.length > 0"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell-group inset>
              <van-cell
                v-for="(item, index) in dataList"
                :title="item.content"
                :key="index"
                @click="handleToPage(item)"
              />
            </van-cell-group>
          </van-list>
        </van-tab>
      </van-tabs>
      <van-empty v-if="dataList.length == 0" description="暂无信息" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Search,
  Icon,
  Swipe,
  SwipeItem,
  Lazyload,
  Button,
  Tab,
  Tabs,
  Cell,
  CellGroup,
  List,
  Empty,
} from "vant";

Vue.use(Search);
Vue.use(Icon);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Button);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(List);
Vue.use(Empty);

import { feedbackListApi, homeApi } from "@s/api";
import headerSearch from "../../components/headerSearch/index.vue";
export default {
  components: {
    headerSearch,
  },
  data() {
    return {
      typeList: [
        { name: "待处理", type: "1" },
        { name: "处理中", type: "2" },
        { name: "已完成", type: "3" },
      ],
      bannerlist: [],
      status: 1,
      dataList: [],
      list_sum: 0,
      finished: false,
      loading: false,
      page: 1,
    };
  },
  created() {
    this.getDataList();
    this.getHomeData();
  },
  methods: {
    onLoad() {
      if (this.list_sum > this.dataList.length) {
        this.page = this.page + 1;
        this.getListData();
      } else {
        this.finished = true;
      }
    },
    handleToPage(row) {
      let { id } = row;
      this.$router.push({
        path: "/complaintDetail?id=" + id,
      });
    },
    handleChangeStatus(value) {
      this.status = value;
      this.dataList = [];
      this.page = 1;
      this.finished = false;
      this.getDataList();
    },
    getHomeData() {
      homeApi({ city: "泉州" }).then((res) => {
        let { bannerlist } = res;
        this.bannerlist = bannerlist;
      });
    },
    getDataList() {
      this.loading = true;
      feedbackListApi({
        uid: JSON.parse(localStorage.getItem("userInfo")).uid,
        status: this.status,
        page: this.page,
      }).then((res) => {
        let { list_sum, list } = res;
        this.dataList = this.dataList.concat(list);
        this.list_sum = list_sum;
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.van-swipe {
  width: 100%;
  height: 205px;
  overflow: hidden;
}
.van-swipe-item {
  width: 100%;
  height: 100%;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>