<template>
  <div class="company-d">
    <!-- 头部 -->
    <div class="company-d-header">
      <img
        class="company-d-h-img"
        src="http://wxpic.sso6.com/images/37/2020/08/pOzPC4gLE91TA5SCTcttzkCCStC5c0.jpg"
        alt=""
      />
      <p class="company-d-h-p">{{ companydetail.companyname }}</p>
    </div>
    <!-- 公司名片 -->
    <div class="company-d-card">
      <div class="company-d-card-cell company-d-card-cell-tit">公司名片</div>
      <div class="company-d-card-cell">
        规模 : {{ companydetail.companyworker }}
      </div>
      <div class="company-d-card-cell">
        行业 : {{ companydetail.companycate }}
      </div>
      <div class="company-d-card-cell">地址 : {{ companydetail.address }}</div>
    </div>
    <!-- 公司名片 -->
    <div class="company-d-card">
      <div class="company-d-card-cell company-d-card-cell-tit">公司简介</div>
      <div
        class="company-d-card-cell company-d-card-cell-c"
        v-html="companydetail.content"
      ></div>
    </div>
    <!-- 该企业正在招聘 -->
    <div class="company-d-card">
      <div class="company-d-card-cell company-d-card-cell-tit">
        该企业正在招聘
      </div>
    </div>

    <div class="home-cell-wap" style="margin-top: 10px">
      <div class="home-cell-list">
        <div
          class="home-cell-item-job"
          v-for="(item, index) in joblist"
          :key="index"
          @click="handleToPage(item)"
        >
          <div class="home-i-job-t">
            <h3 class="home-i-job-t-h3">
              {{ item.title }}
              <span class="home-i-job-t-span">({{ item.areaname }})</span>
            </h3>
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
            <template>
              <img
                class="home-job-i-left"
                src="http://wxpic.sso6.com/images/37/2020/08/pOzPC4gLE91TA5SCTcttzkCCStC5c0.jpg"
                alt=""
              />
            </template>
            <div class="home-job-i-right">
              <div class="home-job-i-right-t">{{ item.companyname }}</div>
              <div class="home-job-i-right-b">
                <span>{{
                  item.money == 0 ? "面议" : item.money + "元/月"
                }}</span>
                <span>{{ item.createtime }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Search, Icon, Swipe, SwipeItem, Lazyload, Button } from "vant";

Vue.use(Search);
Vue.use(Icon);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Button);

import { companyDetailApi } from "@s/api";
export default {
  name: "home",
  data() {
    return {
      companydetail: {},
      joblist: [], //
    };
  },
  mounted() {},
  created() {
    this.getDetail();
  },
  methods: {
    handleToPage(row) {
      this.$router.push({
        path: "/jobDetail?id=" + row.id,
      });
    },
    getDetail() {
      companyDetailApi({ id: this.$route.query.id }).then((res) => {
        let { companydetail, joblist } = res;
        this.joblist = joblist;
        this.companydetail = companydetail;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.company-d-card {
  margin-top: 10px;
  .company-d-card-cell {
    min-height: 23px;
    line-height: 23px;
    padding: 12px;
    background-color: #fff;
    font-size: 14px;
    border-bottom: 1px solid #efefef;
    color: #747474;
  }
  .company-d-card-cell-tit {
    color: #000;
    font-weight: 600;
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
    height: 30px;
  }
  .home-job-i-right-b {
    display: flex;
    justify-content: space-between;
    color: #979596;
    margin-top: 10px;
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
    .home-i-job-t-span {
      font-weight: 400;
      color: #999;
    }
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
      margin: 0 0 0 5px;
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
.company-d-header {
  height: 175px;
  background-color: #3274e5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .company-d-h-img {
    height: 70px;
    width: 70px;
    border: 3px solid #fff;
    border-radius: 50%;
  }
  .company-d-h-p {
    width: 100%;
    color: #fff;
    font-size: 14px;
    text-align: center;
    margin-top: -50px;
  }
}

.company-d-card-cell-c {
  p {
    font-size: 14px;
    line-height: 20px;
    text-decoration: 10px;
  }
}
</style>