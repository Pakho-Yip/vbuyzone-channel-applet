// app.js
import {
  wxRequestCode
} from 'api/wxSdkUtils'
App({
  onLaunch() {
    let that = this;
    wxRequestCode().then(code => {
      console.log(code);
      var code = code;
      that.globalData.jscode = code;
      // let param = {};
      // param.jsCode = code;
      // param.termodule = 'DRIVER_APPLET';
      // let loginUrl = config[that.globalData.env].apiHost + '/app/login/driver/applets/login'; 
      // http.post(loginUrl, param).then(res => {
      //   if (res.token) {
      //     wx.setStorageSync('tokenId', res.token);
      //     wx.setStorageSync('mobile', res.mobile)
      //   }
      // })
    })
  },
  watch: function (ctx, obj) {
    Object.keys(obj).forEach(key => {
      this.observer(ctx.data, key, ctx.data[key], function (value) {
        obj[key].call(ctx, value)
      })
    })
  },
  // 监听属性，并执行监听函数
  observer: function (data, key, val, fn) {
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get: function () {
        return val
      },
      set: function (newVal) {
        if (newVal === val) return
        fn && fn(newVal)
        val = newVal
      },
    })
  },
  //全局属性
  globalData: {
    userInfo: null,
    env: "local",
    mapKey:'FNUBZ-YMC6V-4TTPY-USI5A-NMKAO-HOF4B',
    weixinId:'',
    jscode:"",
    confState:'true'
  }
})
