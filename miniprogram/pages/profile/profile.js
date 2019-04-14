const app = getApp();

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: { nickName: '请先登录' },
    logged: false,
    takeSession: false,
    requestResult: ''
  },
  onLoad: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              });
            }
          });
        }
      }
    });
    this.onGetOpenid();
  },

  getUserInfo: function(e) {
    wx.getUserInfo({
      success: res => {
        const userInfo = res.userInfo;
        this.setData({
          logged: true,
          avatarUrl: userInfo.avatarUrl,
          userInfo: userInfo
        });
      }
    });
  },

  onGetUserInfo: function(e) {
    console.info(`e.detail.userInfo ${JSON.stringify(e.detail.userInfo)}`);
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      });
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid);
        app.globalData.openid = res.result.openid;
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err);
      }
    });
  }
});
