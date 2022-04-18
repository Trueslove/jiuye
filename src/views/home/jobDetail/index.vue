<template>
  <div class="job-detail">
    <!------------- 最新职位 ---------->
    <div class="home-cell-list">
      <div class="home-cell-item-job">
        <div class="home-i-job-t">
          <h3 class="home-i-job-t-h3">{{ jobdetail.title }}</h3>
          <span class="home-i-job-t-r">{{
            jobdetail.money == 0 ? "面议" : jobdetail.money + "元/月"
          }}</span>
        </div>
        <!-- 福利 -->
        <div class="home-i-job-fl">
          <span class="home-job-fl-item">
            <template v-if="jobdetail.sex == 1"> 男 </template>
            <template v-else-if="jobdetail.sex == 2"> 女 </template>
            <template v-else> 男女不限 </template>
          </span>
          <span class="home-job-fl-item">{{ jobdetail.education }}</span>
          <span class="home-job-fl-item">{{ jobdetail.jobtype }}</span>
          <span class="home-job-fl-item">{{ jobdetail.age }}</span>
          <span class="home-job-fl-item">
            {{ title[0] }}{{ jobdetail.num }}人</span
          >
        </div>
        <!-- 公司信息 -->
        <!-- v-if="ispay == 1 || jobdetail.ispay == 0" -->
        <div class="home-i-job-info" @click="handleToPage">
          <template>
            <img class="home-job-i-left" :src="jobdetail.thumb" alt="" />
          </template>
          <div class="home-job-i-right">
            <div class="home-job-i-right-t">{{ jobdetail.companyname }}</div>
            <div class="home-job-i-right-b">
              <p>
                {{ jobdetail.companyworker }}| {{ jobdetail.companytype }}|{{
                  jobdetail.companycate
                }}
              </p>
              <p><van-icon name="location" /> {{ jobdetail.address }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 福利待遇 -->
    <div class="job-d-cell">
      <div class="job-d-cell-tit">福利待遇</div>
      <div class="job-d-cell-c">
        <div class="home-i-job-fl">
          <span
            class="home-job-fl-item"
            v-for="(item, index) in jobdetail.special"
            :key="index"
            >{{ item }}</span
          >
        </div>
      </div>
    </div>
    <!-- 联系方式 -->
    <!-- v-if="jobdetail.istel == 0" -->
    <div class="job-d-cell">
      <div class="job-d-cell-tit">联系方式</div>
      <div class="job-d-cell-c">
        <div class="home-i-job-fl">
          <div class="job-d-f-cell home-i-job-flex-i">
            <van-icon name="manager" color="#999" size="22" />
            <p class="job-d-f-tit" style="margin-left: 10px">
              {{ jobdetail.mastername }}
            </p>
          </div>
          <div class="job-d-f-cell home-i-job-flex-i">
            <van-icon name="phone-o" color="#999" size="22" />
            <p class="job-d-f-tit" style="margin-left: 10px">
              {{ jobdetail.tel }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 视频介绍 -->
    <div class="job-d-cell" v-if="!!jobdetail.videourl">
      <div class="job-d-cell-tit">视频介绍</div>
      <div class="job-d-cell-c">
        <video
          autoplay="true"
          :src="jobdetail.videourl"
          controls
          style="width: 100%; height: 225px; background: #000"
        ></video>
      </div>
    </div>
    <!-- 职位详情 -->
    <div class="job-d-cell">
      <div class="job-d-cell-tit">职位详情</div>
      <div class="job-d-cell-c" v-html="jobdetail.content"></div>
    </div>
    <!------------- 底部 ---------->
    <!-- <div class="job-d-footer" v-if="ispay == 1"> -->
    <div class="job-d-footer">
      <!-- <div style="background: #0180cf" class="job-d-f-cell">
        <van-icon name="share" color="#ffffff" />
      </div> -->
      <div
        style="background: #11cd6e"
        class="job-d-f-cell"
        @click="handleClick('tel')"
      >
        <van-icon name="phone-o" color="#ffffff" size="22" />
        <p class="job-d-f-tit">电话</p>
      </div>
      <div
        style="background: #fff"
        class="job-d-f-cell"
        @click="handleClick('save')"
      >
        <van-icon
          name="like-o"
          :color="savestatus == 1 ? 'red' : '#777676'"
          size="26"
        />
        <p
          class="job-d-f-tit"
          :style="savestatus == 1 ? 'color:red' : 'color: #777676'"
        >
          {{ savestatus == 1 ? "已收藏" : "收藏" }}
        </p>
      </div>
      <div
        style="background: #fe552e"
        class="job-d-f-cell"
        @click="handleClick('resume')"
      >
        <p class="job-d-f-tit">投递简历</p>
      </div>
    </div>
    <!------------- 底部 ---------->
    <!-- <div class="job-d-footer" v-if="ispay != 1">
      <van-button
        style="width: 100%"
        icon="edit"
        class="jj-button"
        color="#1aac19"
        type="primary"
        >打赏￥{{ jobdetail.dmoney }}查看联系方式</van-button
      >
    </div> -->
  </div>
</template>

<script>
import Vue from "vue";
import {
  Icon,
  GoodsAction,
  GoodsActionButton,
  GoodsActionIcon,
  Button,
  Toast,
  Dialog,
  Swipe,
  SwipeItem,
} from "vant";
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Icon);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Button);
Vue.use(Toast);
Vue.use(Dialog);
import {
  jobDetailApi,
  jobCheckCallApi,
  saveJobApi,
  cancelJobApi,
  resumeSendApi,
} from "@s/api";
export default {
  data() {
    return {
      jobdetail: {},
      title: [],
      intro: {},
      ispay: "",
      savestatus: "",
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getDetail();
  },
  methods: {
    handleClick(type) {
      switch (type) {
        case "tel": // 电话
          this.handleSeephone();
          break;
        case "save": // 收藏 ｜ 取消收藏
          if (this.savestatus == 1) {
            this.handleCancelJob();
          } else {
            this.handleSaveJob();
          }
          break;
        case "resume": // 投递简历
          this.handleResumeSend();
          break;
      }
    },
    handleToPage() {
      this.$router.push({
        path: "/companydetail?id=" + this.jobdetail.companyid,
      });
    },
    handleSaveJob() {
      // 收藏工作
      let { companyid } = this.jobdetail;
      saveJobApi({
        jobid: this.$route.query.id,
        uid: JSON.parse(localStorage.getItem("userInfo")).uid,
        companyid,
      }).then((res) => {
        Toast("收藏成功");
        this.savestatus = 1;
      });
    },
    handleResumeSend() {
      // 投递简历
      let { companyid } = this.jobdetail;
      resumeSendApi({
        jobid: this.$route.query.id,
        uid: JSON.parse(localStorage.getItem("userInfo")).uid,
        companyid,
      }).then((res) => {
        Toast(res.msg);
      });
    },
    handleCancelJob() {
      // 取消收藏
      let { companyid } = this.jobdetail;
      cancelJobApi({
        id: this.$route.query.id,
        jobid: this.$route.query.id,
        uid: JSON.parse(localStorage.getItem("userInfo")).uid,
        companyid,
      }).then((res) => {
        Toast("取消收藏成功");
        this.savestatus = 0;
      });
    },
    handleSeephone() {
      Dialog.alert({
        title: "联系方式",
        message: this.jobdetail.tel,
        confirmButtonText: "点击拨打",
      }).then(() => {
        window.location.href = `tel:${this.jobdetail.tel}`;
      });
      // 查看手机号
      let { companyid } = this.jobdetail;
      jobCheckCallApi({
        jobid: this.$route.query.id,
        uid: JSON.parse(localStorage.getItem("userInfo")).uid,
        companyid,
      }).then((res) => {});
    },
    getDetail() {
      jobDetailApi({
        id: this.$route.query.id,
        uid: JSON.parse(localStorage.getItem("userInfo")).uid,
      }).then((res) => {
        let { jobdetail, title, intro, ispay, savestatus } = res;
        this.intro = intro;
        this.title = title;
        this.jobdetail = jobdetail;
        this.ispay = ispay;
        this.savestatus = savestatus;
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.van-swipe {
  height: 600px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.job-detail {
  padding-bottom: 50px;
  background-color: #fff;
  .job-d-cell {
    background-color: #fff;
    margin-bottom: 10px;
    font-size: 12px;
    border-bottom: 1px solid #eeeeee;
    .job-d-cell-c {
      padding: 10px 10px 20px;
    }
    .job-d-cell-tit {
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      font-weight: bold;
      padding: 0 10px;
      border-bottom: 1px solid #eeeeee;
    }
  }
  .job-d-footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    .job-d-f-cell {
      height: 50px;
      width: 30%;
      text-align: center;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;
    }
    .job-d-f-cell:last-child {
      width: 40%;
    }
    .job-d-f-tit {
      font-size: 14px;
      color: #fff;
      width: 100%;
      margin-top: -5px;
    }
  }
  .home-cell-item-job {
    padding: 10px;
    background: #fff;
    font-size: 12px;
    border-bottom: 1px solid #eeeeee;
    .home-i-job-info {
      display: flex;
      margin-top: 20px;
    }
    .home-job-i-right-b {
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
      font-size: 18px;
    }
    .home-i-job-t-r {
      font-weight: bold;
      font-size: 18px;
      color: #ff4129;
    }
  }
  .home-i-job-fl {
    font-size: 12px;
    margin-top: 15px;
    .home-job-fl-item {
      margin-right: 5px;
      border-radius: 2.5px;
      padding: 5px;
      margin-top: 5px;
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
  .home-i-job-flex-i {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
  }
}
</style>