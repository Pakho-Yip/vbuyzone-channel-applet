// pages/login/index.js
const app = getApp()
import http from "../../api/httpUtils"
import Url from "../../api/url"
import {
  wxRequestCode
} from '../../api/wxSdkUtils'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioFlag: false,
    code: ""
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
    var radioFlag = this.data.radioFlag;
    this.setData({
      "radioFlag": !radioFlag
    })
  },
  getPhoneNumber(e) {
    console.log(e.detail.code);
    console.log(e);
    this.code = e.detail.code;
    this.handleLogin();
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