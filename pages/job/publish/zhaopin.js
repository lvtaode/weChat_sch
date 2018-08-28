// pages/job/publish/zhaopin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      jobList:[],
      job_show:true,
      jobSelect:'请选择',
      minSelect:"请选择",
      maxSelect:"请选择",
      minList:[],
      maxList:[],
      min_show:true,
      max_show:true,
      job_index:"",
      min:"",
      max:"",
      location:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      name:options.shop_name,
      city_id: options.cityId,
      area_id: options.areaId,
      shopId:options.shop_id
    })
    var that=this;
     wx.request({
       url: 'https://www.chinascw.net/xcx/jobs/shopzpadd',
       method:"GET",
       data:{
         city_id:options.cityId,
         area_id:options.areaId
       },
       success:function(res){
         console.log(res.data);
          that.setData({
            jobList:res.data.gangw,
            minList:res.data.money1,
            maxList:res.data.money2,
            location:res.data.city.name+res.data.area.area_name
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
  jobChange:function(e){
      this.setData({
        index:e.detail.value
      })
  },
  select:function(e){
    console.log(e.target.dataset);
    var sel = e.target.dataset;
    this.setData({
        jobSelect: sel.content,
        job_index:sel.index
    })
  },
  min_select:function(e){
      this.setData({
        minSelect:e.target.dataset.content,
        min:e.target.dataset.index
      })
  },
  max_select: function (e) {
    this.setData({
      maxSelect: e.target.dataset.max,
      max: e.target.dataset.index
    })
  },
  down:function(){
    var tar=!this.data.job_show;
    this.setData({
      job_show:tar
    })
  },
  min_down:function(){
    this.setData({
      min_show:!this.data.min_show
    })
  },
  max_down: function () {
    this.setData({
      max_show: !this.data.max_show
    })
  },
  formSubmit:function(e){
    var result=e.detail.value;
    var agt=this.data;
    if(result.addr=="" || result.contact=="" || result.phone=="" || agt.min=="" || agt.max=="" || agt.job_index==""){
        wx.showToast({
          image:"/images/remind.png",
          title: '信息不完善',
          duration:2000
        })
    }else{
      console.log(agt);
      console.log(result);
        wx.request({
          url: 'https://www.chinascw.net/xcx/jobs/shopzpadd',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data:{
            city_id: agt.city_id,
            area_id:agt.area_id,
            shop_id:agt.shopId,
            shop_name:agt.name,
            contact: result.contact,
            tel: result.phone,
            addr: result.addr,
            cate: agt.job_index,
            money1: agt.min,
            money2: agt.max
          },
          success(res){
              wx.showToast({
                title: res.data.message,
                duration:1500
              });
              setTimeout(function(){
                if (res.data.status == 200) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              },1500)
          }
        })
    }
  }
})