import Vue from "vue";
import { post, get, upload, exportExcel, code } from "./index";
const _baseUrl = process.env.VUE_APP_URL;
// const _baseUrl = '/api'

/* eslint-disable */
Vue.prototype.$code = code
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$upload = upload
Vue.prototype.$exportExcel = exportExcel

// 获取登录验证码
// const getCodeURL =  `${_baseUrl}/pub/api/getcode`
// export const getCodeApi = function (json) {
//   return Vue.prototype.$code(getCodeURL,json)
// }
// 登录
// const loginInURL = `${_baseUrl}/pub/api/login`
// export const loginInApi = function (json) {
//   return Vue.prototype.$post(loginInURL, json)
// }
// 获取材料类型
const materTypeURL = `${_baseUrl}/secret/api/gettypes`
export const materTypeApi = function (json) {
  return Vue.prototype.$post(materTypeURL, json)
}
  // 根据材料类型获取上传列表
const stepbyTypeURL = `${_baseUrl}/secret/api/getstepbytype`
export const stepbyTypeApi = function (json) {
  return Vue.prototype.$post(stepbyTypeURL, json)
}
// 获取七牛云上传token
const getupTokenURL = `${_baseUrl}/auth/api/getupToken`
export const getupTokenApi = function (json) {
  return Vue.prototype.$post(getupTokenURL, json)
}
// 获取通知公告列表
const getnewsListURL = `${_baseUrl}/secret/api/getnews`
export const getnewsListApi = function (json) {
  return Vue.prototype.$post(getnewsListURL, json)
}
// 获取通知公告详情

const getnewInfoURL = `${_baseUrl}/secret/api/getnewinfo`
export const getnewInfoApi = function (json) {
  return Vue.prototype.$post(getnewInfoURL, json)
}
// 确认信息模块
// 获取手机验证码
const sendPhonecodeURL =  `${_baseUrl}/secret/api/sendcode`
export const sendPhonecodeApi = function (json) {
  return Vue.prototype.$post(sendPhonecodeURL,json)
}
// 验证手机验证码
const verifyPhonecodeURL =  `${_baseUrl}/secret/api/checkphone`
export const verifyPhonecodeApi = function (json) {
  return Vue.prototype.$post(verifyPhonecodeURL,json)
}

// 获取审核记录
const getprocessURL =  `${_baseUrl}/secret/api/getprocess`
export const getprocessApi = function (json) {
  return Vue.prototype.$post(getprocessURL,json)
}
// 获取用户信息
const getuserinfoURL =  `${_baseUrl}/secret/api/getuserinfo`
export const getuserinfoApi = function (json) {
  return Vue.prototype.$post(getuserinfoURL,json)
}

// 提交资料
const inittypeURL =  `${_baseUrl}/secret/api/inittype`
export const inittypeApi = function (json) {
  return Vue.prototype.$post(inittypeURL,json)
}

// 获取审核详情
const getdatuminfoURL =  `${_baseUrl}/secret/api/getdatuminfo`
export const getdatuminfoApi = function (json) {
  return Vue.prototype.$post(getdatuminfoURL,json)
}
// 获取错误图示
const geterrimgURL =  `${_baseUrl}/secret/api/geterrimg`
export const geterrimgApi = function (json) {
  return Vue.prototype.$post(geterrimgURL,json)
}

// 首页
const homeUrl = `${_baseUrl}/index/index`
export const homeApi = function (json) {
  return Vue.prototype.$post(homeUrl, json)
}
// 首页初始化
const homeInitUrl = `${_baseUrl}/index/sys_init`
export const homeInitApi = function (json) {
  return Vue.prototype.$post(homeInitUrl, json)
}

// 检查手机号
const jobCheckCallUrl = `${_baseUrl}/job/check_call`
export const jobCheckCallApi = function (json) {
  return Vue.prototype.$post(jobCheckCallUrl, json)
}
// 招人才列表
const workerListUrl = `${_baseUrl}/worker/find_worker_list`
export const workerListApi = function (json) {
  return Vue.prototype.$post(workerListUrl, json)
}
// 招人才详情
const workerDetailUrl = `${_baseUrl}/worker/detail`
export const workerDetailApi = function (json) {
  return Vue.prototype.$post(workerDetailUrl, json)
}

// 招人才找工作 筛选条件
const publicOptionUrl = `${_baseUrl}/index/get_public_option`
export const publicOptionApi = function (json) {
  return Vue.prototype.$post(publicOptionUrl, json)
}
// 招工作详情
const jobDetailUrl = `${_baseUrl}/job/detail`
export const jobDetailApi = function (json) {
  return Vue.prototype.$post(jobDetailUrl, json)
}
// 招工作详情
const jobListsUrl = `${_baseUrl}/job/lists`
export const jobListsApi = function (json) {
  return Vue.prototype.$post(jobListsUrl, json)
}
// 收藏工作
const saveJobUrl = `${_baseUrl}/job/save_job`
export const saveJobApi = function (json) {
  return Vue.prototype.$post(saveJobUrl, json)
}
// 取消收藏工作
const cancelJobUrl = `${_baseUrl}/job/cancle_save`
export const cancelJobApi = function (json) {
  return Vue.prototype.$post(cancelJobUrl, json)
}
// 招人才查看联系方式
const workerRecordlUrl = `${_baseUrl}/worker/check_look_user_record`
export const workerRecordApi = function (json) {
  return Vue.prototype.$post(workerRecordlUrl, json)
}


