function getToken() {
  return new Promise(function (resolve, reject) {
    wx.getStorage({
      key: 'token',
      success: function(res) {
        resolve(res.data)
      },
    })
  })
}

function request(url, data, method = 'GET', loadingMsg = '加载中...') {
  return new Promise(function(resolve, reject) {
    getToken().then((token) => {
      wx.showLoading({
        title: loadingMsg,
      })
      wx.request({
        url: url,
        data: data,
        header: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        method: method,
        dataType: 'json',
        success (res) {
          resolve(res)
        },
        fail (res) {
          reject(res)
        },
        complete () {
          wx.hideLoading()
        },
      })
    })
  })
}

function uploadFile(url, name, filePath) {
  return new Promise(function(resolve, reject){
    getToken().then(function(token) {
        wx.showLoading({
          title: '图片上传中...'
        })
        wx.uploadFile({
          url: url,
          filePath: filePath,
          name: name,
          header: {
            'Authorization': 'Bearer ' + token
          },
          success(res) {
            const data = JSON.parse(res.data)
            resolve(data)
          },
          complete() {
            wx.hideLoading()
          }
        })
    })
  })
}

module.exports = {
  request: request,
  uploadFile: uploadFile
}