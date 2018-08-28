// pages/toutiao/tt_list.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
  hidden:false,
  list1:[],
  httpLock:false,
  btn:true,
  shopId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key: 'shopId',
      success: function(res) {
        if (res.data) {
          that.setData({
            btn: false,
            shopId: res.data
          });
        }
      }
    })
   
    var that = this;
    console.log(that.data.httpLock)
    //时间戳转换时间  
    function toDate(number) {
      var n = number * 1000;
      var date = new Date(n);
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return (Y + M + D)
    }  
    var p = 1;
  that.list = function () {
   if(that.data.httpLock==false){ //设置节流阀 为false时发送请求 为true时停止请求
     wx.request({
       url: "https://www.chinascw.net/xcx/toutiao/index",
       method: "GET",
       data: {
         p: p
       },
       header: {
         'content-type': 'application/json' // 默认值
       },
       success: function (res) {

         console.log(res.data)
         var listData = res.data.list;
         var list = [];
         listData.map((item, index) => {
           var dd = { title: "", create_time: "", details: "", id: "", photo: "" };
           dd.title = item.title;
           dd.details = item.details;
           dd.photo = item.photo;
           dd.create_time = toDate(item.create_time);
           dd.id = item.id
           list.push(dd);
         });
         Array.prototype.push.apply(that.data.list1, list);
         that.setData({
           list1: that.data.list1,
           hidden: true
         })
         console.log(p)
         if (p == Math.ceil(res.data.count / 10)) {
           wx.showToast({ title: "亲，没有数据了", duration: 3000 }

           );
           that.setData({
             hidden: true,
             httpLock:true//没有的时候打开节流阀
           })
         
           return false;
         
         }
         p++;
       }

     })
   }
   
  }
 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.list();
  },
lower1:function(){
  this.data.hidden = true;
  this.list()
  this.setData({
    hidden: false,
  })
  if (this.data.httpLock==true){
    this.setData({
      hidden: true,
    })
  }
  
  return false;
}
 
})