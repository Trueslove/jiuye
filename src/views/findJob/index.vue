<template>
  <div class="find-job">
    <!------------- 顶部搜索 ---------->
    <div class="find-header-wap">
      <headerSearch></headerSearch>
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="houseareaid"
          @change="handleChangeType"
          :options="arealist"
        />
        <van-dropdown-item
          v-model="housepriceid"
          @change="handleChangeType"
          :options="housepricelist"
        />
        <van-dropdown-item
          v-model="housetype"
          @change="handleChangeType"
          :options="jobcatelist"
        />
      </van-dropdown-menu>
    </div>
    <!------------- 最新职位 ---------->
    <div class="home-cell-list" v-if="joblist.length > 0">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          class="home-cell-item-job"
          v-for="item in joblist"
          :key="item.id"
          @click="handleToPage(item)"
        >
          <div class="home-i-job-t">
            <h3 class="home-i-job-t-h3">{{ item.title }}</h3>
            <span class="home-i-job-t-r">{{
              item.money == 0 ? "面议" : item.money + "元/月"
            }}</span>
          </div>
          <!-- 招聘信息 -->
          <div class="home-i-job-type">
            <span>{{ item.areaname }} | </span>
            <template>
              <span v-if="item.sex == 1">男 | </span>
              <span v-else-if="item.sex == 2">女 | </span>
              <span v-else>男女不限 | </span>
            </template>
            <span v-if="item.education">{{ item.education }} | </span>
            <span v-if="item.express">{{ item.express }} | </span>
            <span v-if="item.jobtype">{{ item.jobtype }} | </span>
            <span v-if="item.age">{{ item.age }} | </span>
            <!-- <span>{{title[0]}}{{item.num}}人</span> -->
          </div>
          <!-- 福利 -->
          <div class="home-i-job-fl">
            <span
              v-for="(itemChild, indexC) in item.special"
              :key="indexC"
              class="home-job-fl-item"
              >{{ itemChild }}</span
            >
          </div>
          <!-- 公司信息 -->
          <div class="home-i-job-info">
            <template>
              <img
                v-if="item.sex == 0"
                class="home-job-i-left"
                src="../../assets/male0.png"
                alt=""
              />
              <img
                v-else
                class="home-job-i-left"
                src="../../assets/male1.png"
                alt=""
              />
            </template>
            <div class="home-job-i-right">
              <div class="home-job-i-right-t">{{ item.companyname }}</div>
              <div class="home-job-i-right-b">
                <span>{{ item.address }}</span>
                <span>{{ item.createtime }}</span>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <van-empty v-if="joblist.length == 0" description="暂无信息" />
  </div>
</template>

<script>
import Vue from "vue";
import { Search, Icon, DropdownMenu, DropdownItem, List, Empty } from "vant";

Vue.use(Search);
Vue.use(Icon);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(List);
Vue.use(Empty);
import headerSearch from "../../components/headerSearch/index.vue";
import { jobListsApi, publicOptionApi } from "@s/api";
export default {
  components: {
    headerSearch,
  },
  data() {
    return {
      searchValue: "",
      houseareaid: "",
      housepriceid: "",
      housetype: "",
      arealist: [{ text: "全部", value: "" }],
      housepricelist: [{ text: "薪资范围", value: "" }],
      jobcatelist: [{ text: "职业类别", value: "" }],
      loading: false,
      finished: false,
      joblist: [], // 列表数据
      joblist_sum: 0, // 总条数
      page: 1,
    };
  },
  created() {
    this.getListData();
    this.getOptionData();
  },
  methods: {
    handleToPage(row) {
      this.$router.push({
        path: "/jobDetail?id=" + row.id,
      });
    },
    onSearch() {},
    handleChangeType() {
      this.joblist = [];
      this.getListData();
    },
    onLoad() {
      if (this.joblist_sum > this.joblist.length) {
        this.page = this.page + 1;
        this.getListData();
      } else {
        this.finished = true;
      }
    },
    getListData() {
      this.loading = true;
      let { houseareaid, housepriceid, housetype, page } = this;
      jobListsApi({
        cityid: "17",
        houseareaid,
        housepriceid,
        housetype,
        page
      }).then((res) => {
        let { joblist, joblist_sum, jobcatelist } = res;
        jobcatelist.forEach((item) => {
          item.text = item.name;
          item.value = item.id;
        });
        this.jobcatelist = this.jobcatelist.concat(jobcatelist);
        this.joblist_sum = joblist_sum;
        this.joblist = this.joblist.concat(joblist);
        this.loading = false;
      });
    },
    getOptionData() {
      publicOptionApi({ city: "泉州" }).then((res) => {
        let { housepricelist, arealist } = res;
        housepricelist.forEach((item) => {
          item.text = item.name;
          item.value = item.id;
        });
        arealist.forEach((item) => {
          item.text = item.name;
          item.value = item.id;
        });
        this.arealist = this.arealist.concat(arealist);
        this.housepricelist = this.housepricelist.concat(housepricelist);
      });
    },
  },
};
</script>

<style lang="scss" scope>
.find-job {
  padding: 100px 0 50px 0;
  .find-header-wap {
    position: fixed;
    top: 0;
    width: 100%;
    .home-address {
      font-size: 14px;
      padding-right: 5px;
      color: #e62129;
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