// 拆迁村劳动力
const laborForcetUrl = `${_baseUrl}/labor_force/system`
export const laborForcetApi = function (json) {
  return Vue.prototype.$post(laborForcetUrl, json)
}

// 文章列表
const articleListUrl = `${_baseUrl}/Article/lists`
export const articleListApi = function (json) {
  return Vue.prototype.$post(articleListUrl, json)
}
// 文章详情
const articleDetailUrl = `${_baseUrl}/Article/detail`
export const articleDetailApi = function (json) {
  return Vue.prototype.$post(articleDetailUrl, json)
}
// 文章详情
const articleDetailNewUrl = `${_baseUrl}/Article/detail_new`
export const articleDetailNewApi = function (json) {
  return Vue.prototype.$post(articleDetailNewUrl, json)
}
// 活动列表
const activeListsUrl = `${_baseUrl}/active/lists`
export const activeListsApi = function (json) {
  return Vue.prototype.$post(activeListsUrl, json)
}
// 活动详情
const activeDetailUrl = `${_baseUrl}/active/detail`
export const activeDetailApi = function (json) {
  return Vue.prototype.$post(activeDetailUrl, json)
}
// 活动状态
const activeCheckUrl = `${_baseUrl}/active/check`
export const activeCheckApi = function (json) {
  return Vue.prototype.$post(activeCheckUrl, json)
}

// 获取轮播图
const bannerListsUrl = `${_baseUrl}/banner/index`
export const bannerListsApi = function (json) {
  return Vue.prototype.$post(bannerListsUrl, json)
}
// 获取企业详情
const companyDetailUrl = `${_baseUrl}/Company/company_detail`
export const companyDetailApi = function (json) {
  return Vue.prototype.$post(companyDetailUrl, json)
}


// 用户信息
const userCenterUrl = `${_baseUrl}/user/center`
export const userCenterApi = function (json) {
  return Vue.prototype.$post(userCenterUrl, json)
}
// 用户收藏
const userCollectionUrl = `${_baseUrl}/user_center/collection`
export const userCollectionApi = function (json) {
  return Vue.prototype.$post(userCollectionUrl, json)
}

// 投递简历
const resumeSendUrl = `${_baseUrl}/resume/send`
export const resumeSendApi = function (json) {
  return Vue.prototype.$post(resumeSendUrl, json)
}
// 保存简历
const resumeSaveUrl = `${_baseUrl}/resume/save`
export const resumeSaveApi = function (json) {
  return Vue.prototype.$post(resumeSaveUrl, json)
}
// 刷新简历
const refreshNoticeUrl = `${_baseUrl}/resume/refresh_notice`
export const refreshNoticeApi = function (json) {
  return Vue.prototype.$post(refreshNoticeUrl, json)
}
// 我的求职
const jobWantedUrl = `${_baseUrl}/user_center/job_wanted`
export const jobWantedApi = function (json) {
  return Vue.prototype.$post(jobWantedUrl, json)
} 
// 智能匹配匹配列表
const matchjobUrl = `${_baseUrl}/user_center/match_job`
export const matchjobApi = function (json) {
  return Vue.prototype.$post(matchjobUrl, json)
}
// 视频简历保存
const saveVideotUrl = `${_baseUrl}/resume/save_video`
export const saveVideotApi = function (json) {
  return Vue.prototype.$post(saveVideotUrl, json)
}
// 我的投诉
const feedbackListUrl = `${_baseUrl}/user_center/feedback_list`
export const feedbackListApi = function (json) {
  return Vue.prototype.$post(feedbackListUrl, json)
}
// 我的投诉详情
const feedbackDetailUrl = `${_baseUrl}/user_center/feedback_detail`
export const feedbackDetailApi = function (json) {
  return Vue.prototype.$post(feedbackDetailUrl, json)
}
// 通知面试
const interviewNoticeUrl = `${_baseUrl}/user_center/interview_notice`
export const interviewNoticApi = function (json) {
  return Vue.prototype.$post(interviewNoticeUrl, json)
}
// 投诉举报
const feedbackUrl = `${_baseUrl}/user_center/feedback`
export const feedbackApi = function (json) {
  return Vue.prototype.$post(feedbackUrl, json)
}
// 搜索职位，企业
const searchUrl = `${_baseUrl}/search/search`
export const searchApi = function (json) {
  return Vue.prototype.$post(searchUrl, json)
}
// 检查手机号
const checkUserTelUrl = `${_baseUrl}/user/check_user_tel`
export const checkUserTelApi = function (json) {
  return Vue.prototype.$post(checkUserTelUrl, json)
}
// 视频简历列表
const videoListUrl = `${_baseUrl}/resume/video_list`
export const videoListApi = function (json) {
  return Vue.prototype.$post(videoListUrl, json)
}
// 视频简历列表
const videoDetailUrl = `${_baseUrl}/resume/video_detail`
export const videoDetailApi = function (json) {
  return Vue.prototype.$post(videoDetailUrl, json)
}

// 获取简历详情
const resumeEditUrl = `${_baseUrl}/resume/edit`
export const resumeEditApi = function (json) {
  return Vue.prototype.$post(resumeEditUrl, json)
}
// 上传图片
const uploadUrl = `${_baseUrl}/common/upload`
export const uploadApi = function (json) {
  return Vue.prototype.$upload(uploadUrl, json)
}

// 获取用户信息
const getUserUrl = `${_baseUrl}/user/get_app_detail`
export const getUserApi = function (json) {
  return Vue.prototype.$post(getUserUrl, json)
}
