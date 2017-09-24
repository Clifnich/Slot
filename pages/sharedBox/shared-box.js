

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
      colorStatus: [0,1,0],
      numOfMembers: 1,
      hexadecimal: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],
      colorLevel: ['#ffffff']
  },

  onLoad: function(option) {
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
    //console.log('setting time array to [' + newTimeArray.join('') + '].');
    this.setData({
      timeArray: newTimeArray,
      numOfRectInRow: count,
      numOfRectInCol: option.endTime - option.startTime + 1,
      weekdayArray: newWeekdayArray,
      numOfMembers: option.numOfMembers
    });
    // set the colorStatus attribute, mostly fill 0 to the empty places
    var numOfBlocks = this.data.numOfRectInCol * this.data.numOfRectInRow;
    var colorStatusArray = [];
    for (var i = 0; i < numOfBlocks; i++) {
      if (i < option.colorStatus.length)
        colorStatusArray.push(Number(option.colorStatus[i]));
      else
        colorStatusArray.push(0);
    }
    this.setData({
      colorStatus: colorStatusArray
    });
    // console.log('After setting, color status is now: [' + this.data.colorStatus
    //    + '].');

    // set colorLevel
    var newColorLevel = this.data.colorLevel;
    for (var i = 0; i < this.data.numOfMembers; i++) {
      // TODO push new colors to the end of colorLevel array
      var colorNumber = 512 / (Number(this.data.numOfMembers) + 1) * (i + 1);
      var result = '#00ff00';
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
      newColorLevel.push(result);
    }
    console.log('set color level to: ' + newColorLevel.join(' '));
    this.setData({
      colorLevel: newColorLevel
    })
  },

  // when the elements are ready, draw rectangles on the canvas
  onReady: function(e) {
    var numOfRectInRow = this.data.numOfRectInRow, numOfRectInColumn = this.data.numOfRectInCol;
    console.log('numOfRectInRow is ' + numOfRectInRow);
    console.log('numOfRectInColumn is ' + numOfRectInColumn);
    var recWidth = this.data.canvasWidth / numOfRectInRow, 
      recHeight = this.data.canvasHeight / numOfRectInColumn;
    this.setData({
      recWidth: recWidth,
      recHeight: recHeight,
    });
    const context = wx.createCanvasContext('1');
    var k = 0, colorStatus = this.data.colorStatus;
    for (var i = 0; i < numOfRectInRow; i++) {
      for (var j = 0; j < numOfRectInColumn; j++) {
        context.setFillStyle('white');
        context.rect(recWidth * i, recHeight * j, recWidth, recHeight);
        context.stroke();
        if (colorStatus.length > k && colorStatus[k] === 1) {
          context.setFillStyle(this.getRectColor(i * this.data.numOfRectInCol + j));
          context.fillRect(recWidth * i, recHeight * j, recWidth, recHeight);
        }
        k++;
      }
    }
    context.draw();
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
  // color level goes up by one notch
  getForwardColor: function(index) {
    // var colorNumber = 512 / (Number(this.data.numOfMembers) + 1) * (Number(this.data.colorStatus[index]) + 1);
    // return this.getColorForNumber(colorNumber);
    return this.data.colorLevel[Number(this.data.colorStatus[index]) + 1];
  },
  // color level goes down by one notch
  getBackwardColor: function(index) {
    if (Number(this.data.colorStatus[index]) === 0) {
      return 'white';
    }
    // var colorNumber = 512 / ((Number(this.data.numOfMembers) + 1) * Number(this.data.colorStatus[index]) - 1);
    // return this.getColorForNumber(colorNumber);
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
    var colorStatus = this.data.colorStatus;
    if (newCanvasBlocks[arrayIndex] === 0) {
      context.setFillStyle(this.getForwardColor(arrayIndex));
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
  dummyMove: function(e) {
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