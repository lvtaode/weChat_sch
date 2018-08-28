
//获取应用实例 
var app = getApp()
Page({
  data: {
    autoplay: true,
    interval: "5000",
    duration: "1000",
    hasUrl:true,
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    loading:true,
    hidden:false,
    note:"点击收藏",
    imgUrl:'http://www.chinascw.net/themes/default/Mobile/statics/img/s2.png'
  },
  onLoad: function (options) {
   var userId= wx.getStorageSync('uid');
  //  console.log(userId);
    // console.log(options);
    this.setData({
      shopId:options.orderby
    });
    var that = this;
    // app.getUserInfo(function (userInfo) {
    //   //更新数据  
    //   console.log(userInfo);
    // })  
    that.swichNav = function (e) {

      if (this.data.currentTab === e.target.dataset.current) {
        return false;
      } else {
        this.setData({
          currentTab: e.target.dataset.current
        })
      }
    }
    wx.request({
      url: "https://www.chinascw.net/xcx/shop/detail",
      data: {
        shop_id: options.orderby,
        user_id:userId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res.data);
        if(res.data.favor==1){
          that.setData({
            note: "已收藏",
            imgUrl: 'http://www.chinascw.net/themes/default/Mobile/statics/img/s4.png'
          })
        }
        var detailData = res.data.detail;
        var detail = [];
        for (var i = 0; i < detailData.length; i++) {
          detail.push(detailData[i]);
        }
        var picData = detailData[0].pic;
        // console.log(picData[0].photo);
        var pic = [];
        for (var i = 0; i < picData.length; i++) {
          pic.push(picData[i]);
        }
        var productData = res.data.goods;
        var shopProdct = [];
        for (var i = 0; i < productData.length; i++) {
          if (i < 6) {
            shopProdct.push(productData[i]);
          }

        }
        if (res.data.case !== null) {
          var cases = [];

          for (var i = 0; i < res.data.case.length; i++) {
            cases.push(res.data.case[i]);
          }
          that.setData({
            cases: cases
          })
         
        } else{
          console.log(1);
          // wx.showToast({ title: "亲，没有案列", duration: 5000 })
          // return false;
        }
          
        
        
      
      

        var shopProdct1 = [];
        for (var i = 0; i < productData.length; i++) {
          shopProdct1.push(productData[i]);
        }
        if (detail[0].video_url != 0) {
          that.setData({
            hasUrl: false
          })
        }
        that.setData({
          detail: detail,
          pic: pic,
          shopProdct: shopProdct,
          shopProdct1: shopProdct1,
          hidden:true
        })
      }
    })


    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });

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
  tapBanner: function (e) {//图片放大功能
    console.log(e)
    //图片预览
    wx.previewImage({
      current: e.currentTarget.dataset.img,// 当前显示图片的http链接
      urls: [e.currentTarget.dataset.img] // 需要预览的图片http链接列表
    })
  },
  proBig: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.img,// 当前显示图片的http链接
      urls: [e.currentTarget.dataset.img] // 需要预览的图片http链接列表
    })
  },
  titleBig:function(e){
    wx.previewImage({
      current: e.currentTarget.dataset.img,// 当前显示图片的http链接
      urls: [e.currentTarget.dataset.img] // 需要预览的图片http链接列表
    })
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  // swichNav: function (e) {


  // },
  collection:function(){
    var uid = wx.getStorageSync('uid');
    console.log(uid,this.data.shopId);
    var that=this;    
    if(uid){
      wx.request({
        url: `https://www.chinascw.net/xcx/shop/shopFavorites?shop_id=${that.data.shopId}&user_id=${uid}`,
        method:'POST',
        success:function(res){
          console.log(res);
          that.setData({
            note: "已收藏",
            imgUrl: 'http://www.chinascw.net/themes/default/Mobile/statics/img/s4.png'
          })
        }
      })
    }else{      
      wx.showToast({
        title: '请先登录',
        image:'/images/remind.png',
        duration:1500
      });
      setTimeout(function () {
        wx.switchTab({
          url: '/pages/login/index',
        })
      }, 1500)
    }
  },
  vid:function(){
    // console.log(this.data.detail);
    var videoUrl=this.data.detail[0].video_url;
    // console.log(videoUrl);
    if(videoUrl!=0){
      wx.navigateTo({
        url: '/pages/video/video?url='+videoUrl,
      })
    }
  }
})


