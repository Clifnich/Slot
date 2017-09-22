

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
      colorStatus: '010',
      numOfMembers: 1,
      hexadecimal: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
  },

  onLoad: function(option) {
    console.log('option is: ' + option.weekdayLine);
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
    console.log("Set windowWidth to be: " + this.data.windowWidth);
    console.log("Set windowHeight to be: " + this.data.windowHeight);
    
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
    console.log('setting time array to [' + newTimeArray.join('') + '].');
    this.setData({
      timeArray: newTimeArray,
      numOfRectInRow: count,
      numOfRectInCol: option.endTime - option.startTime + 1,
      weekdayArray: newWeekdayArray,
      colorStatus: option.colorStatus,
      numOfMembers: option.numOfMembers
    });

    // set the colorStatus attribute
    var numOfBlocks = this.data.numOfRectInCol * this.data.numOfRectInRow;
    if (option.colorStatus.length < numOfBlocks) {
      var colorStatusArray = [];
      for (var i = 0; i < numOfBlocks; i++) {
        if (i < option.colorStatus.length)
          colorStatusArray.push(option.colorStatus[i]);
        else
          colorStatusArray.push('0');
      }
    }
    this.setData({
      colorStatus: colorStatusArray.join('')
    })
  },

  // when the elements are ready, draw rectangles on the canvas
  onReady: function(e) {
    console.log('This is ready function!');
    var numOfRectInRow = this.data.numOfRectInRow, numOfRectInColumn = this.data.numOfRectInCol;
    var recWidth = this.data.canvasWidth / numOfRectInRow, 
      recHeight = this.data.canvasHeight / numOfRectInColumn;
    const context = wx.createCanvasContext('1');
    var k = 0, colorStatus = this.data.colorStatus;
    for (var i = 0; i < numOfRectInRow; i++) {
      for (var j = 0; j < numOfRectInColumn; j++) {
        context.setFillStyle('white');
        context.setStrokeStyle('black');
        context.rect(recWidth * i, recHeight * j, recWidth, recHeight);
        context.stroke();
        //if (colorStatus.length > k && colorStatus[k] === '1') {
        context.setFillStyle(this.getRectColor(i * this.data.numOfRectInCol + j));
        context.fill();
        //}
        context.draw(true);
        k++;
      }
    }
    //context.draw();
    this.setData({
      recWidth: recWidth,
      recHeight: recHeight,
    });
  },

  getRectColor: function(index) {
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

  getForwardColor: function(index) {
    var colorNumber = 512 / (Number(this.data.numOfMembers) + 1) * (Number(this.data.colorStatus[index]) + 1);
    return this.getColorForNumber(colorNumber);
  },

  getBackwardColor: function(index) {
    if (Number(this.data.colorStatus[index]) === 0) {
      return 'white';
    }
    var colorNumber = 512 / (Number(this.data.numOfMembers) + 1) * (Number(this.data.colorStatus[index]) - 1);
    return this.getColorForNumber(colorNumber);
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
    //var arrayIndex = row * this.data.numOfRectInRow + column;
    var arrayIndex = column * this.data.numOfRectInCol + row;
    var newCanvasBlocks = this.data.canvasBlocks;
    if (newCanvasBlocks[arrayIndex] === 0) {
      context.setFillStyle(this.getForwardColor(arrayIndex));
      newCanvasBlocks[arrayIndex] = 1;
      this.setData({
        startWhite: true
      })
      // TODO change color status
      //var colorStatus = this.data.colorStatus;
      //colorStatus[arrayIndex] = Number(colorStatus[arrayIndex]) + 1;
    } else {
      context.setFillStyle(this.getBackwardColor(arrayIndex));
      context.setStrokeStyle('black');
      newCanvasBlocks[arrayIndex] = 0;
      this.setData({
        startWhite: false
      })
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
  dummyMove: function(e) {
    var x = e.touches[0].x,
      y = e.touches[0].y;
    console.log('dummy move: ' + x + ', ' + y);
    var column = this.getCanvasColumnIndex(x);
    var row = this.getCanvasRowIndex(y);
    var recWidth = this.data.recWidth,
      recHeight = this.data.recHeight;
    var context = null;
    // judege if to draw green or white
    //var arrayIndex = row * this.data.numOfRectInRow + column;
    var arrayIndex = column * this.data.numOfRectInCol + row;
    var newCanvasBlocks = this.data.canvasBlocks;
    if (this.data.startWhite) {
      if (newCanvasBlocks[arrayIndex] === 1)
        return;
      context = wx.createCanvasContext('1');
      context.setFillStyle(this.getForwardColor(arrayIndex));
      newCanvasBlocks[arrayIndex] = 1;
    } else {
      if (newCanvasBlocks[arrayIndex] === 0)
        return;
      context = wx.createCanvasContext('1');
      context.setFillStyle(this.getBackwardColor(arrayIndex));
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

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: "Leader's Invitation",
      path: '/page/sharedBox/shared-box',
      success: function (res) {
        // 转发成功
        console.log('re-direct is successful');
      },
      fail: function (res) {
        // 转发失败
        console.log('re-direct fails');
      },
      weekdayLine: '1111100',
      startTime: 8,
      endTime: 20
    }
  }
})