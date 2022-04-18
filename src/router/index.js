import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@v/layout";
import {
  Toast
} from "vant";
Vue.use(Toast);
Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/login",
  //   name: "Login",
  //   component: () => import("@v/login")
  // },
  {
    path: "/",
    name: "Home",
    component: Layout,
    redirect: "/home",
    children: [{
        path: "/home",
        name: "Home",
        meta: {
          isShowHeader: false,
          title: "首页"
        },
        component: () => import("@v/home")
      },
      {
        path: "/recruitRc",
        name: "RecruitRc",
        component: () => import("@v/recruitRc")
      },
      {
        path: "/findJob",
        name: "FindJob",
        component: () => import("@v/findJob")
      },
      {
        path: "/mine",
        name: "Mine",
        component: () => import("@v/mine")
      },
    ]
  },
  {
    path: "/newsDetail",
    name: "NewsDetail",
    meta: {
      isShowHeader: false,
      title: "想就业，来找我"
    },
    component: () => import("@v/newsDetail")
  },
  {
    path: "/active",
    name: "Active",
    meta: {
      isShowHeader: false,
      title: "招聘会"
    },
    component: () => import("@v/active")
  },
  {
    path: "/activedetail",
    name: "Activedetail",
    meta: {
      isShowHeader: false,
      title: "招聘会 - 想就业，来找我"
    },
    component: () => import("@v/activedetail")
  },
  {
    path: "/articledetail",
    name: "Articledetail",
    meta: {
      isShowHeader: false,
      title: "想就业，来找我"
    },
    component: () => import("@v/articledetail")
  },
  {
    path: "/navSecond",
    name: "NavSecond",
    meta: {
      isShowHeader: false,
      title: "想就业，来找我"
    },
    component: () => import("@v/navSecond")
  },
  {
    path: "/jobDetail",
    name: "JobDetail",
    meta: {
      isShowHeader: false,
      title: "想就业，来找我"
    },
    component: () => import("@v/home/jobDetail")
  },
  {
    path: "/workerDetail",
    name: "WorkerDetail",
    meta: {
      isShowHeader: false,
      title: "想就业，来找我"
    },
    component: () => import("@v/workerDetail")
  },
  {
    path: "/demolition",
    name: "Demolition",
    meta: {
      isShowHeader: false,
      title: "拆迁村劳动力登记服务平台"
    },
    component: () => import("@v/demolition")
  },
  {
    path: "/myNote",
    name: "MyNote",
    meta: {
      isShowHeader: false,
      title: "想就业，来找我"
    },
    component: () => import("@v/myNote")
  },
  {
    path: "/notevideo",
    name: "Notevideo",
    meta: {
      isShowHeader: false,
      title: "想就业，来找我"
    },
    component: () => import("@v/notevideo")
  },
  {
    path: "/companydetail",
    name: "Companydetail",
    meta: {
      isShowHeader: false,
      title: "公司详情"
    },
    component: () => import("@v/companydetail")
  },
  {
    path: "/info",
    name: "Info",
    meta: {
      isShowHeader: false,
      title: "想就业，来找我"
    },
    component: () => import("@v/info")
  },
  {
    path: "/lookrole",
    name: "Lookrole",
    meta: {
      isShowHeader: false,
      title: "想就业，来找我"
    },
    component: () => import("@v/lookrole")
  },
  {
    path: "/housexy",
    name: "Housexy",
    meta: {
      isShowHeader: false,
      title: "简历发布协议"
    },
    component: () => import("@v/housexy")
  },
  {
    path: "/search",
    name: "Search",
    meta: {
      isShowHeader: false,
      title: "信息综合查询"
    },
    component: () => import("@v/search")
  },
  {
    path: "/complaint",
    name: "Complaint",
    meta: {
      isShowHeader: false,
      title: "投诉举报"
    },
    component: () => import("@v/complaint")
  },
  {
    path: "/mySave",
    name: "MySave",
    meta: {
      isShowHeader: false,
      title: "我的收藏"
    },
    component: () => import("@v/mySave")
  },
  {
    path: "/complaintDetail",
    name: "ComplaintDetail",
    meta: {
      isShowHeader: false,
      title: "投诉事件详情"
    },
    component: () => import("@v/complaintDetail")
  },
  {
    path: "/matchjob",
    name: "Matchjob",
    meta: {
      isShowHeader: false,
      title: "匹配职位-想就业，来找我"
    },
    component: () => import("@v/matchjob")
  },
  {
    path: "/myfind",
    name: "Myfind",
    meta: {
      isShowHeader: false,
      title: "我的求职"
    },
    component: () => import("@v/myfind")
  },
  {
    path: "/mynotice",
    name: "Mynotice",
    meta: {
      isShowHeader: false,
      title: "我的面试通知"
    },
    component: () => import("@v/mynotice")
  },
  {
    path: "/myvideonote",
    name: "Myvideonote",
    meta: {
      isShowHeader: false,
      title: "颜值简历"
    },
    component: () => import("@v/myvideonote")
  },
  {
    path: "/notevideodetail",
    name: "Notevideodetail",
    meta: {
      isShowHeader: false,
      title: "想就业，来找我"
    },
    component: () => import("@v/notevideodetail")
  },
  {
    path: "/complaintList",
    name: "ComplaintList",
    meta: {
      isShowHeader: false,
      title: "我的投诉"
    },
    component: () => import("@v/complaintList")
  }
];


const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});
// 路由变化时
router.beforeEach((to, from, next) => {
  // let token = Cookie.get("token");
  // if (!token && to.path != "/login") {
  // if (from.path != "/") {
  //   Toast("登录过期");
  // }
  //   next();
  // } else {
  next();
  // }
});
export default router;