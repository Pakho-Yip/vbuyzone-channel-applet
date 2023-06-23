//index.js
//获取应用实例
import http from "../../api/httpUtils"
import Url from "../../api/url"
const app = getApp()
import {
  wxRequestCode,
  wxToast,
  wxSwitchTab,
  wxNavigateTo
} from '../../api/wxSdkUtils'

Page({
  data: {
    weixinId: "",
    mobile: "",
    iv: "",
    code: ""
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  handleProtocol() {
    wxNavigateTo("../../pages/basic/userProtocol/index");
  },
  onLoad: function () {
  },
  getPhoneNumber: function (e) {
    let that = this;
    console.log(e.detail.encryptedData)
    // 设置加密信息
    console.log("iv", e.detail.iv)
    if (!e.detail.iv) {
      return;
    }
    this.mobile = e.detail.encryptedData;
    this.iv = e.detail.iv;
  },
  getOssInfo() {
    http.get(Url.common.oss, null).then(res => {
      let _ossConfValue = res && res.confValue;
      _ossConfValue = JSON.parse(_ossConfValue)
      console.log("_ossConfValue", typeof (_ossConfValue))
      console.log(_ossConfValue)
      // app.globalData.ossConfValue = JSON.parse(_ossConfValue);
      wx.setStorageSync("_ossConfValue", _ossConfValue)
    })
  }
})