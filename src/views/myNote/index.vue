<template>
  <div class="my-note">
    <van-form @submit="onSubmit">
      <h3 class="my-note-h3">个人基本信息</h3>
      <van-field
        v-model="name"
        name="name"
        label="姓名"
        placeholder="请输入姓名"
        :rules="[{ required: true, message: '请输入姓名' }]"
      />
      <van-field name="sex" label="性别">
        <template #input>
          <van-radio-group v-model="sex" direction="horizontal">
            <van-radio :name="1">男</van-radio>
            <van-radio :name="0">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="cardid"
        name="cardid"
        label="身份证"
        placeholder="请输入身份证"
        :rules="[{ required: true, message: '请输入身份证' }]"
      />

      <van-field
        readonly
        clickable
        name="birthday"
        :value="birthday"
        label="出生年份"
        placeholder="请选择出生年份"
        @click="handleClickPicker('birthday')"
      />
      <van-field
        readonly
        clickable
        name="education"
        :value="education"
        label="最高学历"
        placeholder="请选择最高学历"
        @click="handleClickPicker('education')"
      />
      <van-field
        readonly
        clickable
        name="express"
        :value="express"
        label="工作经验"
        placeholder="请选择工作经验"
        @click="handleClickPicker('express')"
      />
      <van-field
        v-model="address"
        name="address"
        label="现居住地"
        placeholder="请输入现居住地"
        :rules="[{ required: true, message: '请输入现居住地' }]"
      />
      <van-field
        v-model="email"
        name="email"
        label="邮箱"
        placeholder="请输入邮箱"
        :rules="[{ required: true, message: '请输入邮箱' }]"
      />
      <van-field
        v-model="tel"
        name="tel"
        label="手机号码"
        placeholder="请输入手机号码"
        :rules="[{ required: true, message: '请输入手机号码' }]"
      />

      <h3 class="my-note-h3">个人详情信息</h3>
      <van-field
        readonly
        clickable
        name="currentid"
        :value="currentid"
        label="目前状态"
        placeholder="请选择目前状态"
        @click="handleClickPicker('currentid')"
      />
      <van-field
        readonly
        clickable
        name="worktype"
        :value="worktype"
        label="工作性质"
        placeholder="请选择工作性质"
        @click="handleClickPicker('worktype')"
      />
      <van-field
        readonly
        clickable
        name="arealist"
        :value="arealist"
        label="工作地区"
        placeholder="请选择工作地区"
        @click="handleClickPicker('arealist')"
      />
      <van-field
        readonly
        clickable
        name="jobcate"
        :value="jobcate"
        label="期望行业"
        placeholder="请选择期望行业"
        @click="handleClickPicker('jobcate')"
      />
      <van-field
        v-model="jobtitle"
        name="jobtitle"
        label="意向职位"
        placeholder="请输入意向职位"
        :rules="[{ required: true, message: '请输入意向职位' }]"
      />
      <van-field
        readonly
        clickable
        name="money"
        :value="money"
        label="期望薪资"
        placeholder="请选择期望薪资"
        @click="handleClickPicker('money')"
      />
      <van-field name="laotype" label="是否是拆迁户">
        <template #input>
          <van-radio-group v-model="laotype" direction="horizontal">
            <van-radio :name="0">是</van-radio>
            <van-radio :name="1">否</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="server"
        name="server"
        label="就业服务"
        placeholder="请输入就业服务"
        :rules="[{ required: true, message: '请输入就业服务' }]"
      />
      <h3 class="my-note-h3">自我介绍及工作经历</h3>
      <van-field
        style="margin: 10px 0"
        v-model="content"
        name="content"
        rows="8"
        autosize
        type="textarea"
        placeholder="开始输入..."
        show-word-limit
      />
      <van-field name="imgurl" label="个人形象">
        <template #input>
          <van-uploader
            :max-count="1"
            v-model="imgurl"
            :after-read="afterRead"
          />
        </template>
      </van-field>
      <van-field name="status" label="状态">
        <template #input>
          <van-radio-group v-model="status" direction="horizontal">
            <van-radio :name="1">显示</van-radio>
            <van-radio :name="2">隐藏</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <div class="my-note-footer">
        <van-checkbox
          v-model="checked"
          icon-size="18px"
          shape="square"
        ></van-checkbox>
        <p style="margin-left: 5px">
          我已阅读并同意发布<span class="my-n-f-span" @click="handleToPage"
            >《发布协议》</span
          >
        </p>
      </div>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="pickerOption"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
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
import {
  Field,
  Form,
  Button,
  RadioGroup,
  Radio,
  Picker,
  Toast,
  Popup,
  Uploader,
  Checkbox,
} from "vant";

