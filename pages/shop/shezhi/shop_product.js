// pages/shop/shezhi/shop_product.js
var p=1;
var app=getApp();
// console.log(app);
Page({

  /**
   * 页面的初始数据
   */
  data: {
      product:[],
      hid:true,
      show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that=this;
    //  console.log(options);
    console.log(p);
     this.setData({
       shop_id:options.shopId
     });
      this.loadProduct=function(){
        console.log(p);
        wx.request({
        url: 'https://www.chinascw.net/xcx/user/shopproductlist?shop_id='+options.shopId,
        method:'GET',
        header: { 'Content-Type': 'application/json' }, 
        data:{
          p:p
        },
        success:function(res){
           console.log(res);
          //  if(res.data==0){
          //    that.setData({
          //      show: false,
          //      product:[]
          //    })
          //  }
          var result=res.data.data;
          var msg=[];
          if(!(result==undefined)){
            that.setData({
              show:true
            })
            for (var i = 0; i < result.length; i++) {
              var newArr = { audit: "", cate_id: "", city_id: "", closed: "", create_time: "", goods_id: "", photo: "", title: "" };
              newArr.audit = result[i].audit;
              newArr.cate_id = result[i].cate_id;
              newArr.city_id = result[i].city_id;
              newArr.closed = result[i].closed;
              newArr.create_time = app.toDate(result[i].create_time);
              newArr.goods_id = result[i].goods_id;
              newArr.photo = result[i].photo;
              newArr.title = result[i].title;
              msg.push(newArr);
            }
          }else if (result==undefined){
            setTimeout(function(){
            wx.showToast({
                    title: "亲，没有数据了", 
                    duration: 2000                            
                })},1000);
            wx.stopPullDownRefresh();
            return;
          } else if (result.length<5){
            wx.showToast({
              title: '数据已加载完',
              image: '../../../images/remind.png'
            });
            
            wx.stopPullDownRefresh();
            return false;
          }
         var arr= that.data.product.concat(msg);
          that.setData({
            product:arr
          }); 
          p++;
        }
      })
      }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.loadProduct();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      if(p!=1){
        this.data.product=[];
        p=1;
        this.loadProduct();
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
  lower:function(){
    this.setData({
      hid:false
    })
    this.loadProduct();
    var that=this;
    setTimeout(function(){
      that.setData({
        hid: true
      })
    },1000)
  },
  remove:function(e){
      var that=this;
      var tar=e.currentTarget.dataset;
      var shop=this.data.shopId;
      wx.request({
        url: 'https://www.chinascw.net/xcx/user/shopGoodsDel?goods_id='+tar.goods_id+"&shop_id="+shop+"&cate_id="+tar.cate_id+"&city_id="+tar.city_id,
        method:'POST',
        success:function(res){
          console.log(res);
              wx.showToast({
                title: '删除成功',
              });
              p=1;
              that.data.product=[];
              that.loadProduct();
        }
      })
  },
  edit:function(e){
    var goods_id=e.currentTarget.dataset.goods_id;
    var that=this;
    wx.navigateTo({
      url: "/pages/shop/product/edit?goods_id="+goods_id+"&shop_id="+that.data.shop_id,
    })
  }
})