// pages/shop/shezhi/add_env.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageFilePaths:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shop_id:options.shopId
    })
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
  uploadImg:function(){
    var that=this;
    wx.chooseImage({
      count:1,
      success:function(res){
        var tempFilePaths = res.tempFilePaths[0];  //图片  
        console.log(tempFilePaths);
        wx.uploadFile({
          url: 'https://www.chinascw.net/xcx/user/pics',
          header: { "Content-Type": "multipart/form-data" },
          filePath: tempFilePaths,
          name: 'image',
          success:function(res){
            var data = JSON.parse(res.data);
            console.log(data);
            that.setData({
              imageFilePaths:data.picUrl
            })
          }
        });
      }
    })
  },
  formSubmit:function(){  
    console.log(this.data.imageFilePaths);
    if (this.data.imageFilePaths==''){
      wx.showToast({
        title: '请上传图片',
        image:'/images/remind.png'
      });
      return;
    }
      var that=this;
      wx.request({
        url: 'https://www.chinascw.net/xcx/user/shopHuanAdd',
        method: 'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded" },
        data:"shop_id="+that.data.shop_id+"&photo="+that.data.imageFilePaths,
        success:function(res){
          console.log(res);
          wx.showToast({
            title: '提交成功',
          });
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          },1500)
        }
      })
  }
})