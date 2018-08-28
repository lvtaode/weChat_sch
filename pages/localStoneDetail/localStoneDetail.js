
//获取应用实例 
var app = getApp()
Page({
  data: {
    autoplay: true,
    interval: "5000",
    duration: "1000",
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    loading: true,
    hidden:false,
    note: "点击收藏",
    imgUrl:'http://www.chinascw.net/themes/default/Mobile/statics/img/s2.png'
  },
  onLoad: function (options) {
    console.log(options)
    var that = this;
    var userId = wx.getStorageSync('uid');
   this.setData({
     goods_id: options.goods_id
   })
    wx.request({
      url: "https://www.chinascw.net/xcx/goods/detail",
      data: {
        goods_id: options.goods_id,
        user_id:userId
      },
      success: function (res) {
      console.log(res.data);
      if (res.data.favor == 1) {
        that.setData({
          note: "已收藏",
          imgUrl: 'http://www.chinascw.net/themes/default/Mobile/statics/img/s4.png'
        })
      }
        var detailData = res.data.detail;
        var detail = [];
          detail.push(detailData);
     var detailShop=res.data.shop;
     
        that.setData({
          detail: detailData,
          detailShop: detailShop,
          hidden: true

        })
      }
    })

  },
  call: function (e) {
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel, //此号码并非真实电话号码，仅用于测试 
      success: function (res) {
        console.log("拨打电话成功！");
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
    wx.switchTab({
      url: '/pages/shop/shop',
    })
  },
  collection: function () {
    var uid = wx.getStorageSync('uid');
    console.log(uid, this.data.goods_id);
    var that = this;
    if (uid) {
      wx.request({
        url: `https://www.chinascw.net/xcx/goods/goodsFavorites?goods_id=${that.data.goods_id}&user_id=${uid}`,
        method: 'POST',
        success: function (res) {
          console.log(res);
          that.setData({
            note: "已收藏",
            imgUrl: 'http://www.chinascw.net/themes/default/Mobile/statics/img/s4.png'
          })
        }
      })
    } else {
      wx.showToast({
        title: '请先登录',
        image: '/images/remind.png',
        duration: 1500
      });
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/login/index',
        })
      }, 1500)
    }
  }
})