Vue.use(Form);
Vue.use(Button);
Vue.use(Field);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Toast);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Uploader);
Vue.use(Checkbox);
import {
  uploadApi,
  publicOptionApi,
  resumeSaveApi,
  resumeEditApi,
} from "@s/api";
export default {
  data() {
    return {
      name: "", // 姓名
      sex: "", // 性别
      cardid: "", // 身份证
      birthday: "", // 出生年份
      education: "", // 最高学历
      address: "", // 现居住地址
      express: "", // 工作经验
      email: "", // 邮箱
      tel: "", // 手机电话
      currentid: "", // 当前状态
      worktype: "", // 工作性质
      jobtitle: "", // 意向职位
      arealist: "", // 工作地区
      jobcate: "", // 期望行业
      money: "", // 期望薪资
      laotype: "", // 是否拆迁户
      server: "", // 就业服务
      status: "", // 状态
      content: "", // 工作经历及自我介绍
      checked: "",
      imgurl: [],
      uploadimagelist_str: "", // 个人形象
      speciallist: [
        { name: "五险一金", checked: false },
        { name: "补充医疗保险", checked: false },
        { name: "员工旅游", checked: false },
        { name: "交通补贴", checked: false },
        { name: "餐饮补贴", checked: false },
        { name: "出国机会", checked: false },
        { name: "年终奖金", checked: false },
        { name: "定期体检", checked: false },
      ],
      birthdayOption: [
        "1960",
        "1961",
        "1962",
        "1963",
        "1964",
        "1965",
        "1966",
        "1967",
        "1968",
        "1969",
        "1970",
        "1971",
        "1972",
        "1973",
        "1974",
        "1975",
        "1976",
        "1977",
        "1978",
        "1979",
        "1980",
        "1981",
        "1982",
        "1983",
        "1984",
        "1985",
        "1986",
        "1987",
        "1988",
        "1989",
        "1990",
        "1991",
        "1992",
        "1993",
        "1994",
        "1995",
        "1996",
        "1997",
        "1998",
        "1999",
        "2000",
      ],
      educationOption: [
        "初中",
        "高中",
        "中技",
        "中专",
        "大专",
        "本科",
        "硕士",
        "博士",
        "博后",
      ],
      expressOption: [
        "无经验",
        "1年以下",
        "1-3年",
        "3-5年",
        "5-10年",
        "10年以上",
      ],
      currentidOption: [
        "我目前已离职,可快速到岗",
        "我目前在职，但考虑换个新环境",
        "观望有好的机会再考虑",
        "目前暂无跳槽打算",
        "应届毕业生",
      ],
      worktypeOption: ["全职", "兼职", "实习"],
      moneyOption: [
        "1千~2千/月",
        "2千~3千/月",
        "3千~4千/月",
        "4千~5千/月",
        "5千~1万/月",
        "1万以上/月",
      ],
      arealistOption: [],
      jobcateOption: [],
      arealistOldOption: [],
      jobcateOldOption: [],
      showPicker: false,
      title: [],
      pickerOption: [],
      activeKey: "",
      userInfo: {},
      noteinfo: {},
    };
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.getOptionData();
  },
  methods: {
    getDetail() {
      let { uid } = this.userInfo;
      resumeEditApi({
        uid,
        city: "泉州",
      }).then((res) => {
        let { jobcateOldOption, arealistOldOption, currentidOption } = this;
        let { noteinfo } = res;
        if (!!noteinfo) {
          this.noteinfo = noteinfo;
          this.name = noteinfo.name;
          this.sex = noteinfo.sex;
          this.cardid = noteinfo.cardid;
          this.birthday = noteinfo.birthday;
          this.education = noteinfo.education;
          this.address = noteinfo.address;
          this.express = noteinfo.express;
          this.email = noteinfo.email;
          this.tel = noteinfo.tel;
          this.currentid = currentidOption[noteinfo.cateid];
          this.worktype = noteinfo.worktype;
          this.jobtitle = noteinfo.jobtitle;
          this.money = noteinfo.money;
          let targetJob = jobcateOldOption.filter((item) => {
            return item.id == noteinfo.jobcateid;
          });
          let targetArea = arealistOldOption.filter((item) => {
            return item.id == noteinfo.areaid;
          });
          this.arealist = targetArea[0].name;
          this.jobcate = targetJob[0].name;
          this.laotype = noteinfo.laotype;
          this.server = noteinfo.server;
          this.status = noteinfo.status;
          this.content = noteinfo.content;
          this.checked = noteinfo.checked;
          this.imgurl = [{ url: noteinfo.avatarUrl }];
        }
      });
    },
    getOptionData() {
      // 获取下拉列表
      publicOptionApi({ city: "泉州" }).then((res) => {
        let { jobcatelist, arealist } = res;
        this.arealistOldOption = arealist;
        this.jobcateOldOption = jobcatelist;
        this.areaOLdlist = arealist;
        let jobCate = [];
        jobcatelist.forEach((item) => {
          jobCate.push(item.name);
        });
        let area = [];
        arealist.forEach((item) => {
          area.push(item.name);
        });
        this.jobcateOption = jobCate;
        this.arealistOption = area;
        this.getDetail();
      });
    },
    handleClickPicker(key) {
      // 点击弹出选择框
      let keys = key + "Option";
      this.showPicker = this[key];
      this.activeKey = key;
      this.pickerOption = this[keys];
      this.showPicker = true;
    },
    afterRead(e) {
      // 上传图片
      uploadApi({ file: e.file }).then((res) => {
        let url = res.fullurl;
        this.imgurl[0] = url;
        this.uploadimagelist_str = res.fullurl;
      });
    },
    onSubmit(values) {
      let {
        jobcateOldOption,
        currentidOption,
        jobcate,
        arealistOldOption,
        arealist,
        checked,
      } = this;
      if (!checked) {
        Toast("请勾选我已阅读并同意发布《发布协议》");
        return false;
      }
      let targetJob = jobcateOldOption.filter((item) => {
        return item.name == jobcate;
      });
      let targetArea = arealistOldOption.filter((item) => {
        return item.name == arealist;
      });
      for (let i = 0; i < currentidOption.length; i++) {
        let currentid = currentidOption[i];
        if (currentid == values.currentid) {
          values.currentid = i;
          break;
        }
      }
      let valuesObj = values;
      let params = {
        uid: JSON.parse(localStorage.getItem("userInfo")).uid,
        cityid: 17,
        tid: 0,
        uploadimagelist_str: this.uploadimagelist_str,
        jobcateid: targetJob.length > 0 ? targetJob[0].id : "",
        areaid: targetArea.length > 0 ? targetArea[0].id : "",
      };
      delete valuesObj.imgurl;
      delete valuesObj.arealist;
      Object.assign(params, valuesObj);
      resumeSaveApi(params).then((res) => {
        this.$router.push({
          path: "/home",
        });
        Toast("保存成功");
      });
    },
    handleToPage() {
      this.$router.push({
        path: "/housexy",
      });
    },
    onConfirm(value, index) {
      this[this.activeKey] = value;
      this.showPicker = false;
    },
    onChange(picker, value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
      Toast("取消");
    },
  },
};
</script>

<style scoped lang="scss">
.my-note-footer {
  display: flex;
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