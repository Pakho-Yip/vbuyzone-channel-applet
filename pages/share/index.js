// pages/share/index.js
import drawQrcode from '../../utils/weapp.qrcode.esm.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const query = wx.createSelectorQuery()
    // query.select('#myQrcode')
    //   .fields({
    //     node: true,
    //     size: true
    //   })
    //   .exec((res) => {
    //     var canvas = res[0].node

    //     // 调用方法drawQrcode生成二维码
    //     drawQrcode({
    //       canvas: canvas,
    //       canvasId: 'myQrcode',
    //       // width: 130,
    //       // padding: 0,
    //       background: '#ffffff',
    //       foreground: '#000000',
    //       text: '个人二维码信息',
    //     })

    //     // 获取临时路径（得到之后，想干嘛就干嘛了）
    //     wx.canvasToTempFilePath({
    //       canvasId: 'myQrcode',
    //       canvas: canvas,
    //       x: 0,
    //       y: 0,
    //       width: 130,
    //       height: 130,
    //       destWidth: 130,
    //       destHeight: 130,
    //       success(res) {
    //         console.log('二维码临时路径：')

    //         // console.log('二维码临时路径：', res.tempFilePath)
    //       },
    //       fail(res) {
    //         console.error(res)
    //       }
    //     })
    //   })
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

  selectCode() {
    this.showModal();
    wx.hideTabBar();
  },
  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    wx.showTabBar();
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
})