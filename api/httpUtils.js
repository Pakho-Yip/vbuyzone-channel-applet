import {
  wxToast,
  wxRequestCode
} from './wxSdkUtils'
const app = getApp();
console.log(app)
function loginOut() {
  wx.showModal({
    title: '提示',
    showCancel: false,
    content: '会话过期, 重新登录!',
    success() {
      wx.removeStorage({
        key: 'tokenId',
        success() {
          wxRequestCode().then(code => {
            console.log(code);
            var code = code;
            app.globalData.jscode = code;
            wx.reLaunch({
              url: '/pages/my/index',
            })
          })
        }
      })
    }
  })
}
function httpGet(url, data) {
  console.log("url", url);
  console.log("data", data);
  return new Promise((resolve, reject) => {
    let tokenId = wx.getStorageSync('tokenId')
    console.log("tokenId", tokenId);
    wx.request({
      header: {
        'Content-Type': 'application/json',
        'token': tokenId,
        "TerminalModule": "DRIVER_APPLET"
      },
      url,
      method: 'GET',
      // 需要手动调用JSON.stringify将数据进行序列化
      data,
      dataType: 'json',
      success: function (res) {
        res = res.data;
        if (res.returnCode == '200') {
          if (res && res.success) {
            resolve(res.result)
          } else {
            resolve(res)
          }
        } else if (res.errorCode == '#401') {
          // 登录失效时 重新跳转到登录页
          loginOut();
        } else {
          if (res.errMsg && res.errMsg.length > 7) {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: res.errorMsg,
            })
          } else {
            wxToast({
              title: res.errorMsg,
              icon: "none"
            })
          }
          reject(res)
        }
      },
      fail: function (res) {
        res = res.data
        if (res && res.errorCode == '#401') {
          // 登录失效时 重新跳转到登录页
          loginOut();
        } else {
          wxToast({
            title: res.errorMsg,
            icon: "none"
          })
          reject(res)
        }
      },
      complete: function (res) {
        wx.hideLoading();
      }
    })
  })
}

// showLoading: 默认不加载loading 传值: 1 加载头部 2 加载mask loading
function httpPost(url, data, showLoading, showError = true) {
  if (showLoading == 1) {
    wx.showNavigationBarLoading()
  }
  console.log("url", url);
  console.log("data", data);
  return new Promise((resolve, reject) => {
    let tokenId = wx.getStorageSync('tokenId')
    console.log("tokenId", tokenId);
    // console.log(url, data);
    wx.request({
      header: {
        'content-Type': 'application/json',
        "token": tokenId,
        "TerminalModule": "DRIVER_APPLET"
      },
      url,
      method: 'POST',
      // 需要手动调用JSON.stringify将数据进行序列化
      data: JSON.stringify(data || {}),
      dataType: 'json',
      success: function (res) {
        console.log("post", res);
        res = res.data;
        if (res.returnCode == '200') {
          if (res && res.success) {
            console.log(res);
            resolve(res.result)
          } else {
            if (res.errorCode == '#401') {
              loginOut();
            } else {
              if (res.errMsg && res.errMsg.length > 7) {
                wx.showModal({
                  title: '提示',
                  showCancel: false,
                  content: res.errorMsg,
                })
              } else {
                wxToast({
                  title: res.errorMsg,
                  icon: "none"
                })
              }
            }
            //reject(res)
          }
        } else if (res.errorCode == '#401') {
          // 登录失效时 重新跳转到登录页
          loginOut();
        } else {
          if (showError) {
            if (res.errMsg && res.errMsg.length > 7) {
              wx.showModal({
                title: '提示',
                showCancel: false,
                content: res.errorMsg,
              })
            } else {
              wxToast({
                title: res.errorMsg,
                icon: "none"
              })
            }
          }
          reject(res)
        }
      },
      fail: function (res) {
        res = res.data
        if (res && res.errorCode == '#401') {
          // 登录失效时 重新跳转到登录页
          loginOut();
        } else {
          if (showError) {
            if (res.errMsg && res.errMsg.length > 7) {
              wx.showModal({
                title: '提示',
                showCancel: false,
                content: res.errorMsg,
              })
            } else {
              wxToast({
                title: res.errorMsg,
                icon: "none"
              })
            }
          }
          reject(res)
        }
      },
      complete: function (res) {
        setTimeout(() => {
          wx.stopPullDownRefresh();
          wx.hideNavigationBarLoading();
          wx.hideLoading();
        }, 2000)
      }
    })
  })
}

export default {
  get: httpGet,
  post: httpPost
}