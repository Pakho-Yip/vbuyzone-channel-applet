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
    // sharelink: "https://www.fenhuijie.com/vbuyzone-fenhuijie-web/appDow.html",
    localCodeUrl: '', //绘制的二维码图片本地路径
    localIosCodeUrl: '',//ios绘制的二维码图片本地路径
    saveFilePath: '',
    codeText: '',
    // inviteCode: '******',
    selectitem: {},
    systemInfo: {},
    posterName: '',
    invitationCode: '',
    list: []
    // list: [{
    //   name: "小虫科技",
    //   isCheck: false
    // }, {
    //   name: "大客户名称",
    //   isCheck: true
    // }, {
    //   name: "大客户名称",
    //   isCheck: false
    // }, {
    //   name: "大客户名称",
    //   isCheck: false
    // }, {
    //   name: "大客户名称",
    //   isCheck: false
    // }, {
    //   name: "大客户名称",
    //   isCheck: false
    // }, {
    //   name: "大客户名称",
    //   isCheck: false
    // }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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
    let that = this;
    console.log(that.data.systemInfo);
    console.log(wx.getStorageSync('tokenId'));
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          systemInfo: res
        });
      }
    });
    if (!wx.getStorageSync('tokenId')) {
      that.setData({
        loginStatus: false
      })
      wx.navigateTo({
        url: '../login/index'
      })
      return;
    } else {
      // if (that.data.systemInfo.platform == 'android') {
      //   that.getQrcode();
      // } else {
      //   that.getQrcode();
      //   that.getIosQrcode();
      // }
      that.getInviteCodes();
      that.setData({
        loginStatus: true
      })
    }
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

  //生成二维码-安卓
  getQrcode() {
    const query = wx.createSelectorQuery()
    query.select('#myQrcode')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        if (this.data.invitationCode) {
          var canvas = res[0].node;

          // 调用方法drawQrcode生成二维码
          drawQrcode({
            canvas: canvas,
            canvasId: 'myQrcode',
            // width: 130,
            // padding: 0,
            background: '#ffffff',
            foreground: '#000000',
            text: `https://www.fenhuijie.com/vbuyzone-fenhuijie-web/appDow.html?invitationCode=${this.data.invitationCode}`,
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
              // if (that.data.systemInfo.platform == 'android') {
              //   that.generatePoster();
              // }
            },
            fail(res) {
              console.error(res)
            }
          })
        } else {
          var canvas = res[0].node;

          // 调用方法drawQrcode生成二维码
          drawQrcode({
            canvas: canvas,
            canvasId: 'myQrcode',
            // width: 130,
            // padding: 0,
            background: '#ffffff',
            foreground: '#000000',
            text: `https://www.fenhuijie.com/vbuyzone-fenhuijie-web/appDow.html`,
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
              // if (that.data.systemInfo.platform == 'android') {
              //   that.generatePoster();
              // }
            },
            fail(res) {
              console.error(res)
            }
          })
        }
      })
  },
  //生成二维码-ios
  getIosQrcode() {
    console.log("myIosQrcode");
    const query = wx.createSelectorQuery()
    query.select('#myIosQrcode')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        if (this.data.invitationCode) {
          var canvas = res[0].node

          // 调用方法drawQrcode生成二维码
          drawQrcode({
            canvas: canvas,
            canvasId: 'myIosQrcode',
            // width: 130,
            // padding: 0,
            background: '#ffffff',
            foreground: '#000000',
            text: `https://www.fenhuijie.com/vbuyzone-fenhuijie-web/appDow.html?invitationCode=${this.data.invitationCode}`,
          })

          // 获取临时路径
          let that = this;
          wx.canvasToTempFilePath({
            canvasId: 'myIosQrcode',
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
                localIosCodeUrl: res.tempFilePath,
              })
              // that.generatePoster();
            },
            fail(res) {
              console.error(res)
            }
          })
        } else {
          var canvas = res[0].node

          // 调用方法drawQrcode生成二维码
          drawQrcode({
            canvas: canvas,
            canvasId: 'myIosQrcode',
            // width: 130,
            // padding: 0,
            background: '#ffffff',
            foreground: '#000000',
            text: `https://www.fenhuijie.com/vbuyzone-fenhuijie-web/appDow.html`,
          })

          // 获取临时路径
          let that = this;
          wx.canvasToTempFilePath({
            canvasId: 'myIosQrcode',
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
                localIosCodeUrl: res.tempFilePath,
              })
              // that.generatePoster();
            },
            fail(res) {
              console.error(res)
            }
          })
        }
      })
  },
  //查询渠道商所有邀请码
  getInviteCodes() {
    let that = this;
    let channelAgentId = wx.getStorageSync('channelAgentId');
    console.log(channelAgentId)
    let param = {};
    param.channelAgentId = channelAgentId;
    console.log(param);
    http.get(Url.share.queryInviteCode, param).then(res => {
      that.setData({ //二维码
        list: res,
        posterName: res[0].organizationAliasName,
        invitationCode: res[0].invitationCode
      })
      if (that.data.systemInfo.platform == 'android') {
        that.getQrcode();
      } else {
        that.getQrcode();
        that.getIosQrcode();
      }
    }).catch(err => {
      console.log(err)
    })
  },
  //点击出现底部弹窗
  selectCode() {
    let that = this;
    if (that.data.list && that.data.list != 0) {
      that.showModal();
      wx.hideTabBar();
    }
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
  //选择大客户
  selectItem(e) {
    console.log(e.currentTarget.dataset.index)
    let datas = this.data.list;
    console.log(datas)
    for (var i = 0; i < datas.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        datas[i].isCheck = true;
        this.setData({
          selectitem: datas[i]
        })
      } else {
        datas[i].isCheck = false;
      }
      this.setData({
        list: datas
      })
    }
  },
  //选择大客户-确定按钮
  selectBtn() {
    let that = this;
    that.setData({
      posterName: that.data.selectitem.organizationAliasName,
      invitationCode: that.data.selectitem.invitationCode
    });
    if (that.data.systemInfo.platform == 'android') {
      that.getQrcode();
    } else {
      that.getQrcode();
      that.getIosQrcode();
    }
    that.hideModal();
  },
  //保存海报
  savePoster() {
    wx.showLoading({
      title: '保存中',
    })
    this.generatePoster();
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
        ctx.restore()
        ctx.save()
        setTimeout(() => {
          ctx.font = "16px";
          ctx.fillStyle = '#FF470D';
          that.data.codeText = `${that.data.posterName ? that.data.posterName : ''}专属邀请码`;
          ctx.fillText(that.data.codeText, (bg.width / 2 - ctx.measureText(that.data.codeText).width) / 2, 70);
          ctx.fillText(that.data.invitationCode, (bg.width / 2 - ctx.measureText(that.data.invitationCode).width) / 2, 95);
        }, 100)
        // 生成 二维码
        setTimeout(() => {
          const code = canvas.createImage()
          // code.src = this.data.localCodeUrl
          if (that.data.systemInfo.platform == 'android') {
            code.src = that.data.localCodeUrl
          } else {
            code.src = that.data.localIosCodeUrl
          }
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
    if (that.data.invitationCode) {
      wx.setClipboardData({//复制文本
        data: that.data.invitationCode,
        success: function (res) {
          wx.showToast({
            title: '复制成功',
            icon: "none",
            mask: "true"//是否设置点击蒙版，防止点击穿透
          })
        }
      })
    } else {
      wx.setClipboardData({//复制文本
        data: '',
        success: function (res) {
          wx.showToast({
            title: '复制失败',
            icon: "none",
            mask: "true"//是否设置点击蒙版，防止点击穿透
          })
        }
      })
    }
  }
})