

Page( {
  data: {
    startWhite: true,
    windowWidth: 0,
    windowHeight: 0,
    canvasWidth: 0,
    canvasHeight: 0,
    recWidth: 0,
    recHeight: 0,
    // 0 means the block is white, 1 means it is green
    canvasBlocks: [0,0,0,0,0,0,0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0],
      timeArray: [],
      weekdayLine: '1110110',
      constWeekdayArray: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      weekdayArray: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      numOfRectInRow: 7,
      numOfRectinCol: 17,
      numOfMembers: 1,
      rectColor: 'green',
      hexadecimal: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],
      startTime: 7,
      endTime: 23,
      numOfInvitationToSend: 0,
      dialogId: '',
      colorLevel: [],
      // a boolean variable to determind whether to show the post button
      showPostButton: true,
      // a boolean variable to determind whether to show the refresh button
      showRefreshButton: false,
      // a boolean value to determind whether to show the delete button
      showDeleteButton: true
  },

  onLoad: function(option) {
    // check if it is a final version 
    if (option.final) {
      this.setData({ 
        showPostButton: false,
        showRefreshButton: true
      });
    }
    var windowWidth, windowHeight;
    wx.getSystemInfo({
      success: function (res) {
        windowWidth = res.windowWidth;
        windowHeight = res.windowHeight;
      }
    });
    this.setData({
      windowWidth: windowWidth,
      windowHeight: windowHeight,
      canvasWidth: windowWidth * 0.8,
      canvasHeight: (windowHeight * 0.8)
    });
    
    if (option.startTime && option.endTime && option.weekdayLine) {
      this.setData({
        startTime: option.startTime,
        endTime: option.endTime,
        weekdayLine: option.weekdayLine
      })
    }
    // set timeArray
    var newTimeArray = this.data.timeArray;
    for (var i = Number(option.startTime); i <= Number(option.endTime); i++) {
      newTimeArray.push(i);
    }

    // set weekdayArray
    var newWeekdayArray = [];
    // set numOfRectInRow
    var count = 0, line = option.weekdayLine;
    for (var i = 0, len = line.length; i < len; i++) {
      if (line[i] === '1') {
        count++;
        newWeekdayArray.push(this.data.constWeekdayArray[i]);
      }
    }
    this.setData({
      timeArray: newTimeArray,
      numOfRectInRow: count,
      numOfRectInCol: option.endTime - option.startTime + 1,
      weekdayArray: newWeekdayArray,
      numOfMembers: option.numOfMembers,
      numOfInvitationToSend: Number(option.numOfMembers) - 1
    });

    // compute the colorLevel
    var newColorLevel = ['#ffffff'];
    for (var i = 0; i < this.data.numOfMembers; i++) {
      var colorNumber = 512 / (Number(this.data.numOfMembers) + 1) * (i + 1);
      var result = '#00ff00';
      if (colorNumber < 256) {
        colorNumber = 256 - colorNumber;
        var firstBit = this.data.hexadecimal[(colorNumber / 16).toFixed(0)];
        var secondBit = this.data.hexadecimal[(colorNumber % 16).toFixed(0)];
        result = '#' + firstBit + secondBit + 'ff' + firstBit + secondBit;
      } else if (colorNumber > 256) {
        colorNumber = 256 - (colorNumber - 256);
        var firstBit = this.data.hexadecimal[(colorNumber / 16).toFixed(0)];
        var secondBit = this.data.hexadecimal[(colorNumber % 16).toFixed(0)];
        result = '#00' + firstBit + secondBit + '00';
      }
      newColorLevel.push(result);
    }
    console.log('set color level to: ' + newColorLevel.join(' '));
    this.setData({
      colorLevel: newColorLevel
    });
    this.setData({
      rectColor: this.data.colorLevel[1]
    })
  },

  // when the elements are ready, draw rectangles on the canvas
  onReady: function(e) {
    var numOfRectInRow = this.data.numOfRectInRow, numOfRectInColumn = this.data.numOfRectInCol;
    var recWidth = this.data.canvasWidth / numOfRectInRow, 
      recHeight = this.data.canvasHeight / numOfRectInColumn;
    const context = wx.createCanvasContext('1');
    for (var i = 0; i < numOfRectInRow; i++) {
      for (var j = 0; j < numOfRectInColumn; j++) {
        context.rect(recWidth * i, recHeight * j, recWidth, recHeight);
        context.stroke();
      }
    }
    context.draw();
    this.setData({
      recWidth: recWidth,
      recHeight: recHeight,
    });
    this.refreshLeaderBoxPage();
  },

  dummyStart: function(e) {
    var x = e.touches[0].x,
      y = e.touches[0].y;
    console.log('dummy start: ' + x + ', ' + y);
    var column = this.getCanvasColumnIndex(x);
    var row = this.getCanvasRowIndex(y);
    var recWidth = this.data.recWidth,
      recHeight = this.data.recHeight;
    console.log('(' + row + ', ' + column + ')');
    const context = wx.createCanvasContext('1');
    // judege if the draw green or white
    var arrayIndex = column * this.data.numOfRectInCol + row;
    var newCanvasBlocks = this.data.canvasBlocks;
    if (newCanvasBlocks[arrayIndex] === 0) {
      context.setFillStyle(this.data.rectColor);
      newCanvasBlocks[arrayIndex] = 1;
      this.setData({
        startWhite: true
      })
    } else {
      context.setFillStyle('white');
      context.setStrokeStyle('black');
      newCanvasBlocks[arrayIndex]--;
      this.setData({
        startWhite: false
      })
    }

    // draw green rectangle here
    context.rect(recWidth * column,
      recHeight * row, recWidth, recHeight);
    context.fill();
    context.stroke();
    context.draw(true);
  },
  dummyMove: function(e) {
    var x = e.touches[0].x,
      y = e.touches[0].y;
    //console.log('dummy move: ' + x + ', ' + y);
    var column = this.getCanvasColumnIndex(x);
    var row = this.getCanvasRowIndex(y);
    var recWidth = this.data.recWidth,
      recHeight = this.data.recHeight;
    var context = null;
    // judege if to draw green or white
    var arrayIndex = column * this.data.numOfRectInCol + row;
    var newCanvasBlocks = this.data.canvasBlocks;
    if (this.data.startWhite) {
      if (newCanvasBlocks[arrayIndex] === 1)
        return;
      context = wx.createCanvasContext('1');
      context.setFillStyle(this.data.rectColor);
      newCanvasBlocks[arrayIndex] = 1;
    } else {
      if (newCanvasBlocks[arrayIndex] === 0)
        return;
      context = wx.createCanvasContext('1');
      context.setFillStyle('white');
      context.setStrokeStyle('black');
      newCanvasBlocks[arrayIndex] = 0;
    }
    // this.setData({
    //   canvasBlocks: newCanvasBlocks
    // })
    // draw green rectangle here
    context.rect(recWidth * column,
      recHeight * row, recWidth, recHeight);
    context.fill();
    context.stroke();
    context.draw(true);
  },
  dummyEnd: function(e) {
    console.log('end' + e);
  },
  // tap to draw a green rectangle
  dummyTap: function(e) {
    var x = e.touches[0].pageX,
      y = e.touches[0].pageY;
    console.log('dummy tap: ' + x + ', ' + y);
    var column = this.getCanvasColumnIndex(x);
    var row = this.getCanvasRowIndex(y);
    var recWidth = this.data.recWidth,
      recHeight = this.data.recHeight;
    console.log('(' + row + ', ' + column + ')');
    const context = wx.createCanvasContext('1');
    // draw green rectangle here
    context.setFillStyle(this.data.rectColor);
    context.fillRect(recWidth * column, 
      recHeight * row, recWidth, recHeight);
    context.draw(true);
  },

  getCanvasColumnIndex: function (x) {
    //console.log('getCanvasColumnIndex gets a paramter ' + x)
    return (Number(x) / (this.data.canvasWidth / this.data.numOfRectInRow) + 0.5).toFixed(0) - 1;
  },

  getCanvasRowIndex: function (y) {
    return (Number(y) / (this.data.canvasHeight / this.data.numOfRectInCol) + 0.5).toFixed(0) - 1;
  },

  /**
   * When redirecting, send the same message to every resipient
   */
  onShareAppMessage: function (res) {
    // user is not allowed to share this page if he hasn't posted
    if (this.data.showPostButton) {
      wx.showModal({
        title: '稍等',
        content: '请先发布:-)'
      });
      return;
    }
    var path = ['pages/member-box/member-box?dialogId='];
    var dialogId = getApp().globalData.dialogId;
    console.log('redirecting, dialogId is: ' + dialogId);
    path.push(dialogId);
    // path.push('&userId=member');
    // var memberIndex = Number(this.data.numOfMembers) - Number(this.data.numOfInvitationToSend) - 1;
    // path.push(memberIndex);
    // console.log("Member's index is: " + memberIndex);
    path = path.join('');
    return {
      title: "请画出你的空闲时间",
      path: path,
      success: function (res) {
        // 转发成功
        console.log('re-directing to [' + path + '].');
      },
      fail: function (res) {
        // 转发失败
        console.log('re-direct fails');
      }
    }
  },

  publishLeadersAvailability: function() {
    console.log("Publishing leader's availability...");
    // create colorStatus variable
    var colorStatus = [];
    for (var i = 0; i < Number(this.data.numOfRectInRow) * Number(this.data.numOfRectInCol); i++) {
      if (this.data.canvasBlocks[i] === 1) {
        colorStatus.push('1');
      } else {
        colorStatus.push('0');
      }
    }
    // send a request to the server to create a dialog
    wx.request({
      url: "https://www.minorlib.com/slot/createDialog",
      method: "POST",
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        weekdayLine: this.data.weekdayLine,
        startTime: this.data.startTime,
        endTime: this.data.endTime,
        numOfMembers: this.data.numOfMembers,
        leaderDrawStatus: colorStatus.join(''),
        leader: "leader"
      },
      success: function (res) {
        console.log('Your dialog id is: ' + res.data);
        var dialogId = res.data;
        getApp().globalData.dialogId = dialogId;
        wx.setStorage({
          key: 'dialogId',
          data: dialogId,
        });
        wx.showModal({
          title: '发布成功！'
        });
      }
    });

    // hide the post button and show the refresh button
    this.setData({
      showPostButton: false,
      showRefreshButton: true
    })
  },

  /**
   * onclick function for the refresh button
   */
  refreshLeaderBoxPage: function() {
    console.log('refreshing!');
    var url = [];
    url.push('https://www.minorlib.com/slot/dialog?dialogId=');
    url.push(getApp().globalData.dialogId);
    url.push('&userId=leader');
    var thisObj = this;
    wx.request({
      url: url.join(''),
      success: function (res) {
        console.log(res);
        thisObj.updatePage(res.data.drawStatus);
      }
    });
  },

  /**
   * re-draw the boxes based on the drawStatus from server
   */
  updatePage: function(drawStatus) {
    console.log('updating page for [' + drawStatus + '].');
    var numOfRectInRow = this.data.numOfRectInRow, numOfRectInColumn = this.data.numOfRectInCol;
    var recWidth = this.data.recWidth,
      recHeight = this.data.recHeight;
    
    var k = 0;
    for (var i = 0; i < numOfRectInRow; i++) {
      for (var j = 0; j < numOfRectInColumn; j++) {
        if (k >= drawStatus.length) {
          break;
        }
        var context = wx.createCanvasContext('1');
        context.rect(recWidth * i, recHeight * j, recWidth, recHeight);
        context.setFillStyle(this.data.colorLevel[Number(drawStatus[k])]);
        context.fill();
        context.stroke();
        context.draw(true);
        k++;
      }
    }
  },

  deleteButton: function(e) {
    console.log(e);
    wx.removeStorage({
      key: 'dialogId',
      success: function(res) {
        console.log('Successfully delete the dialogId, redirecting back to home page.');
      },
    });
    wx.removeStorage({
      key: 'claimId',
      success: function() {}
    });
    var newCanvasBlock = this.data.canvasBlocks;
    for (var i = 0; i < newCanvasBlock.length; i++) {
      newCanvasBlock[i] = 0;
    }
    // TODO delete a global variable dialogId
    getApp().globalData.dialogId = '';
    wx.navigateTo({
      url: '../../pages/index/index',
    })
  }
})