<template>
  <div class="active">
    <!------------- 顶部搜索 ---------->
    <div class="home-header-wap">
      <headerSearch></headerSearch>
    </div>
    <!------------- 主体内容 ---------->
    <div class="active-content">
      <div class="active-cell" v-for="(item, index) in list" :key="index">
        <!-- 图片详情 -->
        <div class="active-cell-img-wap" @click="handleToPage(item)">
          <img class="active-cell-img" :src="item.thumb" alt="" />
          <p class="active-img-tit">{{ item.title }}</p>
        </div>
        <!-- 时间 -->
        <div class="active-time-wap">
          <span class="active-time-btn">{{ item.status_str }}</span>
          <span>{{ item.begintime }}至{{ item.endtime }}</span>
        </div>
        <!-- 企业，参与人数 -->
        <div class="active-q-c active-flex">
          <div class="active-q active-flex">
            <img class="active-q-img" src="../../assets/qiye.png" alt="" />
            <span
              >企业<span style="font-weight: 600; color: #33b7bc">{{
                item.companycount
              }}</span
              >家</span
            >
          </div>
          <div class="active-c active-flex">
            <img class="active-q-img" src="../../assets/join.png" alt="" />
            <span
              >参与<span style="font-weight: 600; color: #33b7bc">{{
                item.jobrecordcount
              }}</span
              >人</span
            >
          </div>
        </div>
        <!-- 主办方,协办方 -->
        <div class="active-z-x">
          <p class="active-z-x-p">主办方：{{ item.mainwork }}</p>
          <p class="active-z-x-p">协办方：{{ item.fuwork }}</p>
        </div>
        <!-- 操作按钮 -->
        <div class="active-cz-btn active-flex">
          <!-- <van-button
            style="margin-right: 10px"
            type="primary"
            color="#33B7BC"
            block
            size="small"
            @click="handleCheck(item)"
            >企业报名参会</van-button
          > -->
          <van-button
            type="primary"
            size="small"
            block
            plain
            @click="handleCheck(item)"
            >个人进入会场</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Toast } from "vant";
Vue.use(Button);
Vue.use(Toast);
import headerSearch from "../../components/headerSearch/index.vue";
import { activeListsApi, activeCheckApi } from "@s/api";
export default {
  components: {
    headerSearch,
  },
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getListData();
  },
  mounted() {},
  methods: {
    handleToPage(row) {
      this.$router.push({
        path: `/activedetail?id=${row.id}`,
      });
    },
    handleCheck(row) {
      // 个人参加
      activeCheckApi({ aid: row.id, companyid: row.companyid }).then((res) => {
        let { error, msg } = res;
        if (error == 0) {
          this.$router.push({
            path: `/activedetail?id=${row.id}`,
          });
        } else if (error == 1) {
          Toast(msg);
        }
      });
    },
    getListData() {
      activeListsApi().then((res) => {
        let { list } = res;
        this.list = list;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.active-flex {
  display: flex;
  align-content: center;
}
.active-content {
  .active-cell {
    padding: 10px;
    background-color: #fff;
    font-size: 12px;
    .active-cz-btn {
      justify-content: space-between;
      margin-top: 10px;
    }
    .active-z-x {
      margin-top: 10px;
      .active-z-x-p {
        line-height: 25px;
        font-size: 14px;
      }
    }
    .active-q-c {
      line-height: 22px;
      .active-q {
        margin-right: 50px;
      }
      .active-q-img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
    }
    .active-time-wap {
      padding: 5px 0;
      .active-time-btn {
        height: 25px;
        line-height: 25px;
        background: #33b7bc;
        border-radius: 4px;
        color: #fff;
        padding: 0 5px;
        margin-right: 10px;
      }
    }
    .active-cell-img-wap {
      position: relative;
      .active-cell-img {
        height: 190px;
        width: 100%;
      }
      .active-img-tit {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #fff;
        padding-left: 10px;
        background: rgba($color: #000000, $alpha: 0.7);
      }
    }
  }
}
</style>