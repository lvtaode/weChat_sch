// pages/shezhi/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: [],
    userId:"",
    showModal: false,
    rename:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options)
  
  var userId=options.userId;
  var that=this;
  that.shezi=function(){
    wx.request({
      url: "https://www.chinascw.net/xcx/User/index",
      data: {
        user_id: options.userId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        var user = "";
        var wb = "";
        var weixin = "";
        var wx = "";
        var nickname="";
        that.setData({
          user: res.data.users,
          wb: res.data.wb,
          weixin: res.data.weixin,
          wx: res.data.wx,
          userId: userId,
          nickname: res.data.users.nickname
        })
      }
    })
  }
 
  },
  /**
        * 弹窗
        */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * input中内容
   */

  inputChange:function(e){
    
    this.setData({
      rename: e.detail.value
    })
  },

  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    var userid = this.data.userId;
    var nickname = this.data.rename;
    console.log(nickname);
    var that=this;
     wx.request({
        url: "https://www.chinascw.net/xcx/User/person",
        data: {
          nickname: nickname,
          user_id: userid
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          setTimeout(function () {
            that.hideModal();
          }, 1500);
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1000
          });
          that.setData({
            nickname:nickname
          })
        }
      });
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
    this.shezi();
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
  pushImg: function () {
    // console.log("点击了")
   
    var that=this;
   var uid=that.data.userId;
    wx.chooseImage({
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths  //图片  
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 1500
        });
        that.setData({
          tempFilePaths: tempFilePaths
        })
       var usID= that.data.userId
        wx.uploadFile({
          url: 'https://www.chinascw.net/xcx/User/upload_face?uid='+usID, 
          header: { "Content-Type": "multipart/form-data" },
          filePath: tempFilePaths[0],  
          name: 'face', //文件对应的参数名字(key)
          success: function (res) {
            // console.log(res)
            // console.log(res.data)
          }
        })
      }
    })
  }
})