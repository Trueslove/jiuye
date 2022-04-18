<template>
  <div class="worker-d">
    <div class="worker-d-header"></div>
    <div class="worker-d-video-wap">
      <video class="video-wap" :src="workerdetail.videourl"></video>
    </div>
    <!-- 个人信息 -->
    <div class="worker-d-info-wap">
      <div class="worker-d-h-info">
        <div class="worker-d-h-img-wap">
          <template v-if="workerdetail.sex == 1">
            <template>
              <img
                class="worker-d-h-img"
                v-if="workerdetail.avatarUrl"
                :src="workerdetail.avatarUrl"
                alt=""
              />
              <img
                class="worker-d-h-img"
                v-else
                src="../../assets/male1.png"
                alt=""
              />
            </template>
            <img class="worker-d-h-sex" src="../../assets/new/man.png" alt="" />
          </template>
          <template v-else>
            <template>
              <img
                class="worker-d-h-img"
                v-if="workerdetail.avatarUrl"
                :src="workerdetail.avatarUrl"
                alt=""
              />
              <img
                class="worker-d-h-img"
                v-else
                src="../../assets/male0.png"
                alt=""
              />
            </template>
            <img
              class="worker-d-h-sex"
              src="../../assets/new/woman.png"
              alt=""
            />
          </template>
        </div>
        <div class="worker-d-flex worker-d-name">
          <span style="color: #000; font-size: 18px">{{
            workerdetail.name
          }}</span>
          <span
            >（{{ workerdetail.sex == 1 ? "男" : "女" }}，{{
              workerdetail.age
            }}岁）</span
          >
        </div>
        <div class="worker-d-flex worker-d-p">
          <div class="worker-d-flex worker-d-f-icon" style="margin-right: 10px">
            <img
              class="worker-d-f-icon"
              src="../../assets/new/education.png"
              alt=""
            />
            <span>{{ workerdetail.education }}</span>
          </div>
          <div class="worker-d-flex worker-d-f-icon">
            <img
              class="worker-d-f-icon"
              src="../../assets/new/medal.png"
              alt=""
            />
            <span>{{ workerdetail.express }}</span>
          </div>
        </div>
        <div class="worker-d-nhom">现居{{ workerdetail.address }}</div>
      </div>
    </div>
    <div class="worker-d-card-wap">
      <div class="worker-d-card">
        <div class="worker-d-card-tit">
          <img
            class="worker-d-card-icon"
            src="../../assets/new/personal.png"
            alt=""
          />
          <span>视频简历</span>
        </div>
        <div class="worker-d-card-c worker-d-card-video">
          <div class="worker-d-video-left">
            <video :src="workerdetail.videourl"></video>
          </div>
          <div class="worker-d-video-left">
            <video :src="workerdetail.videourl"></video>
            <video :src="workerdetail.videourl"></video>
          </div>
        </div>
      </div>
      <!-- 求职意向 -->
      <div class="worker-d-card">
        <div class="worker-d-card-tit">
          <img
            class="worker-d-card-icon"
            src="../../assets/new/personal.png"
            alt=""
          />
          <span>求职意向</span>
        </div>
        <div class="worker-d-card-c">
          <div class="worker-card-cell">
            <span class="worker-card-label">意向职位：</span>
            <span class="worker-card-value">{{ workerdetail.jobtitle }}</span>
          </div>
          <div class="worker-card-cell">
            <span class="worker-card-label">出生年份：</span>
            <span class="worker-card-value">{{ workerdetail.birthday }}</span>
          </div>
          <div class="worker-card-cell">
            <span class="worker-card-label">目前状态：</span>
            <span class="worker-card-value">{{
              workerdetail.currentname
            }}</span>
          </div>
          <div class="worker-card-cell">
            <span class="worker-card-label">期望行业：</span>
            <span class="worker-card-value">{{
              workerdetail.jobcatename
            }}</span>
          </div>
          <div class="worker-card-cell">
            <span class="worker-card-label">期望薪资：</span>
            <span class="worker-card-value">{{ workerdetail.money }}</span>
          </div>
          <div class="worker-card-cell">
            <span class="worker-card-label">工作地区：</span>
            <span class="worker-card-value">{{ workerdetail.areaname }}</span>
          </div>
        </div>
      </div>
      <!-- 联系方式 -->
      <div class="worker-d-card">
        <div class="worker-d-card-tit">
          <img
            class="worker-d-card-icon"
            src="../../assets/new/phone.png"
            alt=""
          />
          <span>联系方式</span>
        </div>
        <div class="worker-d-card-c" style="padding-top: 0">
          <!-- <van-button
            type="primary"
            color="#33B7BC"
            block
            size="small"
            @click="handleSeephone"
            v-if="!showcontact"
            >查看联系方式</van-button
          > -->
          <span style="font-size: 16px; line-height: 20px">{{
            workerdetail.tel
          }}</span>
        </div>
      </div>
      <!-- 自我介绍及工作经历 -->
      <div class="worker-d-card">
        <div class="worker-d-card-tit">
          <img
            class="worker-d-card-icon"
            src="../../assets/new/phone.png"
            alt=""
          />
          <span>自我介绍及工作经历</span>
        </div>
        <div
          class="worker-d-card-c worker-d-card-js"
          v-html="workerdetail.content"
        ></div>
      </div>
    </div>
    <div class="worker-d-footer">
      <van-button type="primary" @click="handleYqms" color="#f60" block
        >邀请面试</van-button
      >
    </div>
    <van-popup v-model="isuser" closeable>
      <div class="ckjl-box">
        <p class="ckjl-box-title">查看简历</p>
        <div class="ckjl-box-content">
          <p class="ckjl-box-p">1、个人用户可直接购买套餐后可看</p>
          <p class="ckjl-box-p">2、企业用户登录后，购买套餐即可查看</p>
        </div>
        <div style="ckjl-box-btn">
          <van-button
            @click="toLookUser"
            type="primary"
            size="small"
            block
            style="margin: 10px 0"
            >普通用户</van-button
          >
          <!-- <van-button @click="toLookContact" type="danger" size="small" block
            >企业用户</van-button
          > -->
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Popup, Toast, Dialog } from "vant";
Vue.use(Button);
Vue.use(Popup);
Vue.use(Toast);
Vue.use(Dialog);
import { videoDetailApi, workerRecordApi, interviewNoticeApi } from "@s/api";
export default {
  data() {
    return {
      workerdetail: {},
      id: "",
      showcontact: true,
      isuser: false,
      userInfo: {}
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.id = this.$route.query.id;
    this.getDetail();
  },
  methods: {
    handleYqms() {
      let { companyid, uid } = this.userInfo;
      interviewNoticeApi({
        companyid,
        uid
      }).then((res) => {
        Toast("邀请成功");
      });
    },
    toLookUser() {
      workerRecordApi({
        id: this.id,
        uid: JSON.parse(localStorage.getItem("userInfo")).uid,
        notetype: "0",
      }).then((res) => {
        let { showcontact, status } = res;
        if (status == 1) {
          Dialog.alert({
            title: "系统提示",
            message: "您的查看简历次数达到了上限,请到用户套餐购买！",
          }).then(() => {
            this.$router.push({
              path: "/lookrole",
            });
            // to page lookrole
          });
        } else {
          this.showcontact = showcontact;
        }
      });
    },
    handleSeephone() {
      this.isuser = true;
    },
    getDetail() {
      videoDetailApi({
        id: this.id,
      }).then((res) => {
        let { workerdetail, showcontact } = res;
        this.workerdetail = workerdetail;
        this.showcontact = showcontact;
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.worker-d-video-wap {
  margin: -250px 0 50px 0;
  padding: 0 15px;
  .video-wap {
    width: 100%;
    height: 150px;
    background: rgba($color: #000000, $alpha: 0.4);
  }
}
.ckjl-box {
  width: 300px;
  overflow: hidden;
  padding: 20px;
  .ckjl-box-title {
    font-size: 16px;
    text-align: center;
  }
  .ckjl-box-content {
    margin-top: 15px;
  }
  .ckjl-box-p {
    font-size: 14px;
  }
}
.worker-d {
  padding-bottom: 70px;
  background-color: #f5f5f5;
}
.worker-d-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
.worker-d-card-wap {
  padding: 0 15px;
  .worker-d-card {
    background-color: #fff;
    border-radius: 10px;
    margin-top: 10px;
    .worker-d-card-tit {
      height: 53px;
      display: flex;
      align-items: center;
      padding-left: 15px;
      font-size: 16px;
      border-bottom: 1px solid #ddd;
      .worker-d-card-icon {
        height: 22px;
        width: 22px;
        margin-right: 10px;
      }
    }
    .worker-d-card-c {
      padding: 20px 35px;
      .worker-card-cell {
        line-height: 30px;
        font-size: 13px;
        .worker-card-label {
          color: #666;
        }
        .worker-card-value {
          color: #333;
        }
      }
    }
    .worker-d-card-video {
      display: flex;
    }
  }
}
.worker-d-card-js {
  font-size: 13px;
}
.worker-d-header {
  height: 300px;
  background-color: #3266cc;
}
.worker-d-info-wap {
  padding: 0 15px;
  .worker-d-h-info {
    background-color: #fff;
    border-radius: 10px;
    margin-top: -73px;
    padding-top: 50px;
    position: relative;
    width: 100%;
  }
  .worker-d-h-img-wap {
    height: 78px;
    width: 78px;
    border-radius: 50%;
    border: 2px solid #fff;
    position: absolute;
    left: 50%;
    margin-left: -39px;
    top: -39px;
    text-align: center;
    background-color: #fff;
  }
  .worker-d-h-img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
  .worker-d-h-sex {
    position: absolute;
    height: 25px;
    width: 25px;
    bottom: 0;
    right: 0;
    border-radius: 50%;
    border: 1px solid #fff;
  }
  .worker-d-flex {
    display: flex;
    justify-content: center;
  }
  .worker-d-name {
    font-size: 14px;
    color: #999;
    margin: 10px 0 10px 0;
    line-height: 30px;
  }
  .worker-d-nhom {
    margin-top: 15px;
    line-height: 45px;
    height: 45px;
    border-top: 1px solid #ddd;
    font-size: 16px;
    text-align: center;
    padding: 0 10px;
  }
  .worker-d-f-icon {
    align-items: center;
    font-size: 14px;
    color: #999;
    .worker-d-f-icon {
      height: 16px;
      width: 16px;
      margin-right: 5px;
    }
  }
}
</style>