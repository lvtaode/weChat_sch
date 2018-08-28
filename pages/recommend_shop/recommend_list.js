require = '(/pages/index/index.js)'
var app = getApp()
Page({
  data: {
    index: 0,
    city_id: "",
    hadListPage:"false",
   hidden:false,
   selectPerson: true,
   firstPerson: '选择地区',
   stoneCity: '选择石材城',
   selectArea: false,
   selectPerson1: true,
   hidden: false,
   shopLists:[],
   tuijian:true,
   zhezhao2: true,
   
  },
  onLoad: function (options) {
    var p=1;
    var that = this;
    that.loadList=function(){
      var city_id = options.id;
      console.log(options)
      // 推荐商家
      var urlShop = "https://www.chinascw.net/xcx/shop/shopList";
      
      wx.request({
        url: urlShop,
        data: {
        city_id:options.id,
        p:p
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
       
        success: function (res) {
          console.log(res.data);
          var shopData = [];
          if (res.data.shopList==null){
            wx.showToast({ title: "亲，没有数据了", duration: 5000 });
            that.setData({
              hidden:true
            })
            return false;
          }
          for (var i = 0; i < res.data.shopList.length; i++) {
            var dd = { city_id: "", addr: "", shop_name:"",shop_id:"",photo:""};
            dd.city_id = res.data.shopList[i].city_id;
            dd.addr = res.data.shopList[i].addr;
            dd.shop_id = res.data.shopList[i].shop_id;
            dd.shop_name = res.data.shopList[i].shop_name;
            dd.photo = res.data.shopList[i].photo;
            shopData.push(dd);
      
          }
     
            p++;
            if (res.data.shopList.length < 20) {
              wx.showToast({ title: "亲，没有数据了", duration: 5000 }

              );
          
              //阻止触发事件
              wx.stopPullDownRefresh();
              return false;
            } 
            //地区
            var areas=[];
            
          
          for(var i=0;i<res.data.areas.length;i++){
            areas.push(res.data.areas[i]);

          }
          Array.prototype.push.apply(that.data.shopLists, shopData);//追加到列表
          
          that.setData({
            shopLists: that.data.shopLists,
            city_id: city_id,
            areas: areas,
            hidden: true,
            zhezhao2: true
         
          });
       
       
        }
      })
    }
    
  },
  onReady: function () {

    this.loadList()
  },
  lower1: function (e) {
    console.log(this.data.hidden)
    this.data.hidden = true
    console.log("触发");

    this.loadList();
    this.setData({
      hidden: false
    })
  },
  //点击选择类型
  clickPerson: function () {
    var selectPerson = this.data.selectPerson;
    if (selectPerson == true) {
      this.setData({
        selectArea: true,
        selectPerson: false,
      })
    } else {
      this.setData({
        selectArea: false,
        selectPerson: true,
      })
    }
  },
  //点城市击切换

  mySelect: function (e) {
    var areaId = e.currentTarget.dataset.cateid;
    var p=1;
    var that=this;

    wx.request({
      url: "https://www.chinascw.net/xcx/shop/shopList",
      data: {
        city_id: this.options.id,
        cate_id: 72,
        area_id: areaId,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
     success:function(res){
       console.log(res.data)
       if (res.data.status == 400) return;

       if (res.data.shopList == null) {
         wx.showToast({ title: "亲，没有数据了", duration: 5000 })
         that.setData({
           hidden: true
         })
         return false;
       }
       console.log(res.data)
       var shopData = [];
       for (var i = 0; i < res.data.shopList.length; i++) {
         shopData.push(res.data.shopList[i]);
       }
      
       var businessList=[];
     
       for(var i=0;i<res.data.business.length;i++){
         businessList.push(res.data.business[i]);
       }
    that.setData({
      businessList: businessList
    })
   

 
       that.setData({
         shopLists: shopData,
       })
     }
     
    })
    this.setData({
      firstPerson: e.target.dataset.me,
      selectPerson: true,
      selectArea: false,
      zhezhao2:true
    })
  },
 
  
  clickPerson1: function () {
    var selectPerson1 = this.data.selectPerson1;
    if (selectPerson1 == true) {
      this.setData({
        selectArea1: true,
        selectPerson1: false,
      })
    } else {
      this.setData({
        selectArea1: false,
        selectPerson1: true,
      })
    }
  },
  //点击石材城切换
  mySelect1: function (e) {
    this.loadList()
    console.log(e)
    var p = 1;
    var that = this;
    wx.request({
      url: "https://www.chinascw.net/xcx/shop/shopList",
      data: {
         city_id: this.options.id,
         cate_id: 72,
         area_id: e.currentTarget.dataset.areaid,
         business_id: e.currentTarget.dataset.bussinesid,
      },
      header: {
         'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
     
          if (res.data.shopList == null) {
            wx.showToast({ title: "亲，没有数据了", duration: 5000 });
            that.setData({
              hidden: true
            })
            return false;
          }
     
        var shopData = [];
        for (var i = 0; i < res.data.shopList.length; i++) {
          shopData.push(res.data.shopList[i]);
        }


   
        that.setData({
          shopLists: shopData,
        })
      }
    })
    this.setData({
      stoneCity: e.target.dataset.me,
      selectPerson1: true,
      selectArea1: false,
     
    })
  },
  
})
