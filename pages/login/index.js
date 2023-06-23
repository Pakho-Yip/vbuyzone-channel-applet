// pages/login/index.js
const app = getApp()
import http from "../../api/httpUtils"
import Url from "../../api/url"
import {
  wxRequestCode,
  wxToast
} from '../../api/wxSdkUtils'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioFlag: false,
    code: "",
    linkMan: "",
    linkMobileNumber: "",
    applyReasons: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.getSystemInfo({
      success: function (res) {
        let version = res.SDKVersion;
        version = version.replace(/\./g, "");
        console.log('当前版本号: ' + version);
      }
    });

    wxRequestCode().then(code => {
      console.log(code);
      var code = code;
      app.globalData.jscode = code;
    })
    // wx.login({
    //   success: res => {
    //     // resolve(res.code)
    //     // resolve(res.code)
    //     console.log(res);
    //     var code = res.code;
    //     app.globalData.jscode = code;
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  handleReturn() {
    wx.switchTab({
      url: '../my/index'
    })
  },
  checkedTap() {
    let that = this;
    var radioFlag = that.data.radioFlag;
    that.setData({
      "radioFlag": !radioFlag
    })
  },
  handleAgree() {
    if (!this.data.radioFlag) {
      wx.showToast({
        icon: "none",
        title: '请阅读并同意平台服务协议及隐私协议',
        duration: 2000
      })
      return false
    }
  },
  getPhoneNumber(e) {
    console.log(e.detail.code);
    console.log(e);
    console.log(this.data.radioFlag);
    if (!this.data.radioFlag) {
      console.log("weixuanzhong")
      // this.status = true;
      // this.flag = 'weixin'
      return;
    }
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') { //用户点击拒绝
      wx.showToast({
        title: '请绑定手机号',
        duration: 2000,
        icon: 'none',
      });
    } else {
      this.code = e.detail.code;
      this.handleLogin();
    }
  },
  handleLogin() {
    let that = this;
    wx.showLoading({
      title: '登录中',
    })
    let param = {};
    param.jsCode = app.globalData.jscode;
    param.code = that.code;
    console.log(param);
    http.post(Url.login.login, param).then(res => {
      if (res.token) {
        wx.setStorageSync('tokenId', res.token);
        wx.setStorageSync('mobile', res.mobile);
        this.getOssInfo();
        this.setData({
          loginStatus: true
        })
        this.getInfo();
        this.refreshData();
        this.getWxVersion();
        wxToast({
          title: '登录成功'
        });
        wx.switchTab({
          url: '../my/index'
        });
      } else {
        let weixinId = res.weixinId;
        app.globalData.weixinId = weixinId;
        wxToast({
          title: '暂未注册，请完成注册！'
        })
        wxReLaunch(`../token/index`)
      }
    }).catch(err => {
      wxRequestCode().then(code => {
        console.log(code);
        var code = code;
        app.globalData.jscode = code;
      })
    })
  },
  linkManInput(e) {
    let value = e.detail.value;
    this.setData({
      linkMan: value
    })
  },
  mobileInput(e) {
    let value = e.detail.value;
    this.setData({
      linkMobileNumber: value
    })
  },
  reasonInput(e) {
    let value = e.detail.value;
    this.setData({
      applyReasons: value
    })
  },
  commit() {
    console.log(this.data)
    if (!this.data.linkMan) {
      wxToast({
        title: '请输入姓名',
        icon: "none"
      })
      return
    }
    if (!this.data.linkMobileNumber) {
      wxToast({
        title: '请输入手机号',
        icon: "none"
      })
      return
    }
    if (!this.data.applyReasons) {
      wxToast({
        title: '请输入申请理由',
        icon: "none"
      })
      return
    }
    let param = {};
    param.linkMan = this.data.linkMan;
    param.linkMobileNumber = this.data.linkMobileNumber;
    param.applyReasons = this.data.applyReasons;
    console.log(param);
    http.post(Url.login.channelAgentApply, param).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  signOut() {
    http.post(Url.login.out).then(_ => {
      wx.clearStorage()
      wxToast({
        title: '退出成功'
      })
      this.setData({
        loginStatus: false
      })
      wxRequestCode().then(code => {
        console.log(code);
        var code = code;
        app.globalData.jscode = code;
      })
      //wxReLaunch("../my/index")
    }).catch(_ => {
      wx.clearStorage()
      wxToast({
        title: '退出成功'
      })
      this.setData({
        loginStatus: false
      })
      //wxReLaunch("../my/index")
    })
  }
})