// pages/shop/shezhi/shop_manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      logoUrl:'',
      photoUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // console.log(options);
      this.setData({
        user_id:options.userId,
        shop_id:options.shopId
      });
      var that =this;
      wx.request({
        url: 'https://www.chinascw.net/xcx/user/shopManage',
        data:{
          shop_id:options.shopId
        },
        method:'GET',
        success:function(res){
            // console.log(res);
            var logo = 'https://www.chinascw.net/attachs/' + res.data.shop.logo;
            var image = 'https://www.chinascw.net/attachs/' + res.data.shop.photo;       
            if(res.data.shop.logo==""){
              logo=""
            }
            if (res.data.shop.image == "") {
              image = ""
            }   
            that.setData({
              shop:res.data.shop,
              details:res.data.details,
              logoFilePaths:logo,
              imageFilePaths:image,
              photoUrl:res.data.shop.photo
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
  uploadImg: function (e) {
    var tar = e.currentTarget.id;
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        console.log(res);
        var tempFilePaths = res.tempFilePaths[0];  //图片  
        // console.log(tar,tempFilePaths);
        if(tar=="logo"){
            that.setData({
              logoFilePaths: tempFilePaths
            });
            console.log(that.data.logoFilePaths);
            wx.uploadFile({
              url: 'https://www.chinascw.net/xcx/user/pics',
              header: { "Content-Type": "multipart/form-data" },
              filePath: that.data.logoFilePaths,
              name: 'logo',
              success: function (res) {
                console.log(res.data)
                var data = JSON.parse(res.data);
                console.log(data);
                that.setData({
                  logoUrl: data.picUrl
                });
              }
            });
        }else{
          that.setData({
           imageFilePaths: tempFilePaths
          });
          wx.uploadFile({
            url: 'https://www.chinascw.net/xcx/user/pics',
            header: { "Content-Type": "multipart/form-data" },
            filePath: that.data.imageFilePaths,
            name: 'photo',
            success: function (res) {
              var data = JSON.parse(res.data);
              console.log(data);
              that.setData({
                photoUrl: data.picUrl
              });
            }
          });
        }
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 1500
        });
      },
    })
  },
  reg: function (e) {
    console.log(e);
    var tel_num = e.detail.value;
    var result = this.isPhone(tel_num) || this.isTel(tel_num);
    if (!result) {
      wx.showToast({
        title: '输入的号码有误',
        image: '../../../images/remind.png'
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
  }, 
  formSubmit:function(e){
 
    var that=this;
    var result=e.detail.value;

    if(!this.data.logoUrl==''){
      result.logo = this.data.logoUrl;    
    }
    result.photo=this.data.photoUrl;
    result.user_id=this.data.user_id;

    var tel = this.isPhone(result.tel) || this.isTel(result.tel);
    if (result.shop_name == "" || !tel || result.contact == "" || result.photo==""){
      wx.showToast({
        title: '请完善信息',
        image: '../../../images/remind.png'
      })
    }else{
      
      wx.request({
        url: 'https://www.chinascw.net/xcx/user/shopManage?shop_id='+that.data.shop_id,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data:result,
        method: 'POST',
        success:function(res){
          wx.showToast({
            title: '修改成功',
            duration:2000
          })
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          },2000)
        }
      })
    }
  }
})