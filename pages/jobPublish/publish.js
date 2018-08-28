// pages/jobPublish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      province:'',
      city:'',
      proSelect:"请选择省份",
      citySelect:'请选择市区',
      jobSelect:"请选择",
      minSelect:"请选择",
      maxSelect:"请选择",
      pro_show:true,
      city_show:true,
      job_show:true,
      min_show:true,
      max_show:true,
      cityId:'',
      areaId:'',
      job_index: "",
      min: "",
      max: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        uid:options.uid
      })
      var that=this;
      wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: 'https://www.chinascw.net/xcx/jobs/resumeAdd',
        method:"GET",
        success:function(res){
          console.log(res.data);
          that.setData({
              province:res.data.citys,
              jobList:res.data.gangw,
              minList:res.data.money1,
              maxList:res.data.money2
          })
          wx.hideLoading();
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
  selPro:function(e){
        // console.log(e.target.dataset.index);
        var that=this;
        var index = e.target.dataset.index
        this.setData({
          proSelect:e.target.dataset.text,
          cityId:index,
          pro_show: true
        });
        wx.request({
          url: 'https://www.chinascw.net/xcx/prof/areas',
          methods:"GET",
          data:{
            cityId:index
          },
          success:function(res){
              console.log(res.data);
              if(res.data.areas==null){
                res.data.areas=[{area_id:0,area_name:'未开放'}]
              }
              that.setData({
                city:res.data.areas
              })
          }
        })
  },
  selCity:function(e){
    var tar = e.target.dataset;
    this.setData({
      citySelect:tar.text,
      areaId:tar.index,
      city_show:true
    })
  },
  pro_show:function(){
    this.setData({
      pro_show:!this.data.pro_show
    })
  },
  down:function(){
    this.setData({
      job_show:!this.data.job_show
    })
  },
  min_down:function(){
    this.setData({
      min_show:!this.data.min_show
    })
  },
  max_down:function(){
    this.setData({
      max_show: !this.data.max_show
    })
  },
  select: function (e) {
    console.log(e.target.dataset);
    var sel = e.target.dataset;
    this.setData({
      jobSelect: sel.content,
      job_index: sel.index
    })
  },
  min_select: function (e) {
    this.setData({
      minSelect: e.target.dataset.content,
      min: e.target.dataset.index
    })
  },
  max_select: function (e) {
    this.setData({
      maxSelect: e.target.dataset.max,
      max: e.target.dataset.index
    })
  },
  city_show: function () {
    if(this.data.city==""){
      wx.showToast({
        image: "/images/remind.png",
        title: '请先选择市区',
        duration: 2000
      })
    }else{
      this.setData({
        city_show: !this.data.city_show
      })
    }
  },
  formSubmit:function(e){
    var agt = e.detail.value;
    var tar=this.data;
    console.log(tar);
    console.log(agt);
      for(let i in tar){
        if(tar[i]==""){
          wx.showToast({
            title: '信息不完善',
            image:'/images/remind.png'
          })
          return;
        }
    }
    for (let i in agt) {
      if (agt[i] == "") {
        wx.showToast({
          title: '信息不完善',
          image: '/images/remind.png'
        })
        return;
      }
    }
  // console.log("通过");
  wx.request({
    url: 'https://www.chinascw.net/xcx/jobs/resumeAdd',
    method:'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data:{
        uid:tar.uid,
        name:agt.name,
        birthday:agt.age,
        phone:agt.phone,
        area_id:tar.areaId,
        city_id:tar.cityId,
        profession:tar.job_index,
        money1:tar.min,
        money2:tar.max
    },
    success:function(res){
      console.log()
      wx.showToast({
        title: res.data.message,
        duration: 1500
      });
      setTimeout(function () {
        if (res.data.status == 200) {
          wx.navigateBack({
            delta: 1
          })
        }
      }, 1500)
    }
  })
  }
})