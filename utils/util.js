function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function isCurrentUser(user_id) {
  return new Promise(function (resolve, reject) {
    wx.getStorage({
      key: 'user_id',
      success: function(res) {
        if (res.data == user_id) {
          resolve()
        }
        else {
          reject()
        }
      }
    })
  })
}

function isTimelineDirty() {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'timeline-dirty',
      success(res) {
        console.log(res)
        if (res.data) {
          resolve()
        } else {
          // reject()
        }
      },
      fail() {
        // reject()
      }
    })
  })
}

function setTimelineDirty(isDirty) {
  wx.setStorage({
    key: 'timeline-dirty',
    data: isDirty,
  })
}

module.exports = {
  formatTime: formatTime,
  isCurrentUser: isCurrentUser,
  isTimelineDirty: isTimelineDirty,
  setTimelineDirty: setTimelineDirty
}
