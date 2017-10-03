

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
      dialogId: ''
  },

  onLoad: function(option) {
    console.log('Welcome to leader-box page!')
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
      rectColor: this.getRectColor(option.numOfMembers),
      numOfInvitationToSend: Number(option.numOfMembers) - 1
    });
    //console.log('need to send ' + this.data.numOfInvitationToSend + ' more invitations');
  },

  // compute the rectangle color
  getRectColor: function(numOfMembers) {
    var result = 'green';
    var color = (512 / (Number(numOfMembers) + 1)).toFixed(0);
    if (color <= 255) {
      // var firstTwoChars = color.toString(16);
      // result = '#' + firstTwoChars + 'ff' + firstTwoChars;
      color = 256 - color;
      var firstBit = this.data.hexadecimal[(color / 16).toFixed(0)];
      var secondBit = this.data.hexadecimal[(color % 16).toFixed(0)];
      //console.log('first: ' + firstBit + ', second: ' + secondBit);
      result = '#' + firstBit + secondBit + 'ff' + firstBit + secondBit;
    }
    return result;
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
        // context.setFillStyle('green');
        // context.fillRect(recWidth * i, recHeight * j, recWidth, recHeight);
      }
    }
    context.draw();
    this.setData({
      recWidth: recWidth,
      recHeight: recHeight,
    });
  },

  dummyStart: function(e) {
    // console.log('start' + e);
    // this.dummyTap(e);
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
      //console.log(newCanvasBlocks[arrayIndex] + ' less than numOfMembers ' + this.data.numOfMembers);
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

  onShareAppMessage: function (res) {
    var invitations = this.data.numOfInvitationToSend;
    if (invitations === 0) {
      console.log("You can't send any more invitations.");
      return;
    }
    invitations--;
    this.setData({
      numOfInvitationToSend: invitations
    })
    var path = '/page/member-box/member-box';
    console.log('redirecting, dialogId is: ' + getApp().globalData.dialogId);
    var memberIndex = Number(this.data.numOfMembers) - Number(this.data.numOfInvitationToSend) - 1;
    console.log("Member's index is: " + memberIndex);
    return {
      title: "Leader's Invitation",
      path: path,
      success: function (res) {
        // 转发成功
        console.log('re-directing to [' + path + '].');
      },
      fail: function (res) {
        // 转发失败
        console.log('re-direct fails');
      },
      dialogId: getApp().globalData.dialogId,
      memberIndex: memberIndex
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
        getApp().globalData.dialogId = res.data;
      }
    });
  }
})