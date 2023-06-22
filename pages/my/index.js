// pages/my/index.js
import http from "../../api/httpUtils"
import Url from "../../api/url"
const app = getApp()
import {
  wxRequestCode,
  wxToast,
  wxReLaunch,
  wxNavigateTo
} from '../../api/wxSdkUtils'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    identityAuthState: '',
    truckAuthState: '',
    haveSignedAgreement:'',
    name: "司机名",
    loginStatus:false,
    confState:true
  },
  onLoad: function (options) {
    // wxRequestCode().then(code => {
    //   console.log(code);
    //   var code = code;
    //   app.globalData.jscode = code;
    // })
  },
  getInfo() {
    http.post(Url.common.driverAuth).then(res => {
      if (res) {
        let driverName = res.driverName || '司机名';
        let identityAuthState = res.identityAuthState;
        let truckAuthState = res.truckAuthState;
        let haveSignedAgreement = res.haveSignedAgreement;
        this.setData({
          name: driverName,
          identityAuthState:identityAuthState,
          truckAuthState:truckAuthState,
          haveSignedAgreement:haveSignedAgreement
        })
      } 
    })
  },



  desensitization(str, beginLen, endLen){
    var len = str.length;
    var firstStr = str.substr(0, beginLen);
    var lastStr = str.substr(endLen);
    var middleStr = str.substring(beginLen, len-Math.abs(endLen)).replace(/[\s\S]/ig, '****');
    let tempStr = firstStr+middleStr+lastStr;
    return tempStr;
  },
  refreshData(){
    http.post(Url.common.refreshData,'').then(res => {
      if (res) {
        let driverName = res.driverName || '司机名';
        let identityAuthState = res.identityAuthState;
        let truckAuthState = res.truckAuthState;
        let haveSignedAgreement = res.haveSignedAgreement;
        wx.setStorageSync('mobile', res.mobile)
        let showMobile = this.desensitization(res.mobile,3,7);
        this.setData({
          name: driverName,
          mobile:showMobile ,
          identityAuthState:identityAuthState,
          truckAuthState:truckAuthState,
          haveSignedAgreement:haveSignedAgreement
        })
        this.creCheck();
      } 
    })
  },
  handleLogin(){
    wx.navigateTo({
      url: '/pages/login/index',
		})


    // let that = this;
    // wx.showLoading({
    //   title: '登录中',
    // })
    // let param = {};
    // param.jsCode = app.globalData.jscode;
    // param.code = '';
    // http.post(Url.login.login, param).then(res => {
    //   if (res.token) {
    //     wx.setStorageSync('tokenId', res.token);
    //     wx.setStorageSync('mobile', res.mobile);
    //     this.getOssInfo();
    //     this.setData({
    //       loginStatus:true
    //     })
    //     this.getInfo();
    //     this.refreshData();
    //     this.getWxVersion();
    //     wxToast({
    //       title: '登录成功'
    //     })
    //   } else {
    //     let weixinId= res.weixinId;
    //     app.globalData.weixinId = weixinId;
    //     wxToast({
    //       title: '暂未注册，请完成注册！'
    //     })
    //     wxReLaunch(`../token/index`)
    //   }
    // }).catch(err =>{
    //   wxRequestCode().then(code => {
    //     console.log(code);
    //     var code = code;
    //     //wx.setStorageSync('code', code)
    //     app.globalData.jscode = code;
    //     //that.handleLogin();
    //   })
    // })
   
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
  },
  onShow: function () {
    let that = this;
    this.getWxVersion();
    if(!wx.getStorageSync('tokenId')){  
      that.setData({
        loginStatus:false
      })
      wx.showModal({
        title: '提示',
        content: '司机相关信息需要登录后才可查看，是否马上登录？',
        success(res) {
          if (res.confirm) {
            that.handleLogin();
          } else if (res.cancel) {
          }
        }
      })
      return;
    }
    this.setData({
      loginStatus:true
    })
    this.getInfo();
    this.refreshData();  
  },
  getWxVersion(){
      http.get(Url.common.conf,'').then(res => {
         let confValue = res && res.confValue;
         if(confValue){
          if(confValue == '1.0.3'){
            this.setData({
              confState:true
            })
            app.globalData.confState = true;
           } else {
            this.setData({
              confState:false
            })
            app.globalData.confState = false;
           }
         }
      })
  },
  handleTel() {
    wx.showModal({
      title: '提示',
      content: '确认拨打:0572 6058335!',
      success(res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '0572 6058335'
          })
        } else {
          console.log('点击取消')
        }
      }
    })
  },
  handleInfo() {
    wxNavigateTo("../basic/tcinfo/index");
  },
  onPullDownRefresh: function () {
    if(!wx.getStorageSync('tokenId')){ 
      wx.stopPullDownRefresh();
      return;
    }
    this.refreshData();
    this.getInfo();
    this.getWxVersion();
    //this.creCheck();
  },
  toagreement(){
    wxNavigateTo("../agreementList/index");
  },
  getBank(){
    wxNavigateTo("../bankList/index");
  },
  handleOut() {
    http.post(Url.login.out).then(_ => {
      wx.clearStorage()
      wxToast({
        title: '退出成功'
      })
      this.setData({
        loginStatus:false
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
        loginStatus:false
      })
      //wxReLaunch("../my/index")
    })
  },
  creCheck() {
    if(this.data.confState){
      return
    }
    if (this.data.identityAuthState == 'UNAUTH') {
      console.log("未提交身份认证")
      return;
    };
    http.post(Url.login.creCheck).then(res => {
      if (!res.licensePicCheck || !res.truckCheck || !res.bankCardCheck || !res.negativeIdentityPicCheck){
        let nowGetDate = new Date().getDate().toString(); //得到日期
        if(wx.getStorageSync("credentialsCheckDate")){
          if (nowGetDate != wx.getStorageSync("credentialsCheckDate")) {
						wx.setStorageSync("credentialsCheckDate", nowGetDate)
            wxNavigateTo("../supplementary/index");
					} else {
						console.log('同一天提醒一次')
					}
        }else{
          wx.setStorageSync("credentialsCheckDate", nowGetDate)
          wxNavigateTo("../supplementary/index");
        }
      }
    }).catch(_ => {
    })
  }
})