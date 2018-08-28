
Page({

  /**
   * 页面的初始数据
   */
  data: {
      formData:{},
      tempFilePaths:[],
      shopId:"",
      imgUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        console.log(options);
        this.setData({
          shopId:options.shopId
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
  formSubmit:function(e){
    console.log(e.detail.value);
    var result=e.detail.value;
    // console.log(this.data.userId);
    result.shop_id=this.data.shopId;
    result.picUrl=this.data.imgUrl;
    // console.log(result); 
    var that=this;
    if (result.title == "" || result.details==""){
      wx.showToast({
        title: '信息不完善',
        image:'../../images/remind.png'
      })
    }else{
      wx.request({
        url: 'https://www.chinascw.net/xcx/post/ttAdd',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"   
          },
        method:'POST',
        data:result,
        success: function (res) {
          console.log(res);
          wx.showToast({
            title: '请等待审核',
          });
          setTimeout(function(){
            wx.navigateTo({
              url: '/pages/toutiao/tt_list?shopId='+that.data.shopId,
            })
          },1500)     
        }
      })
    }
    
  },
  uploadImg:function(){
    var that = this;
    wx.chooseImage({
      count:1,
      success: function(res) {
        console.log(res);
        var tempFilePaths = res.tempFilePaths  //图片  
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 1500
        });
        // var tempFile = that.data.tempFilePaths;
        // console.log(tempFile);
        // var newArr=tempFile.concat(tempFilePaths);
        // console.log(tempFile);
        that.setData({
          tempFilePaths:tempFilePaths
        })
        var uid=that.data.userId;
        // console.log(that.data.userId);
        // console.log(that.data.tempFilePaths[0]);
        // for (var i = 0; i < that.data.tempFilePaths.length; i++) {
          wx.uploadFile({
            url: 'https://www.chinascw.net/xcx/post/pics',
            header: { "Content-Type": "multipart/form-data" },
            filePath: that.data.tempFilePaths[0],
            name: 'face',
            success: function (res) {
              var data = JSON.parse(res.data);
              console.log(data);
              that.setData({
                  imgUrl:data.picUrl
              });
            }
          });
        // }
      },
    })
  },
  reg:function(e){
      console.log(e);
      var tel_num=e.detail.value;
      var result=this.isPhone(tel_num) || this.isTel(tel_num);
      if(!result){
        wx.showToast({
          title: '输入的号码有误',
          image: '../../images/remind.png'
        })
      }
  },
  // 判断是否为手机号  
  isPhone: function (pone) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(pone)) {
      return false;
    } else {
      return true;
    }
  },
  // 判断是否为电话号码  
  isTel: function (tel) {
    var myreg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
    if (!myreg.test(tel)) {
      return false;
    } else {
      return true;
    }
  } 
})