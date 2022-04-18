<template>
  <div class="nav-second">
    <!------------- 图片轮播 ---------->
    <div class="nav-second-banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in bannerlist" :key="index">
          <img v-lazy="image.thumb" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 导航 -->
    <div class="nav-second-nav" v-if="category.length > 0">
      <van-swipe>
        <van-swipe-item>
          <div class="nav-flex">
            <template v-for="(item, index) in category">
              <div
                class="nav-s-n-cell"
                :key="index"
                v-if="index < 4"
                @click="handleChangeNav(item)"
              >
                <img class="nav-s-n-img" :src="item.thumb" alt="" />
                <p
                  class="nav-s-n-tit"
                  :style="p_id_2 == item.id ? 'color: #3c7dff' : ''"
                >
                  {{ item.name }}
                </p>
              </div>
            </template>
          </div>
        </van-swipe-item>
        <van-swipe-item v-if="category.length > 4">
          <div class="nav-flex">
            <template v-for="(item, index) in category">
              <div
                class="nav-s-n-cell"
                :key="index"
                v-if="index > 3"
                @click="handleChangeNav(item)"
              >
                <img class="nav-s-n-img" :src="item.thumb" alt="" />
                <p
                  class="nav-s-n-tit"
                  :style="p_id_2 == item.id ? 'color: #3c7dff' : ''"
                >
                  {{ item.name }}
                </p>
              </div>
            </template>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 人事招聘 -->
    <div class="" v-if="cate.length > 0">
      <van-tabs
        v-model="p_id_3"
        animated
        title-active-color="#3c7dff"
        @change="handleChangeTab"
        color="#3c7dff"
        line-width="90"
      >
        <van-tab
          v-for="(itemPr, index) in cate"
          :key="index"
          :title="itemPr.name"
          :name="itemPr.id"
        >
          <div
            class="nav-s-cell nav-flex"
            v-for="(item, indexC) in activeLists"
            :key="indexC"
            @click="handleToPage(item)"
          >
            <img class="nav-s-cell-img" :src="item.thumb" alt="" />
            <div class="nav-s-cell-right">
              <p class="nav-s-cell-tit">
                {{ item.title }}
              </p>
              <p class="nav-s-cell-time">{{ item.createtime }}</p>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 类型 -->
    <div class="nav-s-type" v-if="cate.length == 0">
      <div class="nav-s-t-tit" v-if="title">
        <van-divider
          :style="{
            'font-size': '16px',
            width: '180px',
            color: '#000',
            borderColor: '#000',
            padding: '0 16px',
          }"
        >
          {{ title }}
        </van-divider>
      </div>
      <div class="nav-s-t-content" v-if="activeLists.length > 0">
        <div
          class="nav-s-cell nav-flex"
          v-for="(item, index) in activeLists"
          :key="index"
          @click="handleToPage(item)"
        >
          <img class="nav-s-cell-img" :src="item.thumb" alt="" />
          <div class="nav-s-cell-right">
            <p class="nav-s-cell-tit">
              {{ item.title }}
            </p>
            <p class="nav-s-cell-time">{{ item.createtime }}</p>
          </div>
        </div>
      </div>
    </div>
    <van-empty v-if="activeLists.length == 0" description="暂无信息" />
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem, Lazyload, Tab, Tabs, Divider, Empty } from "vant";
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Divider);
Vue.use(Empty);
Vue.use(Lazyload);
import { bannerListsApi, articleListApi } from "@s/api";
export default {
  data() {
    return {
      bannerlist: [], // 轮播
      activeLists: [], // 活动列表
      p_id: "",
      title: "", // 当前标题
      cate: [], // tab列表
      category: [], // tab
      p_id_2: "", // 导航切换id
      p_id_3: "" // tab当前选中
    };
  },
  created() {
    this.p_id = this.$route.query.id;
    this.p_id_2 = this.$route.query.p_id_2;
    this.getActiveData();
    this.getBannerData();
  },
  methods: {
    handleToPage(row) {
      // 跳转页面
      this.$router.push({
        path: "/newsDetail?id=" + row.id,
      });
    },
    handleChangeNav(row) {
      // 导航发生变化
      this.p_id_2 = row.id;
      this.p_id_3 = '';
      this.title = row.name;
      this.getActiveData();
      if (row.id == 20) {
        this.$router.push({
          path: "/complaint",
        });
      }
    },
    handleChangeTab(value) {
      // tab发生变化
      this.p_id_3 = value;
      this.getActiveData();
    },
    getActiveData() {
      let { p_id, p_id_2, p_id_3 } = this;
      articleListApi({ p_id, p_id_2, p_id_3 }).then((res) => {
        let { category, cate, activeCategoryId, article } = res;
        this.activeLists = article;
        this.category = category;
        if (!this.title && cate.length == 0) {
          let targetCategory = category.filter((item) => {
            return item.id == this.p_id_2;
          });
          if (targetCategory.length > 0) {
            this.title = targetCategory[0].name;
          } else {
            this.title = category[0].name;
          }
        }

        this.cate = cate;
        if (!p_id_3 && cate.length > 0) {
          this.p_id_3 = cate[0].id;
        } else if (cate.length == 0) {
          this.p_id_3 = "";
        }
        if (!this.p_id_2) {
          this.p_id_2 = activeCategoryId;
        }
      });
    },
    getBannerData() {
      bannerListsApi().then((res) => {
        this.bannerlist = res;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.nav-s-t-tit {
  display: flex;
  justify-content: center;
}
.nav-s-cell {
  padding: 10px;
  font-size: 14px;
  border-bottom: 1px solid #f2f2f2;
  align-items: flex-start !important;
  .nav-s-cell-img {
    width: 125px;
    height: 75px;
  }
  .nav-s-cell-right {
    height: 100%;
    margin-left: 10px;
    flex: 1;
    .nav-s-cell-tit {
      width: 220px;
      font-size: 13px;
      height: 55px;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
    .nav-s-cell-time {
      margin-top: 5px;
      font-size: 12px;
    }
  }
}
.nav-second {
  background-color: #fff;
  height: auto;
}
.nav-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-second-banner {
  .van-swipe {
    width: 100%;
    height: 180px;
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
}
.nav-second-nav {
  border-bottom: 1px solid #f2f2f2;
  .van-swipe {
    width: 100%;
    height: 130px;
    overflow: hidden;
  }
  .nav-s-n-cell {
    font-size: 14px;
    width: 25%;
    text-align: center;
    padding: 20px 0;
    .nav-s-n-img {
      width: 40px;
      height: 40px;
      object-fit: cover;
    }
    .nav-s-n-tit {
      margin-top: 10px;
      font-size: 12px;
    }
  }
}
</style>