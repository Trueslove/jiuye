<template>
  <div class="home">
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
    <!------------- 企业信息 ---------->
    <div class="tongji">
      <div class="tj-cell">
        <img src="../../assets/tongji.png" alt="" />
      </div>
      <div class="tj-cell">
        入驻企业:<span>{{ companycount }}</span>
      </div>
      <div class="tj-cell">
        岗位:<span>{{ jobcount }}</span>
      </div>
      <div class="tj-cell">
        简历:<span>{{ notecount }}</span>
      </div>
    </div>

    <!------------- type类型 ---------->
    <div class="home-type-wap">
      <div
        class="home-t-item"
        v-for="(item, index) in navlist"
        :key="index"
        @click="handleToPage(item, 2)"
      >
        <img class="home-t-icon" :src="item.thumb" alt="" />
        <p class="home-t-label">{{ item.advname }}</p>
      </div>
    </div>
    <!------------- 事业,人才 ---------->
    <div class="home-sr-wap">
      <img
        class="home-sr-img"
        v-for="(item, index) in display_window"
        :key="index"
        :src="item.img"
        @click="handleToPage(item)"
      />
    </div>
    <!------------- 写简历,发布职位 ---------->
    <div class="home-jj-wap">
      <van-button
        style="width: 100%"
        icon="edit"
        color="#62c7b5"
        type="primary"
        to="/myNote"
        >写简历找工作</van-button
      >
      <!-- <van-button icon="edit" class="jj-button" color="#75aac9" type="primary"
        >免费发布职位</van-button
      > -->
    </div>
    <!------------- 名企专区 ---------->
    <div class="home-cell-wap">
      <div class="home-cell-title">名企专区</div>
      <div class="home-cell-content">
        <img
          v-for="(item, index) in companylist"
          :key="index"
          class="home-cell-c-img"
          :src="item.thumb"
          alt=""
          @click="handleToPage(item, 1, '/companydetail')"
        />
      </div>
    </div>
    <!------------- 最新人才 ---------->
    <div class="home-cell-wap" style="margin-top: 10px">
      <div class="home-cell-title">最新人才</div>
      <div class="home-cell-content">
        <div
          class="home-cell-item"
          v-for="(item, index) in notelist"
          :key="index"
          @click="handleToPage(item, 1, '/workerDetail')"
        >
          <template>
            <img
              class="home-cell-c-img home-cell-c-male"
              :src="item.avatarUrl"
              alt=""
            />
          </template>
          <p class="home-cell-ite-txt">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!------------- 最新职位 ---------->
    <div class="home-cell-wap" style="margin-top: 10px">
      <div class="home-cell-title">最新职位</div>
      <div class="home-cell-list">
        <div
          class="home-cell-item-job"
          v-for="(item, index) in joblist"
          :key="index"
          @click="handleToPage(item, 1, '/jobDetail')"
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

