<template>
  <div class="my-note">
    <van-form @submit="onSubmit">
      <h3 class="my-note-h3">基本信息</h3>
      <van-field name="checked" label="是否需要回复">
        <template #input>
          <van-switch v-model="checked" size="30" />
        </template>
      </van-field>
      <h3 class="my-note-h3">投诉人基本信息</h3>
      <van-field
        v-model="toushuren"
        name="toushuren"
        label="投诉人"
        placeholder="请输入投诉人"
        :rules="[{ required: true, message: '请输入投诉人' }]"
      />
      <van-field
        v-model="tel"
        name="tel"
        label="联系电话"
        placeholder="请输入联系电话"
        :rules="[{ required: true, message: '请输入联系电话' }]"
      />
      <van-field
        v-model="cardid"
        name="cardid"
        label="身份证号"
        placeholder="请输入身份证号"
        :rules="[{ required: true, message: '请输入身份证号' }]"
      />
      <van-field
        v-model="num"
        name="num"
        label="投诉人数"
        placeholder="请输入投诉人数"
        :rules="[{ required: true, message: '请输入投诉人数' }]"
      />
      <h3 class="my-note-h3">被投诉人基本信息</h3>
      <van-field
        v-model="danwei"
        name="danwei"
        label="单位名称"
        placeholder="请输入单位名称"
        :rules="[{ required: true, message: '请输入单位名称' }]"
      />
      <van-field
        v-model="cun"
        name="cun"
        label="所属镇村"
        placeholder="请输入所属镇村"
        :rules="[{ required: true, message: '请输入所属镇村' }]"
      />
      <van-field
        v-model="phpel"
        name="phpel"
        label="联系人"
        placeholder="请输入联系人"
        :rules="[{ required: true, message: '请输入联系人' }]"
      />
      <van-field
        v-model="phone"
        name="phone"
        label="联系方式"
        placeholder="请输入联系方式"
        :rules="[{ required: true, message: '请输入联系方式' }]"
      />
      <h3 class="my-note-h3">投诉内容</h3>
      <van-field
        style="margin: 10px 0"
        v-model="content"
        label="投诉内容摘要"
        name="content"
        rows="3"
        autosize
        type="textarea"
        placeholder="开始输入..."
        show-word-limit
        :rules="[{ required: true, message: '请输入投诉内容摘要' }]"
      />
      <van-field
        style="margin: 10px 0"
        v-model="back"
        label="备注"
        name="back"
        rows="3"
        autosize
        type="textarea"
        placeholder="开始输入..."
        show-word-limit
        :rules="[{ required: true, message: '请输入备注' }]"
      />
      <h3 class="my-note-h3">拍照上传证据材料</h3>
      <van-field name="uploader">
        <template #input>
          <van-uploader
            v-model="uploaderList"
            :delete="handleDelete"
            :after-read="afterRead"
          />
        </template>
      </van-field>
      <div class="my-note-footer">
        <div>温馨提示</div>
        <div>1、请确保照片内容清晰可见;</div>
        <div>2、最多可上传5张照片。</div>
      </div>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
    <van-dialog
      v-model="show"
      title="协议（举报）指南"
      @confirm="confirm"
      @cancel="cancel"
      show-cancel-button
    >
      <div class="complanint-dialog" v-html="intro.feebcontent"></div>
    </van-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Field,
  Form,
  Button,
  Toast,
  Uploader,
  Checkbox,
  Dialog,
  Switch,
} from "vant";

Vue.use(Form);
Vue.use(Button);
Vue.use(Field);
Vue.use(Toast);
Vue.use(Uploader);
Vue.use(Checkbox);
Vue.use(Dialog);
Vue.use(Switch);
import { uploadApi, userCenterApi, feedbackApi } from "@s/api";
export default {
  data() {
    return {
      intro: {},
      checked: true, // 是否需要回复
      toushuren: "", // 投诉人
      tel: "", // 联系电话
      cardid: "", // 身份证号
      num: "", // 投诉人数
      danwei: "", // 单位名称
      cun: "", // 所属镇村
      phpel: "", // 联系人
      phone: "", // 联系方式
      content: "", // 投诉内容
      back: "", // 备注
      show: true, // 是否同意
      uploaderList: [],
      urlList: []
    };
  },
  created() {
    console.log(this.uploaderList)
    this.getUserInfo();
  },
  methods: {
    cancel() {
      this.$router.go(-1);
    },
    confirm() {
      this.show = false;
    },
    getUserInfo() {
      userCenterApi().then((res) => {
        let { intro } = res;
        this.intro = intro;
      });
    },
    handleDelete(e) {
      console.log(e);
    },
    afterRead(e) {
      uploadApi({ file: e.file }).then((res) => {
        this.urlList.push(res.fullurl);
      });
    },
    onSubmit(values) {
      let params = {
        uid: JSON.parse(localStorage.getItem("userInfo")).uid,
        image: this.urlList.join(","),
        reply: this.checked ? 2 : 1
      };
      Object.assign(params, values);
      feedbackApi(params).then((res) => {
        Toast("投诉提交成功");
        this.$router.push({
          path: "/complaintList"
        })
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