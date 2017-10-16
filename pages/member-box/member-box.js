

Page({
  data: {
    startWhite: true,
    windowWidth: 0,
    windowHeight: 0,
    canvasWidth: 0,
    canvasHeight: 0,
    recWidth: 0,
    recHeight: 0,
    // 0 means the block is white, 1 means it is green
    canvasBlocks: [0, 0, 0, 0, 0, 0, 0,
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
    colorStatus: [0, 1, 0],
    colorStatusFromServer: '',
    numOfMembers: 1,
    hexadecimal: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],
    colorLevel: ['#ffffff'],
    dialogId: '',
    memberIndex: '',
    showSubmitButton: true
  },

  onLoad: function (option) {
    // first check if this user has claimed or not
    // then try to claim a participation, if get OK, go on
    var thisObj = this;
    wx.getStorage({
      key: 'claimId',
      success: function(res) {
        thisObj.basicConfigure(option.dialogId);
      },
      fail: function() {
        console.log('there is no storage of claimId');
        thisObj.goClaiming(option.dialogId);
      }
    })
   
    
  },

  /**
   * This function generates a random number and call the claim API
   */
  goClaiming: function(dialogId) {
    var claimId = Math.round(Math.random() * 10000)
    var url = ['https://www.minorlib.com/slot/claim?dialogId=',
      dialogId, '&claimId=', claimId];
    url = url.join('');
    console.log('claim url is: ' + url);
    var thisObj = this;
    wx.request({
      url: url,
      method: 'POST',
      success: function (res) {
        if (res.data === 'OK') {
          wx.setStorage({
            key: 'claimId',
            data: claimId,
          })
          thisObj.basicConfigure(dialogId);
        } else {
          console.log(res);
          wx.showModal({
            title: '人数已满',
            content: '当前对话人数已满，将带回主页',
            success: function () {
              wx.navigateTo({
                url: '../../pages/index/index'
              });
            }
          });
        }
      }
    })
  },

  /**
   * This function configures the dialog based on the dialogId
   */
  basicConfigure: function(dialogId) {
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

    // request from the server
    var thisObj = this;
    var url = [];
    url.push('https://www.minorlib.com/slot/dialog?dialogId=');
    url.push(dialogId);
    getApp().globalData.dialogId = dialogId;
    // works fine when userId is missed
    // url.push('&userId=member');
    // url.push(option.memberIndex);
    wx.request({
      url: url.join(''),
      success: function (res) {
        console.log(res);
        thisObj.setData({
          startTime: Number(res.data.startTime),
          endTime: Number(res.data.endTime),
          weekdayLine: res.data.weekdayLine,
          numOfRectInCol: Number(res.data.endTime) - Number(res.data.startTime) + 1,
          numOfMembers: Number(res.data.numOfMembers),
          colorStatusFromServer: res.data.drawStatus,
          dialogId: dialogId,
        });
        thisObj.configureBasedOnServerInformation();
      }
    });
  },

  /**
   * This function configures a great deal of attributes.
   * when the elements are ready, draw rectangles on the canvas
   */
  configureBasedOnServerInformation: function (e) {
    // set timeArray
    var newTimeArray = [];
    for (var i = Number(this.data.startTime); i <= Number(this.data.endTime); i++) {
      newTimeArray.push(i);
    }
    // set weekdayArray and numOfRectInRow
    var newWeekdayArray = [];
    var count = 0, line = this.data.weekdayLine;
    for (var i = 0, len = line.length; i < len; i++) {
      if (line[i] === '1') {
        count++;
        newWeekdayArray.push(this.data.constWeekdayArray[i]);
      }
    }
    this.setData({
      timeArray: newTimeArray,
      numOfRectInRow: count,
      weekdayArray: newWeekdayArray,
    });
    // set the colorStatus attribute, mostly fill 0 to the empty places
    var numOfBlocks = this.data.numOfRectInCol * this.data.numOfRectInRow;
    var colorStatusArray = [];
    for (var i = 0; i < numOfBlocks; i++) {
      if (i < this.data.colorStatusFromServer.length)
        colorStatusArray.push(Number(this.data.colorStatusFromServer[i]));
      else
        colorStatusArray.push(0);
    }
    this.setData({
      colorStatus: colorStatusArray
    });

    // set colorLevel
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
    var numOfRectInRow = this.data.numOfRectInRow, numOfRectInColumn = this.data.numOfRectInCol;
    console.log('numOfRectInRow is ' + numOfRectInRow);
    console.log('numOfRectInColumn is ' + numOfRectInColumn);
    var recWidth = this.data.canvasWidth / numOfRectInRow,
      recHeight = this.data.canvasHeight / numOfRectInColumn;
    this.setData({
      recWidth: recWidth,
      recHeight: recHeight,
    });

    // draw the empty rectangles
    const context = wx.createCanvasContext('1');
    var k = 0, colorStatus = this.data.colorStatus;
    for (var i = 0; i < numOfRectInRow; i++) {
      for (var j = 0; j < numOfRectInColumn; j++) {
        context.setFillStyle('white');
        context.rect(recWidth * i, recHeight * j, recWidth, recHeight);
        context.stroke();
        if (colorStatus.length > k) {
          //context.setFillStyle(this.getRectColor(i * this.data.numOfRectInCol + j));
          context.setFillStyle(this.data.colorLevel[colorStatus[k]]);
          context.fillRect(recWidth * i, recHeight * j, recWidth, recHeight);
        }
        k++;
      }
    }
    context.draw();
  },

  getRectColor: function (index) {
    var colorNumber = 512 / (Number(this.data.numOfMembers) + 1) * Number(this.data.colorStatus[index]);
    if (colorNumber === 0)
      return '#ffffff';
    // console.log('index is: [' + index + '].');
    // console.log('numOfMembers is: [' + Number(this.data.colorStatus[index]) + '].');
    console.log('colorNumber is: [' + colorNumber + '].');
    var result = '#00ff00';
    if (colorNumber === 256)
      return result;
    if (colorNumber < 256) {
      colorNumber = 256 - colorNumber;
      var firstBit = this.data.hexadecimal[(colorNumber / 16).toFixed(0)];
      var secondBit = this.data.hexadecimal[(colorNumber % 16).toFixed(0)];
      //console.log('first: ' + firstBit + ', second: ' + secondBit);
      result = '#' + firstBit + secondBit + 'ff' + firstBit + secondBit;
    } else if (colorNumber > 256) {
      colorNumber = 256 - (colorNumber - 256);
      var firstBit = this.data.hexadecimal[(colorNumber / 16).toFixed(0)];
      var secondBit = this.data.hexadecimal[(colorNumber % 16).toFixed(0)];
      //console.log('first: ' + firstBit + ', second: ' + secondBit);
      result = '#00' + firstBit + secondBit + '00';
    }

    return result;
  },
  // color level goes up by one notch
  getForwardColor: function (index) {
    return this.data.colorLevel[Number(this.data.colorStatus[index]) + 1];
  },
  // color level goes down by one notch
  getBackwardColor: function (index) {
    if (Number(this.data.colorStatus[index]) === 0) {
      return 'white';
    }
    return this.data.colorLevel[Number(this.data.colorStatus[index]) - 1];
  },

  getColorForNumber(colorNumber) {
    var result = '#00ff00';
    if (colorNumber === 256)
      return result;
    if (colorNumber < 256) {
      colorNumber = 256 - colorNumber;
      var firstBit = this.data.hexadecimal[(colorNumber / 16).toFixed(0)];
      var secondBit = this.data.hexadecimal[(colorNumber % 16).toFixed(0)];
      //console.log('first: ' + firstBit + ', second: ' + secondBit);
      result = '#' + firstBit + secondBit + 'ff' + firstBit + secondBit;
    } else if (colorNumber > 256) {
      colorNumber = 256 - (colorNumber - 256);
      var firstBit = this.data.hexadecimal[(colorNumber / 16).toFixed(0)];
      var secondBit = this.data.hexadecimal[(colorNumber % 16).toFixed(0)];
      //console.log('first: ' + firstBit + ', second: ' + secondBit);
      result = '#00' + firstBit + secondBit + '00';
    }

    return result;
  },

  dummyStart: function (e) {
    var x = e.touches[0].x,
      y = e.touches[0].y;
    var column = this.getCanvasColumnIndex(x);
    var row = this.getCanvasRowIndex(y);
    var recWidth = this.data.recWidth,
      recHeight = this.data.recHeight;
    const context = wx.createCanvasContext('1');
    var arrayIndex = column * this.data.numOfRectInCol + row;
    var newCanvasBlocks = this.data.canvasBlocks;
    var colorStatus = this.data.colorStatus;
    if (newCanvasBlocks[arrayIndex] === 0) {
      var forwardColor = this.getForwardColor(arrayIndex);
      console.log('forward color for starting is: ' + forwardColor);
      context.setFillStyle(forwardColor);
      newCanvasBlocks[arrayIndex] = 1;
      this.setData({
        startWhite: true
      })
      // update colorStatus of this box
      colorStatus[arrayIndex] = Number(colorStatus[arrayIndex]) + 1;

    } else {
      console.log('getBackwardColor() returns ' + this.getBackwardColor(arrayIndex));
      context.setFillStyle(this.getBackwardColor(arrayIndex));
      context.setStrokeStyle('black');
      newCanvasBlocks[arrayIndex] = 0;
      this.setData({
        startWhite: false
      })
      colorStatus[arrayIndex] = Number(colorStatus[arrayIndex]) - 1;
    }
    // this.setData({
    //   colorStatus: colorStatus,
    //   canvasBlocks: newCanvasBlocks
    // })
    // draw green rectangle here
    context.rect(recWidth * column,
      recHeight * row, recWidth, recHeight);
    context.fill();
    context.stroke();
    context.draw(true);
  },
  dummyMove: function (e) {
    var x = e.touches[0].x,
      y = e.touches[0].y;
    var column = this.getCanvasColumnIndex(x);
    var row = this.getCanvasRowIndex(y);
    var recWidth = this.data.recWidth,
      recHeight = this.data.recHeight;
    var context = null;
    // judege if to draw green or white
    //var arrayIndex = row * this.data.numOfRectInRow + column;
    var arrayIndex = column * this.data.numOfRectInCol + row;
    var newCanvasBlocks = this.data.canvasBlocks;
    var colorStatus = this.data.colorStatus;
    if (this.data.startWhite) {
      if (newCanvasBlocks[arrayIndex] === 1)
        return;
      context = wx.createCanvasContext('1');
      context.setFillStyle(this.getForwardColor(arrayIndex));
      newCanvasBlocks[arrayIndex] = 1;
      colorStatus[arrayIndex] = Number(colorStatus[arrayIndex]) + 1;
    } else {
      if (newCanvasBlocks[arrayIndex] === 0)
        return;
      context = wx.createCanvasContext('1');
      console.log('getBackwardColor() returns ' + this.getBackwardColor(arrayIndex));
      context.setFillStyle(this.getBackwardColor(arrayIndex));
      context.setStrokeStyle('black');
      newCanvasBlocks[arrayIndex] = 0;
      colorStatus[arrayIndex] = Number(colorStatus[arrayIndex]) - 1;
    }
    // draw green rectangle here
    context.rect(recWidth * column,
      recHeight * row, recWidth, recHeight);
    context.fill();
    context.stroke();
    context.draw(true);
  },
  dummyEnd: function (e) {
    console.log('end' + e);
  },
  // tap to draw a green rectangle
  dummyTap: function (e) {
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
    context.setFillStyle('green');
    context.fillRect(recWidth * column,
      recHeight * row, recWidth, recHeight);
    context.draw(true);
  },
  // This function returns the column index of a given position x
  // Please -1 to get the actual array index
  // getColumnIndex: function (x) {
  //   return (x / (this.data.windowWidth / 4) + 0.5).toFixed(0);
  // },

  getCanvasColumnIndex: function (x) {
    //console.log('getCanvasColumnIndex gets a paramter ' + x)
    return (Number(x) / (this.data.canvasWidth / this.data.numOfRectInRow) + 0.5).toFixed(0) - 1;
  },

  getCanvasRowIndex: function (y) {
    return (Number(y) / (this.data.canvasHeight / this.data.numOfRectInCol) + 0.5).toFixed(0) - 1;
  },

  /**
   * A member of a dialog can't further share it.
   */
  onShareAppMessage: function (res) {
    wx.showModal({
      title: '抱歉，您不能转发',
      content: '转发权限只有leader才有哦'
    })
  },

  /**
   * Button action: publish a user's availability
   */
  buttonSubmit: function() {
    var drawStatus = [];
    for (var i = 0; i < Number(this.data.numOfRectInRow) * Number(this.data.numOfRectInCol); i++) {
      if (this.data.canvasBlocks[i] === 1) {
        drawStatus.push('1');
      } else {
        drawStatus.push('0');
      }
    }
    var url = [];
    url.push('https://www.minorlib.com/slot/dialog?dialogId=');
    url.push(this.data.dialogId);
    url.push('&userId=member');
    url.push(this.data.memberIndex);
    url.push('&drawStatus=');
    url.push(drawStatus.join(''));
    var thisObj = this;
    wx.request({
      url: url.join(''),
      method: "POST",
      success: function(res) {
        console.log(res);
        thisObj.setData({
          showSubmitButton: false
        });
        wx.showModal({
          title: '发布成功！',
          content: '',
        })
      }
    })
  },

  buttonRefresh: function() {
    var option = {dialogId: this.data.dialogId, memberIndex: this.data.memberIndex};
    this.onLoad(option);
    var newCanvasBlock = this.data.canvasBlocks;
    for (var i = 0; i < newCanvasBlock.length; i++) {
      newCanvasBlock[i] = 0;
    }
  }
})