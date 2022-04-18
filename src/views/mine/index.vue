<template>
  <div class="mine">
    <!-- 个人信息 -->
    <div class="mine-header">
      <img class="mine-header-bj" src="../../assets/user/userbg.png" alt="" />
      <div class="mine-header-content">
        <template>
          <img
            class="mine-h-c-img"
            v-if="userInfo.avatarUrl"
            :src="userInfo.avatarUrl"
            alt=""
          />
          <img
            class="mine-h-c-img"
            v-else
            src="../../assets/user_img.png"
            alt=""
          />
        </template>
        <van-button type="text" class="mine-h-c-btn" size="mini">{{
          userInfo.name
        }}</van-button>
        <div class="mine-h-c-b">
          <div class="mine-h-b-l" @click="handleToPage('/myfind')">
            <img
              class="mine-h-b-icon"
              src="../../assets/user/matching.png"
              alt=""
            />
            <span class="mine-h-b-txt">我的求职</span>
            <span>{{ countinfo.jobrecord }}份</span>
          </div>
          <div
            class="mine-h-b-l"
            style="margin-left: 20px"
            @click="handleToPage('/mynotice')"
          >
            <img
              class="mine-h-b-icon"
              src="../../assets/user/interview.png"
              alt=""
            />
            <span class="mine-h-b-txt">通知面试</span>
            <span>{{ countinfo.noticerecord }}份</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 导航 -->
    <div class="mine-nav">
      <div class="mine-nav-li" @click="handleToPage('/myNote')">
        <img class="mine-nav-li-img" src="../../assets/user/edit.png" alt="" />
        <div>简历编辑</div>
      </div>
      <div class="mine-nav-li">
        <img
          class="mine-nav-li-img"
          src="../../assets/user/wanted.png"
          @click="handleToPage('/matchjob')"
          alt=""
        />
        <div>智能匹配</div>
      </div>
      <div class="mine-nav-li" @click="handleToPage('/complaint')">
        <img
          class="mine-nav-li-img"
          src="../../assets/user/complaint.png"
          alt=""
        />
        <div>投诉举报</div>
      </div>
      <div class="mine-nav-li" @click="handleToPage('/mySave')">
        <img
          class="mine-nav-li-img"
          src="../../assets/user/collect.png"
          alt=""
        />
        <div>我的收藏</div>
      </div>
    </div>

    <van-cell-group>
      <van-cell
        title="视频简历(需要先编辑)"
        icon="like-o"
        color="#f57562"
        @click="handleToPage('/myvideonote')"
        is-link
      />
      <van-cell
        title="刷新简历"
        @click="handleClick('shuaxin')"
        icon="comment-o"
        color="#f57562"
        is-link
      />
      <van-cell
        title="我的投诉"
        @click="handleClick('tousu')"
        icon="edit"
        color="#f57562"
        is-link
      />
    </van-cell-group>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Cell, CellGroup, Toast } from "vant";

Vue.use(Button);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Toast);
import { refreshNoticeApi, checkUserTelApi } from "@s/api";
export default {
  data() {
    return {
      userInfo: {},
      countinfo: {},
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.getDetailTel();
  },
  methods: {
    handleClick(type) {
      switch (type) {
        case "shipin": // 视频简历
          break;
        case "shuaxin": // 刷新简历
          refreshNoticeApi({
            uid: JSON.parse(localStorage.getItem("userInfo")).uid,
          }).then((res) => {
            Toast("刷新成功");
          });
          break;
        case "tousu": // 我的投诉
          this.$router.push({
            path: "/complaintList",
          });
          break;
      }
    },
    getDetailTel() {
      let { companyid, uid } = this.userInfo;
      checkUserTelApi({
        companyid,
        uid,
      }).then((res) => {
        this.countinfo = res.countinfo;
      });
    },
    handleToPage(url) {
      this.$router.push({
        path: url,
      });
    },
  },
};
</script>

<style lang="scss" scope>
.mine-header {
  position: relative;
  .mine-h-b-icon {
    height: 21px;
    width: 21px;
  }
  .mine-h-c-b {
    margin-top: 25px;
  }
  .mine-h-c-b,
  .mine-h-b-l {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: #ff9758;
    .mine-h-b-txt {
      color: #333;
      margin: 0 10px;
    }
  }
  .mine-h-c-btn {
    width: 100px;
    border: none;
    background: none;
    font-size: 16px;
    margin-top: -50px;
  }
  .mine-h-c-img {
    width: 78px;
    height: 78px;
    border-radius: 50%;
    border: 1px solid #a7d8f7;
    position: absolute;
    left: 0;
    right: 0;
    top: -39px;
    margin: auto;
  }
  .mine-header-bj {
    width: 100%;
    height: 210px;
  }
  .mine-header-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 340px;
    text-align: center;
    color: #333;
    background-color: #fff;
    padding: 50px 30px 20px;
    box-sizing: border-box;
    box-shadow: 0 2px 2px #ddd;
    border-radius: 10px;
  }
}
.mine-nav {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: #fff;
  .mine-nav-li {
    text-align: center;
    font-size: 13px;
  }
  .mine-nav-li-img {
    width: 50px;
    height: 50px;
    margin-bottom: 5px;
  }
}
</style>