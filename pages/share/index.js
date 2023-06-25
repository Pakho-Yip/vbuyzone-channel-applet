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
    saveFilePath: '',
    codeText: '小虫科技无线无敌企业专属邀请码',
    inviteCode: 'Z7838K',
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
    this.getQrcode();
    this.getInviteCodes();
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


  // onShow() {
  //   wx.createSelectorQuery()
  //     .select('#myCanvas') // 在 WXML 中填入的 id
  //     .fields({ node: true, size: true })
  //     .exec((res) => {
  //       console.log(res)
  //       // Canvas 对象
  //       const canvas = res[0].node
  //       // 渲染上下文
  //       const ctx = canvas.getContext('2d')

  //       // Canvas 画布的实际绘制宽高
  //       const width = res[0].width
  //       const height = res[0].height

  //       // 初始化画布大小
  //       const dpr = wx.getWindowInfo().pixelRatio
  //       canvas.width = width * dpr
  //       canvas.height = height * dpr
  //       ctx.scale(dpr, dpr)

  //       new Promise(() => {
  //         const bg = canvas.createImage()
  //         bg.src = '../../assets/images/share/bg_share_poster_bg.png'
  //         bg.onload = () => {
  //           ctx.drawImage(bg, 0, 0, 366, 651)
  //         }

  //       }).then(() => {

  //       })

  //       setTimeout(() => {
  //         ctx.font = "16px";
  //         ctx.fillStyle = '#FF470D';
  //         ctx.fillText('小虫科技企业专属邀请码', 95, 70);
  //         ctx.fillText('Z7838K', 153, 95);
  //       }, 100)

  //       // 生成图片
  //       wx.canvasToTempFilePath({
  //         canvas,
  //         success: res => {
  //           // 生成的图片临时文件路径
  //           this.setData({
  //             tempFilePath: res.tempFilePath
  //           })
  //         },
  //       })
  //     })
  // },


  onShow: function () {
    this.generatePoster()
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

        // 获取临时路径
        let that = this;
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
            console.log('二维码临时路径：', res.tempFilePath)
            that.setData({ //二维码
              localCodeUrl: res.tempFilePath,
            })
          },
          fail(res) {
            console.error(res)
          }
        })
      })
  },
  //查询渠道商所有邀请码
  getInviteCodes() {
    let channelAgentId = wx.getStorageSync('channelAgentId');
    console.log(channelAgentId)
    let param = {};
    param.channelAgentId = channelAgentId;
    console.log(param);
    http.get(Url.share.queryInviteCode, param).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  //点击出现底部弹窗
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
  //保存海报
  savePoster() {
    wx.showLoading({
      title: '保存中',
    })
    setTimeout(() => {
      wx.canvasToTempFilePath({
        canvas: this.data.canvas, // canvas 实例
        success(res) {
          console.log(res);
          // canvas 生成图片成功
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              // 保存成功
              wx.hideLoading();
              wx.showToast({
                title: '已保存相册',
                icon: 'success',
                duration: 2000
              })
            },
            fail(e) {
              wx.hideLoading();
              wx.showToast({
                title: '保存失败',
                icon: 'none',
                duration: 2000
              })
              console.log(e);
            }
          })
        }
      })
    }, 4000)
  },
  //生成海报
  generatePoster() {
    let that = this;
    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        // 获取像素比
        const dpr = wx.getSystemInfoSync().pixelRatio
        // 将画布大小按照设备像素比例进行调整，使其在不同设备上显示的效果更加一致。
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)
        // 设置背景图片
        const bg = canvas.createImage()
        bg.src = '../../assets/images/share/bg_share_poster_bg.png'
        bg.onload = () => {
          ctx.drawImage(bg, 0, 0, 366, 651)
        }
        // 绘制 底部 盒子
        // ctx.fillStyle = '#f0f0f0'
        // ctx.fillRect(0, 400, 500, 100)
        // ctx.fill()
        // 设置 字体
        // ctx.fillStyle = '#000'
        // ctx.font = "16px 楷体"
        // ctx.fillText('11111111111hhhhh', 12, 12)
        // ctx.fill()
        ctx.restore()
        ctx.save()
        setTimeout(() => {
          ctx.font = "16px";
          ctx.fillStyle = '#FF470D';
          ctx.fillText(this.data.codeText, (bg.width / 2 - ctx.measureText(this.data.codeText).width) / 2, 70)
          ctx.fillText(this.data.inviteCode, 153, 95);
        }, 100)
        // 生成 二维码
        setTimeout(() => {
          const code = canvas.createImage()
          code.src = this.data.localCodeUrl
          code.onload = () => {
            ctx.drawImage(code, 118, 413, 130, 130)
          }
        }, 1000)
        that.setData({
          canvas: canvas
        })


        // // 生成图片
        // wx.canvasToTempFilePath({
        //   canvas,
        //   success: res => {
        //     console.log(res.tempFilePath)
        //     // 生成的图片临时文件路径
        //     that.setData({
        //       saveFilePath: res.tempFilePath
        //     })
        //   },
        // })






        // setTimeout(() => {

        //   wx.saveImageToPhotosAlbum({
        //     filePath: that.data.saveFilePath,
        //     success: (result) => {
        //       wx.showToast({
        //         title: '海报已保存，快去分享给好友吧。',
        //         icon: 'none'
        //       })
        //     },
        //     fail: (e) => {
        //       console.log(e)
        //     }
        //     // })
        //   })
        // }, 5000)


        // setTimeout(() => {
        //   wx.canvasToTempFilePath({
        //     canvas: this.data.canvas, // canvas 实例
        //     success(res) {
        //       console.log(res);
        //       // canvas 生成图片成功
        //       wx.saveImageToPhotosAlbum({
        //         filePath: res.tempFilePath,
        //         success(res) {
        //           // 保存成功
        //           wx.showToast({
        //             title: '已保存相册',
        //             icon: 'success',
        //             duration: 2000
        //           })
        //         }
        //       })
        //     }
        //   })
        // }, 5000)
      })
  },
  copyBtn() {
    let that = this;
    wx.setClipboardData({//复制文本
      data: that.data.inviteCode,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: "none",
          mask: "true"//是否设置点击蒙版，防止点击穿透
        })
      }
    })
  }
})