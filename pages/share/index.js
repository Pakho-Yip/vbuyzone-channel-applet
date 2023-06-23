// pages/share/index.js
import drawQrcode from '../../utils/weapp.qrcode.esm.js'
import http from "../../api/httpUtils"
import Url from "../../api/url"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginStatus: false,
    animationData: {},
    showModalStatus: false,
    sharelink: "https://www.fenhuijie.com/vbuyzone-fenhuijie-web/appDow.html",
    localCodeUrl: '', //绘制的二维码图片本地路径
    list: [{
      name: "小虫科技",
      isCheck: false
    }, {
      name: "大客户名称",
      isCheck: true
    }, {
      name: "大客户名称",
      isCheck: false
    }, {
      name: "大客户名称",
      isCheck: false
    }, {
      name: "大客户名称",
      isCheck: false
    }, {
      name: "大客户名称",
      isCheck: false
    }, {
      name: "大客户名称",
      isCheck: false
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getQrcode();
    // this.getInviteCodes();
    // this.getImginfo(this.data.sharelink, 1)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function () {
  //   let that = this;
  // if (!wx.getStorageSync('tokenId')) {
  //   that.setData({
  //     loginStatus: false
  //   })
  //   wx.navigateTo({
  //     url: '../login/index'
  //   })
  //   return;
  // }
  // this.setData({
  //   loginStatus: true
  // })
  // },


  onShow() {
    wx.createSelectorQuery()
      .select('#myCanvas') // 在 WXML 中填入的 id
      .fields({ node: true, size: true })
      .exec((res) => {
        console.log(res)
        // Canvas 对象
        const canvas = res[0].node
        // 渲染上下文
        const ctx = canvas.getContext('2d')

        // Canvas 画布的实际绘制宽高
        const width = res[0].width
        const height = res[0].height


        // 初始化画布大小
        const dpr = wx.getWindowInfo().pixelRatio
        canvas.width = width * dpr
        canvas.height = height * dpr
        ctx.scale(dpr, dpr)


        setTimeout(() => {

          const query = wx.createSelectorQuery()
          query.select('#myCanvas')
            .fields({
              node: true,
              size: true
            })
            .exec((res) => {
              var canvas = res[0].node

              //调用方法drawQrcode生成二维码
              drawQrcode({
                canvas: canvas,
                canvasId: 'myQrcode',
                width: 130,
                padding: 0,
                background: '#ffffff',
                foreground: '#000000',
                text: this.data.sharelink,
              })

              //获取临时路径（得到之后，想干嘛就干嘛了）
              wx.canvasToTempFilePath({
                canvasId: 'myQrcode',
                canvas: canvas,
                x: 0,
                y: 0,
                width: 130,
                height: 130,
                destWidth: 130,
                destHeight: 130,
                success(res) {
                  // console.log('二维码临时路径：', res.tempFilePath)
                },
                fail(res) {
                  console.error(res)
                }
              })
            })


        }, 100)


        new Promise(() => {
          const bg = canvas.createImage()
          bg.src = '../../assets/images/share/bg_share_poster_bg.png'
          bg.onload = () => {
            ctx.drawImage(bg, 0, 0, 366, 651)
          }

        }).then(() => {

        })

        // ctx.font = "16px";
        // ctx.fillStyle = '#FF470D';
        // ctx.fillText('小虫科技企业专属邀请码', 95, 51);
        // setTimeout(() => {

        //   const qrcode = canvas.createImage()
        //   // qrcode.src = '../../assets/images/share/bg_share_poster_bg.png'
        //   qrcode.onload = () => {
        //     ctx.drawImage(this.data.sharelink, 0, 0, 366, 651)
        //   }
        //   // ctx.drawImage(this.data.sharelink, 0, 0, 366, 651);
        // }, 100)

        setTimeout(() => {
          ctx.font = "16px";
          ctx.fillStyle = '#FF470D';
          ctx.fillText('小虫科技企业专属邀请码', 95, 70);
          ctx.fillText('Z7838K', 153, 95);
        }, 100)
        // ctx.restore();
        // ctx.save();
        // ctx.fillStyle = fillStyle;
        // ctx.font = font;
        // ctx.fillText('妖妖灵2222222222', 100, 60);
        // ctx.restore();

        // 绘制红色正方形
        // ctx.fillStyle = 'rgb(200, 0, 0)';
        // ctx.fillRect(10, 10, 50, 50);

        // 绘制蓝色半透明正方形
        // ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        // ctx.fillRect(30, 30, 50, 50);

        // 生成图片
        wx.canvasToTempFilePath({
          canvas,
          success: res => {
            // 生成的图片临时文件路径
            this.setData({
              tempFilePath: res.tempFilePath
            })
          },
        })
      })
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

  //生成二维码
  getQrcode() {
    const query = wx.createSelectorQuery()
    query.select('#myQrcode')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        var canvas = res[0].node

        // 调用方法drawQrcode生成二维码
        drawQrcode({
          canvas: canvas,
          canvasId: 'myQrcode',
          // width: 130,
          // padding: 0,
          background: '#ffffff',
          foreground: '#000000',
          text: this.data.sharelink,
        })

        // 获取临时路径（得到之后，想干嘛就干嘛了）
        wx.canvasToTempFilePath({
          canvasId: 'myQrcode',
          canvas: canvas,
          x: 0,
          y: 0,
          width: 130,
          height: 130,
          destWidth: 130,
          destHeight: 130,
          success(res) {
            // console.log('二维码临时路径：', res.tempFilePath)
          },
          fail(res) {
            console.error(res)
          }
        })
      })
  },
  //查询渠道商所有邀请码
  getInviteCodes() {
    let param = {};
    param.channelAgentId = "1111";
    console.log(param);
    http.get(Url.share.queryInviteCode, param).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
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
  selectItem(e) {
    console.log(e.currentTarget.dataset.index)
    let datas = this.data.list;
    for (var i = 0; i < datas.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        datas[i].isCheck = true;
      } else {
        datas[i].isCheck = false;
      }
      this.setData({
        list: datas
      })
    }


  },

  getImginfo: function (urlArr, _type) {
    console.log("11111111111")
    let that = this;
    wx.getImageInfo({
      src: that.data.sharelink,
      success: function (res) {
        console.log(res)
        //res.path 是网络图片的本地地址
        // if (_type === 0) { //商品图片
        //   that.setData({
        //     localImageUrl: res.path,
        //   })
        //   that.getImginfo(urlArr, 1)
        // } else {
        that.setData({ //二维码
          localCodeUrl: res.path,
        })
        // }
      },
      fail: function (e) {
        console.log(e)
        // 获取logo失败也不应该影响正确生成二维码图片
        // 这里可以给出失败提示
        // resolve();
      }
    })
  }
})