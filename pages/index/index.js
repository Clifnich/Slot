// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekdays: [
      {name: 'Sunday', value: '0'},
      {name: 'Monday', value: '1'},
      {name: 'Tuesday', value: '2'},
      {name: 'Wednesday', value: '3'},
      {name: 'Thursday', value: '4'},
      {name: 'Friday', value: '5'},
      {name: 'Saturday', value: '6'}
    ],
    weekdayArray: [0,0,0,0,0,0,0],
    startTime: 7,
    endTime: 23,
    numOfMembers: '# of team members'
  },

  /**
   * Handle # of team members input 
   */
  inputMembers: function(e) {
    console.log('input number: [' + e.detail.value + '].');
    this.setData({
      numOfMembers: Number(e.detail.value)
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'dialogId',
      success: function(res) {
        var dialogId = res.data;
        getApp().globalData.dialogId = dialogId;
        wx.request({
          url: 'https://www.minorlib.com/slot/dialog?dialogId=' + dialogId + '&userId=leader',
          success: function(res) {
            console.log(res);
            var pageUrl = ['../leader-box/leader-box?startTime='];
            pageUrl.push(res.data.startTime);
            pageUrl.push('&endTime=');
            pageUrl.push(res.data.endTime);
            pageUrl.push('&weekdayLine=');
            pageUrl.push(res.data.weekdayLine);
            pageUrl.push('&numOfMembers=');
            pageUrl.push(res.data.numOfMembers);
            pageUrl.push('&final=true');
            wx.navigateTo({
              url: pageUrl.join(''),
            })
          }
        })
        // wx.navigateTo({
        //   url: '../leader-box/leader-box?hasSession=true&dialogId=' + dialogId,
        // })
      },
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

  buttonAction: function() {
    var newUrl = [];
    newUrl.push('../leader-box/leader-box?startTime=');
    newUrl.push(this.data.startTime);
    newUrl.push('&endTime=');
    newUrl.push(this.data.endTime);
    newUrl.push('&weekdayLine=');
    newUrl.push(this.data.weekdayArray.join(''));
    newUrl.push('&numOfMembers=');
    newUrl.push(this.data.numOfMembers);
    console.log('navigating to: [' + newUrl.join('') + '].');
    wx.navigateTo({
      url: newUrl.join('')
    });
  },

  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    var newWeekdayArray = [0,0,0,0,0,0,0];
    for (var i = 0; i < e.detail.value.length; i++) {
      newWeekdayArray[e.detail.value[i]] = 1;
    }
    this.setData({
      weekdayArray: newWeekdayArray
    })
  },

  bindTimeChange1: function (e) {
    var startTime = Number(e.detail.value.split(':')[0]);
    console.log('time1发生change事件，携带value值为：', startTime);
    this.setData( {
      startTime: startTime
    })
  },
  bindTimeChange2: function (e) {
    var endTime = Number(e.detail.value.split(':')[0]);
    console.log('time2发生change事件，携带value值为：', endTime);
    this.setData({
      endTime: endTime 
    })
  },
})