import { homeApi, homeInitApi } from "@s/api";
import headerSearch from "../../components/headerSearch/index.vue";
export default {
  name: "home",
  components: {
    headerSearch,
  },
  data() {
    return {
      companycount: 1, // 入驻企业
      jobcount: 0, // 岗位
      notecount: 0, // 简历
      searchValue: "",
      display_window: [], // 事业外编
      joblist: [], //
      navlist: [], // 菜单导航
      companylist: [], // 名企专区
      bannerlist: [], // 轮播
      notelist: [], // 最新人才
    };
  },
  mounted() {},
  created() {
    if (localStorage.getItem("homeInfo")) {
      let res = JSON.parse(localStorage.getItem("homeInfo"));
      this.handleHomeInfo(res);
    } else {
      this.getHomeData();
    }
    this.getHomeInitData();
  },
  methods: {
    handleToPage(row, type = 0, pathUrl) {
      if (type == 0) {
        // 轮播跳转
        if (row.link || row.href) {
          let link = (row.link || row.href).split("/weixinmao_zp/pages");
          let linkUrl = link[1];
          this.$router.push({
            path: linkUrl.replace("/index", ""),
          });
        }
      } else if (type == 2) {
        // 导航
        let link = row.link;
        let toPath = "";
        if (link === "toMyNote") {
          toPath = "/demolition";
        } else if (link === "toFindworker") {
          toPath = "/recruitRc";
        } else if (link === "toArticle") {
          toPath = "/navSecond?id=" + row.cateid;
        } else if (link === "toLogin") {
          // toPath = "/login";
        } else if (link === "toNotevideo") {
          toPath = "/notevideo";
        } else if (link === "toActive") {
          toPath = "/active";
        }
        this.$router.push({
          path: toPath,
        });
      } else if (type == 1) {
        this.$router.push({
          path: `${pathUrl}?id=${row.id}`,
        });
      }
    },
    getHomeInitData() {
      homeInitApi({ city: "泉州" }).then((res) => {
        let { companycount, notecount, jobcount } = res;
        this.jobcount = jobcount;
        this.companycount = companycount;
        this.notecount = notecount;
      });
    },
    getHomeData() {
      homeApi({ city: "泉州", id: 215 }).then((res) => {
        this.handleHomeInfo(res);
        localStorage.setItem("homeInfo", JSON.stringify(res));
      });
    },
    handleHomeInfo(res) {
      let {
        joblist,
        navlist,
        companylist,
        bannerlist,
        notelist,
        display_window,
      } = res;
      this.joblist = joblist;
      this.navlist = navlist;
      this.companylist = companylist;
      this.bannerlist = bannerlist;
      this.display_window = display_window;
      notelist.forEach((item) => {
        if (item.avatarUrl.search("/resource/images") != -1) {
          let sex = item.sex;
          item.avatarUrl =
            sex === 1
              ? require("../../assets/male0.png")
              : require("../../assets/male1.png");
        }
      });
      this.notelist = notelist;
    },
    onSearch() {},
  },
};
</script>
<style scoped lang="scss">
.home {
  padding-bottom: 80px;
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
.home-cell-item {
  height: 135px;
  .home-cell-c-male {
    border-radius: 50%;
  }
  .home-cell-ite-txt {
    font-size: 12px;
    color: #999;
    text-align: center;
  }
}
.home-cell-item:last-child {
  margin-right: 10px;
}
.home-cell-content {
  width: 100%;
  display: flex;
  padding-top: 10px;
  overflow-x: scroll;
}
.home-cell-c-img {
  width: 100px;
  height: 100px;
  margin-left: 10px;
  object-fit: cover;
}
.home-cell-c-img:last-child {
  margin-right: 10px;
}
.home-cell-title {
  font-size: 12px;
  height: 40px;
  line-height: 40px;
  padding: 0 5px;
  border-bottom: 1px solid #ccc;
}
.home-cell-title::before {
  content: "|";
  height: 40px;
  width: 6px;
  background: #3274e5;
  margin-right: 10px;
}
.home {
  background: #fff;
  height: calc(100vh - 50px);
  overflow: auto;
}

.home-jj-wap {
  display: flex;
  justify-content: space-between;
  padding: 15px 10px;
  .jj-button {
    width: 49%;
  }
}

.home-sr-wap {
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  .home-sr-img {
    width: 32%;
    height: 95px;
  }
}

.home-type-wap {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 20px 0;
  .home-t-item {
    width: 25%;
    text-align: center;
    margin-bottom: 10px;
  }
  .home-t-icon {
    width: 40px;
    height: 40px;
  }
  .home-t-label {
    font-size: 12px;
  }
}

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

.home-address {
  font-size: 14px;
  padding-right: 5px;
  color: #fff;
}

.tongji {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  margin-top: 10px;
  flex-wrap: wrap;
  font-size: 14px;
  color: #3e3e3e;
}

.tongji {
  .tj-cell:nth-child(1) {
    margin-left: 55px;
  }
  .tj-cell {
    margin-left: 10px;
    > span {
      color: red;
    }
    > img {
      width: 17px;
      height: 17px;
    }
  }
}
</style>
