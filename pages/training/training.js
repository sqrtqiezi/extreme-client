Page({
  data: {
    types: ['游泳', '骑车', '跑步'],
    index: 2,
    endDate: null,
    startDate: null,
    date: null,
    distance: 0,
    time: '00:01:00',
    description: '',
    photos: []
  },
  onLoad() {
    const now = new Date()
    this.setData({
      endDate: now.toISOString().substring(0, 10),
      startDate: now.toISOString().substring(0, 8) + '01',
      date: now.toISOString().substring(0, 10),
    })
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindDistanceChange: function(e) {
    this.setData({
      distance: e.detail.value
    })
  },
  bindDescriptionChange: function(e) {
    this.setData({
      description: e.detail.value
    })
  },
  photoChoose(e) {
    const self = this

    wx.chooseImage({
      count: 1,
      success(res) {
        const tempFilePath = res.tempFilePaths[0]
        console.log(tempFilePath)

        // 取出 token
        wx.getStorage({
          key: 'token',
          success: function (res) {
            wx.showLoading({
              title: '图片上传中...'
            })

            // 提交图片
            wx.uploadFile({
              url: 'https://hfextreme.cn/api/upload_photos',
              filePath: tempFilePath,
              header: {
                'Authorization': 'Bearer ' + res.data
              },
              name: 'photo',
              success(res) {
                // MD 上传返回值不给解析 JSON
                const data = JSON.parse(res.data)

                const tmp = self.data.photos
                tmp.push(data.url)
                self.setData({
                  photos: tmp
                })
              },
              complete() {
                wx.hideLoading()
              }
            })
          }
        })
      }
    })
  },
  submit: function (e) {
    const self = this
    // 取出 token
    wx.getStorage({
      key: 'token',
      success: function (res) {
        const token = res.data

        wx.showLoading({
          title: '提交中...'
        })

        // 提交数据
        wx.request({
          url: 'https://hfextreme.cn/api/trainings',
          method: 'POST',
          header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          data: {
            type: self.data.index,
            trained_at: self.data.date,
            consumption_time: self.data.time,
            distance: self.data.distance,
            description: self.data.description,
            photos: self.data.photos
          },
          success: function(res) {
            if (res.statusCode === 201) {
              wx.navigateBack()
            }
            else {
              console.log(res.statusCode)
              wx.showToast({
                title: '服务异常，稍后重试',
                icon: 'loading',
                duration: 2000
              })
            }
          }
        })
      }
    })
  },
  cancel(e) {
    wx.navigateBack()
  }
})