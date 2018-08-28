Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:false,
    list:[],
    jiazai:true,
    httpLock: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that=this;
    var p = 1;
    that.kqList=function(){
    
      if (that.data.httpLock==false){
        wx.request({
          url: "https://www.chinascw.net/xcx/shop/factory",
          data: {
            p: p
          },
          method: "GET",
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res);
            var listData = res.data.list;
            var list = [];
            listData.map((item, index) => {
              var dd = { shop_name: "", photo: "", addr: "", shop_id: "" };
              dd.shop_name = item.shop_name;
              dd.shop_id = item.shop_id;
              dd.photo = item.photo;
              dd.addr = item.addr;
              list.push(dd);
            })
            Array.prototype.push.apply(that.data.list, list);
            that.setData({
              list: list,
              hidden: true
            })
            if (p == Math.ceil(res.data.count / 10)) {
              that.setData({
                httpLock: true,
                jiazai: false,
                hidden:true
              })
              return false;
            }
            p++;
          
          }
        })
      }
      
    }
   
  },
lower:function(){
  console.log("chufa ")

   if(this.data.httpLock==false){
    this.setData({
      hidden: false
    })
    this.kqList()
    this.setData({
      hidden:true
    })
   }
 
},
onReady:function(){
  this.kqList()
}
})