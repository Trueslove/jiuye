<template>
  <div class="search">
    <div class="search-header">
      <van-search
        v-model="keyword"
        show-action
        placeholder="请输入相关职位或企业名称"
      >
        <template #action>
          <van-button type="danger" size="small" @click="getListData"
            >搜索</van-button
          >
        </template>
      </van-search>
    </div>
    <div class="search-content-wap">
      <div class="search-c-tit">搜索结果</div>
      <div class="search-c">
        <!------------- 最新职位 ---------->
        <div class="home-cell-list" v-if="joblist.length > 0">
          <div
            class="home-cell-item-job"
            v-for="item in joblist"
            :key="item.id"
            @click="handleToPage(item)"
          >
            <div class="home-i-job-t">
              <h3 class="home-i-job-t-h3">{{ item.title }}</h3>
              <span class="home-i-job-t-r">{{ item.areaname }}</span>
            </div>
            <!-- 福利 -->
            <div class="home-i-job-fl">
              <template v-for="(itemChild, indexC) in item.special">
                <span v-if="itemChild" :key="indexC" class="home-job-fl-item">{{
                  itemChild
                }}</span>
              </template>
            </div>
            <!-- 公司信息 -->
            <div class="home-i-job-info">
              <img class="home-job-i-left" :src="item.thumb" alt="" />
              <div class="home-job-i-right">
                <div class="home-job-i-right-t">{{ item.companyname }}</div>
                <div class="home-job-i-right-b">
                  <span style="color: #ff4129">{{
                    item.money == 0 ? "面议" : item.money + "元/月"
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <van-empty description="未查到相关信息" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Button, Search, Empty } from "vant";
Vue.use(Button);
Vue.use(Search);
Vue.use(Empty);
import { searchApi } from "@s/api";
export default {
  data() {
    return {
      joblist: [],
      keyword: "",
    };
  },
  methods: {
    handleToPage(row) {
      this.$router.push({
        path: "/jobDetail?id=" + row.id,
      });
    },
    getListData() {
      this.loading = true;
      let { keyword } = this;
      searchApi({
        keyword,
      }).then((res) => {
        this.joblist = res;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  background: #fff;
  height: 100%;
  .search-header {
    position: fixed;
    left: 0;
    right: 0;
    border-bottom: 1px solid #efefef;
    z-index: 1;
  }
  .van-search__action {
    margin-top: -8px;
    .van-button {
      width: 60px;
    }
  }
  .search-c {
    overflow: scroll;
  }
  .search-content-wap {
    padding-top: 60px;
    background: #fff;
    .search-c-tit {
      height: 40px;
      line-height: 40px;
      font-size: 13px;
      position: relative;
      padding: 0 20px;
      border-bottom: 1px solid #efefef;
    }

    .search-c-tit::before {
      content: "";
      position: absolute;
      left: 10px;
      top: 10px;
      width: 3px;
      height: 20px;
      background: #3274e5;
    }
  }

  .home-cell-item-job {
    padding: 10px;
    background: #fff;
    border-bottom: 1px solid #ccc;
    font-size: 12px;
    .home-i-job-info {
      display: flex;
      margin-top: 5px;
    }
    .home-job-i-right-t {
      height: 30px;
    }
    .home-job-i-right-b {
      display: flex;
      justify-content: space-between;
      color: #979596;
    }
    .home-job-i-left {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
    .home-job-i-right {
      flex: 1;
    }
    .home-i-job-t {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #000;
    }
    .home-i-job-t-h3 {
      font-weight: bold;
      font-size: 14px;
    }
    .home-i-job-t-r {
      font-weight: bold;
      color: #ff4129;
    }
    .home-i-job-fl {
      margin-top: 10px;
      .home-job-fl-item {
        border-radius: 2.5px;
        padding: 5px;
        margin: 0 5px 5px 0;
        display: inline-block;
      }
      .home-job-fl-item:nth-child(2n - 1) {
        background: #e4fcdc;
        color: #76af58;
      }
      .home-job-fl-item:nth-child(2n) {
        background: #fef5da;
        color: #ea994e;
      }
      .home-job-fl-item:nth-child(4n - 1) {
        background: #daf2fe;
        color: #30a2c8;
      }
    }
  }
}
</style>