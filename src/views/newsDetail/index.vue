<template>
  <div class="news-detail">
    <div class="news-detail-header">
      <h2 class="news-d-h-h">{{ title }}</h2>
      <p class="news-d-h-p">{{ createtime }}</p>
    </div>
    <div class="news-d-c-wap">
      <div class="news-d-c" v-html="content"></div>
    </div>
    <iframe
      v-if="videoType == 2"
      class="video_iframe"
      style="z-index: 1"
      :src="videoHrefTencent + '?width=100%'"
      allowfullscreen=""
      frameborder="0"
      height="375"
      width="500"
    ></iframe>
    <view v-if="videoType == 1">
      <video :src="videoHrefTencent" />
    </view>
    <div class="new-d-c-file-wap" v-if="file.length > 0 && file[0].path">
      <p class="new-file-h">
        附件下载
        <span class="new-file-h-text">（点击附件下载保存）</span>
      </p>
      <div class="new-file-cell-wap">
        <div class="new-file-cell" v-for="(item, index) in file" :key="index">
          <img class="new-file-cell-img" src="../../assets/fujian.png" />
          <span class="new-file-cell-text"
            >附件{{ index + 1 }}：{{
              item.title ? item.title : "相关附件"
            }}</span
          >
          <img
            class="new-file-cell-img-down"
            @click="handleDownFile(item.path)"
            src="../../assets/down.png"
          />
        </div>
      </div>
    </div>
    <div class="new-d-c-file-wap" v-if="href.length > 0 && href[0].href">
      <p class="new-file-h">复制相关文件地址</p>
      <div class="new-file-cell-wap">
        <div class="new-file-cell" v-for="(item, index) in href" :key="index">
          <img class="new-file-cell-img" src="../../assets/fujian.png" />
          <span class="new-file-cell-text"
            >附件{{ index + 1 }}：{{
              item.title ? item.title : "相关附件"
            }}</span
          >
          <img
            class="new-file-cell-img-down tag-read"
            @click="handleCopyFile(item.href)"
            src="../../assets/copy.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { articleDetailNewApi } from "@s/api";
import { Toast } from "vant";
export default {
  name: "newsDetail",
  data() {
    return {
      content: "", // 内容
      createtime: "",
      title: "",
      file: [],
      href: [],
      videoHrefTencent: "",
      videoType: "",
    };
  },
  created() {
    this.getDetailData();
  },
  mounted() {},
  methods: {
    handleCopyFile(url) {
      //创建一个input元素
      let input = document.createElement("input");
      //给input的内容复制
      input.value = url;
      // 在body里面插入这个元素
      document.body.appendChild(input);
      // 选中input里面内容
      input.select();
      //执行document里面的复制方法
      document.execCommand("Copy");
      Toast("复制成功");
      // 复制之后移除这个元素
      document.body.removeChild(input);
    },
    handleDownFile(downurl) {
      //1.先创建一个a标签
      let a = document.createElement("a");
      //2.给a标签的href赋上下载地址
      a.href = downurl;
      //3.让a标签不显示在视图中
      a.style.display = "none";
      //4.将a标签append到文档中
      document.body.appendChild(a);
      //5.a标签自点击
      a.click();
      //6.点击下载后，销毁这个节点
      document.body.removeChild(a);
    },
    getDetailData() {
      articleDetailNewApi({ id: this.$route.query.id }).then((res) => {
        let {
          content,
          createtime,
          title,
          file,
          href,
          video_href_tencent,
          video_type
        } = res;
        this.content = content;
        this.createtime = createtime;
        this.title = title;
        this.file = file;
        this.href = href;
        this.videoType = video_type;
        if (video_type == 2) {
          let videoList = video_href_tencent.split("/");
          let targetVid = videoList[videoList.length - 1].split(".html");
          this.videoHrefTencent = `https://v.qq.com/iframe/player.html?vid=${targetVid[0]}&`;
        } else {
          this.videoHrefTencent = video_href_tencent;
        }
      });
    },
  },
};
</script>
<style lang="scss">
.video_iframe {
  width: 100%;
}
.new-file-cell-wap {
  padding: 0 10px;
  margin: 10px 0;
  .new-file-cell {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .new-file-cell-img {
      width: 24px;
      height: 27px;
    }
    .new-file-cell-img-down {
      width: 16px;
      height: 14px;
    }
    .new-file-cell-text {
      flex: 1;
      font-size: 12px;
      padding: 0 10px;
    }
  }
}
.new-d-c-file-wap {
  padding: 10px;
  .new-file-h {
    font-size: 16px;
    color: #000;
    .new-file-h-text {
      font-size: 12px;
      color: #ccc;
    }
  }
}
.news-d-c {
  padding: 10px;
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
