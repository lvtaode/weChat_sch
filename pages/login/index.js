var util = require("../../utils/util.js");

Page({
  data: {
    loginBtnTxt: "登录",
    loginBtnBgBgColor: "#3283b0",
    btnLoading: false,
    disabled: false,
    inputUserName: '',
    inputPassword: '',
    csz: false,
    dlcg:true,
    shopNum:0,
    productNum:0,
    nickname:"",
    username:"",
    pwd:'',
    userId:"",
    mobile:"",
    shopId:"",
    trigger:false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var name = wx.getStorageSync('name');
    var password = wx.getStorageSync('pwd');
    var that=this;
    if(name&&password){

    wx.request({
      url: "https://www.chinascw.net/xcx/login/logins",
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        uname: name,
        pass: password
      },
      success: function (res) {
        wx.navigateBack({
          delta: 1
        });
         console.log(res)
        // var userName = res.data.data.account;
        // var passWord = res.data.data.password;
        // var mobile = res.data.data.mobile
        // var nicknameData = res.data.data.nickname;
        // var nickname = ""
        // var userIdData = res.data.data.user_id;
        // var userId = ""
        // var faceData = res.data.data.face;
        // var face = "";
        var tel = res.data.data.mobile;
        var reg = /^(\d{3})\d{4}(\d{4})$/;
        tel = tel == null ? "去绑定" : tel.replace(reg, "$1****$2");
        var shouce = res.data.shop;
        var shopId = res.data.shop == null ? "" : res.data.shop.shop_id;
        wx.setStorage({
          key: 'shopId',
          data: shopId,
        })
        shouce=shouce == null?true:false;
        that.setData({
          dlcg: false,
          csz: true,
          nickname: res.data.data.nickname,
          userId: res.data.data.user_id,
          face: res.data.data.face,
          username: res.data.data.account,
          mobile:tel,
          trigger:shouce,
          shopId:shopId
        })
      }
      })
    setTimeout(function(){
      wx.request({
        url: 'https://www.chinascw.net/xcx/user/favorites?user_id=' + that.data.userId,
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          var shopNum = res.data.shops;
          var productNum = res.data.goods;
          // console.log(shopNum);
          // console.log(productNum);
          if (shopNum) {
            shopNum = shopNum.length;
          } else {
            shopNum = 0;
          }
          if (productNum) {
            productNum = productNum.length;
          } else {
            productNum = 0;
          }
          that.setData({
            shopNum: shopNum,
            productNum: productNum
          })
        }
      });
    },500)
    }
  },
  onReady: function () {
    // 页面渲染完成
    // var token = wx.getStorageSync('token');
    
  },
  onShow: function () {
    // 页面显示
    var user_id=this.data.userId
    var that=this;
    if (user_id){
      // that.checkUserInfo(param);
    //   wx.setStorage({
    //     key: 'uid',
    //     data: that.data.userId
    //   });
      wx.request({
        url: 'https://www.chinascw.net/xcx/login/logins',
        data:{
          user_id:user_id
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success:function(res){
              that.setData({
                nickname: res.data.data.nickname,
                face: res.data.data.face
              })
        }
      })
    }
    if(this.data.csz){
      wx.request({
        url: 'https://www.chinascw.net/xcx/user/favorites?user_id=' + that.data.userId,
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
        var   shopNum = res.data.shops;
         var  productNum = res.data.goods;
        //  console.log(shopNum);
        //  console.log(productNum);
          if (shopNum) {
            shopNum = shopNum.length;
          } else {
            shopNum = 0;
          }
          if (productNum) {
            productNum = productNum.length;
          } else {
            productNum = 0;
          }
          that.setData({
            shopNum: shopNum,
            productNum: productNum
          })
        }
      });
    }
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  formSubmit: function (e) {
    var param = e.detail.value;
    // console.log(param);
    // console.log(param.password);
    this.mysubmit(param);
  },
  mysubmit: function (param) {
    var flag = this.checkUserName(param) && this.checkPassword(param)
    if (flag) {
      this.setLoginData1();
      this.checkUserInfo(param);
    }
  },
  setLoginData1: function () {
    this.setData({
      loginBtnTxt: "登录中",
      disabled: !this.data.disabled,
      btnLoading: !this.data.btnLoading
    });
  },
  setLoginData2: function () {
    this.setData({
      loginBtnTxt: "登录",
      disabled: !this.data.disabled,
      btnLoading: !this.data.btnLoading
    });
  },
 
  checkUserName: function (param) {
    var email = util.regexConfig().email;
    // console.log(email)
    var phone = util.regexConfig().phone;
    var inputUserName = param.username.trim();
    // console.log(inputUserName)
    if (email.test(inputUserName)!== "" || phone.test(inputUserName)) {
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确的邮箱或者手机号码'
      });
      return false;
    }
  },
   
  checkPassword: function (param) {
    var userName = param.username.trim();
    var password = param.password.trim();
 
    if (password.length <= 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入密码'
      });
      return false;
    } else {
      return true;
    }
  },
  checkUserInfo:function (param) {
    var username = param.username.trim();
    var password = param.password.trim();
      this.setData({
        pwd:password
      })
    var that = this;
    wx.request({
      url: "https://www.chinascw.net/xcx/login/logins",
      method:"POST",
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        uname: username,
        pass: password
      },
      success:function(res){
        //  console.log(res)
        console.log(res.data)
        // console.log(res.data.data.account)
        var shopId = res.data.shop==null?"":res.data.shop.shop_id;
        console.log(shopId);
        var userName=res.data.data.account;
        var passWord=res.data.data.password;
        var mobile=res.data.data.mobile
        var nicknameData = res.data.data.nickname;
        var nickname=""
        var userIdData = res.data.data.user_id;
        var userId=""
        var faceData = res.data.data.face;
        var face="";
        var tel=res.data.data.mobile;
        var reg = /^(\d{3})\d{4}(\d{4})$/;
        tel = tel == null ? "去绑定":tel.replace(reg, "$1****$2");
        var shouce=res.data.shop;
        shouce=shouce == null ? true : false;
        wx.setStorage({
          key: 'name',
          data: res.data.data.account,
        })
        // console.log(that.data)
        wx.setStorage({
          key: 'pwd',
          data: that.data.pwd,
        })
        console.log(res.data.data.user_id);
        wx.setStorageSync('uid', res.data.data.user_id);
      // console.log(nicknameData)
       
        //  console.log(passWord)
      //   console.log(userName)
      //   console.log(mobile)
        if ((username == userName || username == mobile) ) {
          setTimeout(function () {
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 1500
            });
            that.setData({
              dlcg: false,
              csz: true,
              nickname:nicknameData,
              userId:userIdData,
              face:faceData,
              username:username,
              mobile:tel,
              trigger:shouce,
              shopId:shopId
            })
            // console.log("helloworld");
            // console.log(that.data.userId);
            that.setLoginData2();
           // that.redirectTo(param);
            
            wx.request({
              url: 'https://www.chinascw.net/xcx/user/favorites?user_id='+that.data.userId,
              data: {},
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                var shopNum = res.data.shops;
                var productNum = res.data.goods;
                if(shopNum){
                  shopNum=shopNum.length;
                }else{
                  shopNum=0;
                }
                if (productNum) {
                  productNum = productNum.length;
                } else {
                  productNum = 0;
                }
                that.setData({
                  shopNum: shopNum,
                  productNum: productNum
                })                                   
              }
            });
          }, 2000);
        } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '用户名或密码有误，请重新输入'
          });
          that.setLoginData2();
        }
      }
    }) 
    
  },
  relogin: function () {
    var that = this;
    wx.clearStorage({
      success: function (res) {
        that.setData({
          storageContent: ''
        });
        console.log(res);
    }
    });
    // wx.setStorage({
    //   key: 'name',
    //   data: "",
    // });
    // wx.setStorage({
    //   key: 'shopId',
    //   data: "",
    // });
    // wx.setStorage({
    //   key: 'uid',
    //   data: "",
    // });
    // wx.setStorage({
    //   key: 'pwd',
    //   data: "",
    // });
    this.setData({
      dlcg: true,
      csz:false
    });
    wx.showToast({
      title: '已退出',
      icon: 'success',
      duration: 1500
    });
  },
  bindTel:function(){
      if(this.data.mobile=="去绑定"){
        var uid=this.data.userId;
        console.log(uid);
        wx.navigateTo({
          url: "../shezhi/iphone?userId=" + uid,
        }) 
      }else{
        wx.showToast({
          title: '已绑定',
        })
      }
  },
  call:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel, //此号码并非真实电话号码，仅用于测试 
      success: function (res) {
        console.log("拨打电话成功！");
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  }

  // redirectTo: function (param) {
  //   //需要将param转换为字符串
  //   console.log(param)
  //   param = JSON.stringify(param);
  //   console.log(param)
  //   wx.redirectTo({
  //     url: '../main/index?param=' + param//参数只能是字符串形式，不能为json对象
  //   })
  // }
      
})