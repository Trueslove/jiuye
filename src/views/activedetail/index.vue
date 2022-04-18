<template>
  <div class="active-d">
    <div class="active-d-header">
      <p class="active-d-h-tit">{{ activeinfo.title }}</p>
      <p class="active-d-h-time">
        时间：{{ activeinfo.begintime }}至{{ activeinfo.endtime }}
      </p>
      <p class="active-d-h-time">主办：{{ activeinfo.mainwork }}</p>
    </div>
    <van-notice-bar left-icon="volume-o" :scrollable="false">
      <van-swipe
        vertical
        class="notice-swipe"
        :autoplay="2000"
        :show-indicators="false"
      >
        <van-swipe-item v-for="(item, index) in list" :key="index">{{
          item.companyname
        }}</van-swipe-item>
      </van-swipe>
    </van-notice-bar>
    <div class="active-d-content">
      <!-- 搜索 -->
      <div class="active-c-info">
        <div class="active-c-i-search">
          <van-search
            show-action
            placeholder="请输入搜索关键词"
            action-text="搜索"
            @focus="handleToPageSearch"
          />
        </div>
        <div class="active-c-i-flex">
          <div class="active-i-c-cell">
            <p>{{ total.companycount }}</p>
            <span>参会企业</span>
          </div>
          <div class="active-i-c-cell">
            <p>{{ total.jobcount }}</p>
            <span>招聘岗位</span>
          </div>
          <div class="active-i-c-cell">
            <p>{{ total.jobrecordcount }}</p>
            <span>参与求职者</span>
          </div>
        </div>
        <p :class="{ 'active-c-i-p-more': isMore, 'active-c-i-p': !isMore }">
          {{ activeinfo.content }}
        </p>
        <van-button
          type="primary"
          size="small"
          block
          plain
          @click="handleSeeMore"
          :disabled="isMore"
          >查看更多</van-button
        >
      </div>
      <!-- 列表 -->
      <div class="active-c-item">
        <div
          class="active-c-item-cell"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="active-item-c-header">
            <div class="active-item-img">
              <img
                style="width: 100%; height: 100%; object-fit: none"
                :src="
                  item.thumb ? item.thumb : require('../../assets/findwork.png')
                "
                alt=""
              />
            </div>
            <p class="active-company-name">{{ item.companyname }}</p>
          </div>
          <div class="active-item-c-jobs">
            <div
              class="active-jobs-flex"
              v-for="(n, indexC) in item.joblist_four"
              :key="indexC"
            >
              <li class="active-jobs-l">{{ n.jobtitle }}</li>
              <li style="color: #f00">{{ n.money }}</li>
            </div>
            <div class="active-jobs-flex">
              <li style="color: #999">共有{{ item.jobnum }}在招职位</li>
              <li style="color: #3266cc" @click="handleToPage(item)">
                查看更多>
              </li>
            </div>
          </div>
          <div class="active-item-td">
            <van-button
              type="info"
              size="small"
              block
              @click="handleResumeSend(item)"
              >投递简历</van-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { NoticeBar, Swipe, SwipeItem, Button, Search, Toast } from "vant";
Vue.use(NoticeBar);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Button);
Vue.use(Search);
Vue.use(Toast);
import { activeDetailApi, resumeSendApi } from "@s/api";
export default {
  data() {
    return {
      isMore: false,
      list: [],
      activeinfo: {},
      total: {},
    };
  },
  created() {
    this.getListData();
  },
  mounted() {},
  methods: {
    handleSeeMore() {
      this.isMore = true;
    },
    handleResumeSend(row) {
      // 投递简历
      resumeSendApi({
        jobid: row.id,
        uid: JSON.parse(localStorage.getItem("userInfo")).uid,
        companyid: row.companyid,
      }).then((res) => {
        Toast(res.msg);
      });
    },
    handleToPageSearch() {
      this.$router.push({
        path: "/search",
      });
    },
    handleToPage(row) {
      this.$router.push({
        path: "/companydetail?id=" + row.companyid,
      });
    },
    getListData() {
      let { id } = this.$route.query;
      activeDetailApi({ id }).then((res) => {
        let { list, activeinfo, total } = res;
        this.list = list;
        this.activeinfo = activeinfo;
        this.total = total;
      });
    },
  },
};
</script>
<style>
.van-notice-bar__wrap {
  height: 40px;
}
</style>
<style lang="scss" scoped>
.active-d {
  background: #f7f5f5;
}
.active-item-c-jobs {
  margin-top: 10px;
  .active-jobs-flex {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    line-height: 30px;
    .active-jobs-l {
      position: relative;
      padding-left: 15px;
    }
    .active-jobs-l::before {
      content: "";
      width: 5px;
      height: 5px;
      background-color: #3266cc;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      margin-top: auto;
      margin-right: auto;
      margin-bottom: auto;
      margin-left: auto;
    }
  }
}
.active-item-td {
  width: 40%;
  margin: 20px auto 0;
}
.active-c-item {
  margin-top: 50px;
  .active-c-item-cell {
    border-radius: 6px;
    background: #fff;
    padding: 20px 10px;
    margin-bottom: 60px;
  }
  .active-item-c-header {
    border-bottom: 1px dashed #ddd;
    .active-item-img {
      overflow: hidden;
      display: block;
      margin: -49px auto 0;
      width: 78px;
      height: 78px;
      border-radius: 50%;
      border: 2px solid #fff;
    }
    .active-company-name {
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      padding: 10px 0;
    }
  }
}
.active-c-info {
  border-radius: 6px;
  background: #fff;
  padding: 10px;
  .active-c-i-search {
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 19px;
    .van-search {
      padding: 0;
      background: none;
    }
    .van-search__content {
      background: none;
    }
  }
  .active-c-i-flex {
    display: flex;
    justify-content: space-around;
    margin-bottom: 15px;
    .active-i-c-cell {
      font-size: 13px;
      text-align: center;
      > p {
        margin-bottom: 5px;
        font-weight: 600;
        color: #333;
      }
      > span {
        color: #999;
      }
    }
  }
  .active-c-i-p {
    font-size: 13px;
    line-height: 25px;
    color: #666;
    margin-bottom: 10px;
    display: -webkit-box; /**对象作为伸缩盒子模型展示**/
    -webkit-box-orient: vertical; /**设置或检索伸缩盒子对象的子元素的排列方式**/
    -webkit-line-clamp: 2; /**显示的行数**/
    overflow: hidden; /**隐藏超出的内容**/
  }
  .active-c-i-p-more {
    font-size: 13px;
    line-height: 25px;
    color: #666;
    margin-bottom: 10px;
  }
}
.active-d-header {
  height: 158px;
  padding: 25px 45px 0;
  background: #3266cc;
  text-align: center;
  color: #fff;
  .active-d-h-tit {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 15px;
  }
  .active-d-h-time {
    font-size: 14px;
    margin-top: 10px;
  }
}
.active-d-content {
  padding: 10px;
}
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
</style>
