<template>
  <div class="my-note">
    <van-form @submit="onSubmit">
      <h3 class="my-note-h3">视频上传</h3>
      <van-field name="uploader">
        <template #input>
          <van-uploader
            accept="video/*"
            v-model="uploader"
            :delete="handleDelete"
            :after-read="afterReadVideo"
            :max-count="1"
          />
        </template>
      </van-field>
      <div class="my-note-footer">
        <div>温馨提示</div>
        <div>1、禁止上传不良视频;</div>
        <div>2、视频限于20M。</div>
      </div>
      <h3 class="my-note-h3">形象照片</h3>
      <van-field name="uploader">
        <template #input>
          <van-uploader
            v-model="imagelist"
            :delete="handleDelete"
            :after-read="afterRead"
            :max-count="3"
          />
        </template>
      </van-field>
      <div class="my-note-footer">
        <div>温馨提示</div>
        <div>1、禁止上传不良图片;</div>
        <div>2、最多上传三张。</div>
      </div>
      <h3 class="my-note-h3">个人介绍</h3>
      <van-field
        style="margin: 10px 0"
        v-model="content"
        label="备注"
        name="back"
        rows="3"
        autosize
        type="textarea"
        placeholder="开始输入..."
        show-word-limit
        :rules="[{ required: true, message: '请输入备注' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import Vue from "vue";
import { Field, Form, Button, Toast, Uploader, Dialog } from "vant";

Vue.use(Form);
Vue.use(Button);
Vue.use(Field);
Vue.use(Toast);
Vue.use(Uploader);
Vue.use(Dialog);
import { uploadApi, saveVideotApi } from "@s/api";
export default {
  data() {
    return {
      content: "", // 备注
      videourl: [],
      uploader: [],
      imagelist: [],
      imgstr: [],
    };
  },
  created() {},
  methods: {
    isOverSize() {
      const maxSize = file.type === "image/jpeg" ? 500 * 1024 : 1000 * 1024;
      return file.size >= maxSize;
    },
    handleDelete(e) {
      console.log(e);
    },
    afterReadVideo(e) {
      uploadApi({ file: e.file }).then((res) => {
        this.videourl.push(res.fullurl);
      });
    },
    afterRead(e) {
      uploadApi({ file: e.file }).then((res) => {
        this.imgstr.push(res.fullurl);
      });
    },
    onSubmit() {
      let { videourl, imgstr, content } = this;
      if (videourl.length == 0) {
        Toast("视频上传不能为空！");
      } else if (imgstr.length == 0) {
        Toast("形象照片不能为空！");
      } else if (!content) {
        Toast("个人介绍不能为空！");
      }
      let params = {
        uid: JSON.parse(localStorage.getItem("userInfo")).uid,
        videourl: videourl[0],
        imgstr: imgstr.join("@"),
        content: content,
      };
      saveVideotApi(params).then((res) => {
        Toast("提交成功");
      });
    },
  },
};
</script>
<style lang="scss">
.complanint-dialog {
  height: 240px;
  overflow-y: scroll;
  padding: 20px;
  p {
    font-size: 14px;
    color: #333;
    line-height: 20px;
  }
}
</style>
<style scoped lang="scss">
.my-note-footer {
  align-items: center;
  font-size: 12px;
  padding: 15px;
  .my-n-f-span {
    color: blue;
  }
}
.my-note-h3 {
  font-size: 16px;
  font-weight: 500;
  color: #999;
  padding: 15px;
  background: #fbf0f0;
}
</style>