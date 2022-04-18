<template>
  <div class="recruit-rc">
    <!------------- 顶部搜索 ---------->
    <div class="find-header-wap">
      <headerSearch></headerSearch>
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="houseareaid"
          @change="handleChangeType"
          :options="labourList"
        />
        <van-dropdown-item
          v-model="housepriceid"
          @change="handleChangeType"
          :options="jobcatelist"
        />
        <van-dropdown-item
          v-model="housetype"
          @change="handleChangeType"
          :options="housetypelist"
        />
        <van-dropdown-item
          v-model="letway"
          @change="handleChangeType"
          :options="housewaylist"
        />
      </van-dropdown-menu>
    </div>
    <!------------- 最新职位 ---------->
    <div class="home-cell-list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          class="home-cell-item-job"
          v-for="(item, index) in worklist"
          :key="index"
          @click="handleToPage(item)"
        >
          <!-- 公司信息 -->
          <div class="home-i-job-info">
            <template>
              <img
                v-if="item.sex == 1"
                class="home-job-i-left"
                src="../../assets/male1.png"
                alt=""
              />
              <img
                v-else
                class="home-job-i-left"
                src="../../assets/male0.png"
                alt=""
              />
            </template>
            <div class="home-job-i-right">
              <div class="home-i-job-t">
                <h3 class="home-i-job-t-h3">{{ item.name }}</h3>
                <span class="home-i-job-t-r">{{ item.createtime }}</span>
              </div>
              <div class="home-job-i-right-t">
                {{ item.sex == 1 ? "男" : "女" }} / {{ item.age }}岁 /
                {{ item.education }} / {{ item.express }}
              </div>
              <div class="home-job-i-right-b">{{ item.jobtitle }}</div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon, DropdownMenu, DropdownItem, List } from "vant";

Vue.use(Icon);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(List);
import { workerListApi, publicOptionApi } from "@s/api";
import headerSearch from "../../components/headerSearch/index.vue";
export default {
  components: {
    headerSearch,
  },
  data() {
    return {
      loading: false,
      finished: false,
      searchValue: "",
      housetype: "",
      housetypelist: [
        { text: "学历", value: "" },
        { text: "不限", value: 0 },
        { text: "初中", value: 1 },
        { text: "高中", value: 2 },
        { text: "中技", value: 3 },
        { text: "中专", value: 4 },
        { text: "大专", value: 5 },
        { text: "本科", value: 6 },
        { text: "硕士", value: 7 },
        { text: "博士", value: 8 },
        { text: "博后", value: 9 },
      ],
      letway: "",
      housewaylist: [
        { text: "筛选", value: "" },
        { text: "不限", value: 0 },
        { text: "全职", value: 1 },
        { text: "兼职", value: 2 },
      ],
      houseareaid: "",
      labourList: [
        { text: "劳动力", value: "" },
        { text: "全部", value: 0 },
      ],
      housepriceid: "",
      jobcatelist: [{ text: "行业", value: "" }],
      worklist: [],
      worklist_sum: 0, // 总条数
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
        path: "/workerDetail?id=" + row.id,
      });
    },
    onSearch() {},
    handleChangeType() {
      this.worklist = [];
      this.getListData();
    },
    onLoad() {
      if (this.worklist_sum >= this.worklist.length) {
        this.page = this.page + 1;
        this.getListData();
      } else {
        this.finished = true;
      }
    },
    getListData() {
      let { housetype, letway, houseareaid, housepriceid, page } = this;
      workerListApi({
        cityid: "17",
        housetype,
        letway,
        houseareaid,
        housepriceid,
        page
      }).then((res) => {
        let { worklist, worklist_sum } = res;
        this.worklist = this.worklist.concat(worklist);
        this.worklist_sum = worklist_sum;
        // 加载状态结束
        this.loading = false;
      });
    },
    getOptionData() {
      publicOptionApi({ city: "泉州", type: 1 }).then((res) => {
        let { jobcatelist, arealist } = res;
        console.log(res, jobcatelist);
        jobcatelist.forEach((item) => {
          item.text = item.name;
          item.value = item.id;
        });
        arealist.forEach((item) => {
          item.text = item.name;
          item.value = item.id;
        });
        this.labourList = this.labourList.concat(arealist);
        this.jobcatelist = this.jobcatelist.concat(jobcatelist);
      });
    },
  },
};
</script>

<style lang="scss" scope>
.recruit-rc {
  padding: 0 0 50px 0;
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
      margin-top: 10px;
    }
    .home-job-i-right-t {
      color: #646464;
    }
    .home-job-i-right-b {
      display: flex;
      justify-content: space-between;
      color: #646464;
      font-weight: bold;
      margin-top: 5px;
    }
    .home-job-i-left {
      width: 60px;
      height: 60px;
      border-radius: 50%;
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
  }
}
</style>