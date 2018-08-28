// pages/shop/product/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      shop_id: options.shop_id
    })
    var that = this;
    wx.request({
      url: 'https://www.chinascw.net/xcx/user/shopProductAdd?shop_id',
      success: function (res) {
        console.log(res);
        var target = res.data.cate;
        var newArr = ["请选择"];
        var xuhao = [0];
        for (var i = 0; i < target.length; i++) {
          newArr.push(target[i].cate_name);
          xuhao.push(target[i].cate_id);
        }
        that.setData({
          array: newArr,
          xuhao: xuhao,
        })
      }
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
  userSelect: function (e) {
    console.log(e);
    var i = e.detail.value;
    this.setData({
      index: i
    });
  },
  uploadImg: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        console.log(res);
        var tempFilePaths = res.tempFilePaths[0];  //图片  
        console.log(tempFilePaths);
        wx.uploadFile({
          url: 'https://www.chinascw.net/xcx/user/pics',
          header: { "Content-Type": "multipart/form-data" },
          filePath: tempFilePaths,
          name: 'photo',
          success: function (res) {
            var data = JSON.parse(res.data);
            console.log(data);
            that.setData({
              imageFilePaths: data.picUrl
            });
          }
        });
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 1500
        });
      },
    })
  },
  formSubmit: function (e) {
   console.log(e.detail.value);
    var target = e.detail.value;
    var that = this;
    target.photo = this.data.imageFilePaths;
    console.log(target);
    if(target.title=="" || target.cate_id=="0" || target.photo==undefined){
        wx.showToast({
          title: '信息不完善',
          image:'/images/remind.png'
        })
    }else{
        wx.request({
          url: 'https://www.chinascw.net/xcx/user/shopProductAdd?shop_id='+that.data.shop_id,
          method: 'POST',
          header: { "Content-Type": "application/x-www-form-urlencoded" },
          data: target,
          success: function (res) {
            console.log(res);
            wx.showToast({
              title: '添加成功',
              duration: 2000
            });
            setTimeout(function () {
              wx.navigateBack({
                delta:1
              })
            }, 2000);
          }
        }) 
    }
  }
})