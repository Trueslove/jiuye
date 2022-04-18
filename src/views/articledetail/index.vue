<template>
  <div class="news-detail">
    <div class="news-detail-header">
      <h2 class="news-d-h-h">{{ title }}</h2>
      <p class="news-d-h-p">{{ createtime }}</p>
    </div>
    <video
      v-if="video_href"
      :src="video_href"
      controls
      style="width: 100%; height: 225px; background: #000"
    ></video>
    <div class="news-d-c-wap">
      <div class="news-d-c" v-html="content"></div>
      <div class="news-d-fj">
        <div class="news-d-fj-tit">复制相关文件地址</div>
        <div class="news-d-fj-cell">
          <img
            class="news-d-fj-cell-img"
            src="../../assets/fujian.png"
            alt=""
          />
          <p class="news-d-fj-cell-p">woshienfff</p>
          <img class="news-d-fj-cell-copy" src="../../assets/copy.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { articleDetailApi } from "@s/api";
export default {
  name: "newsDetail",
  data() {
    return {
      content: "", // 内容
      createtime: "",
      title: "",
      video_href: "",
    };
  },
  created() {
    this.getDetailData();
  },
  mounted() {},
  methods: {
    getDetailData() {
      articleDetailApi({ id: this.$route.query.id }).then((res) => {
        let { content, createtime, title, video_href } = res;
        this.content = content;
        this.createtime = createtime;
        this.title = title;
        this.video_href = video_href;
      });
    },
  },
};
</script>
<style lang="scss">
.news-d-fj {
  .news-d-fj-tit {
    height: 40px;
    border-bottom: 1px solid #cecece;
    line-height: 40px;
    font-size: 16px;
    padding: 0 10px;
  }
  .news-d-fj-cell {
    padding: 0 20px;
    display: flex;
    align-items: center;
    line-height: 40px;
    .news-d-fj-cell-img {
      width: 24px;
      height: 27px;
      margin-right: 10px;
    }
    .news-d-fj-cell-copy {
      width: 16px;
      height: 16px;
    }
    .news-d-fj-cell-p {
      flex: 1;
      font-size: 14px;
      color: #333;
    }
  }
}
.news-d-c {
  padding: 0 10px 10px;
  p {
    font-size: 13px;
    line-height: 20px;
  }
}
</style>
<style scoped lang="scss">
.news-detail {
  background-color: #fff;
}
.news-detail-header {
  padding: 10px 5px;
  border-bottom: 1px solid #ccc;
  .news-d-h-h {
    font-size: 14px;
    font-weight: bold;
    color: #000;
    line-height: 20px;
  }
  .news-d-h-p {
    margin-top: 5px;
    font-size: 12px;
    color: #333;
  }
}
</style>
