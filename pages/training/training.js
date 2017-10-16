const { request, uploadFile } = require('../../utils/network.js')

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
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindDistanceChange(e) {
    this.setData({
      distance: e.detail.value
    })
  },
  bindDescriptionChange(e) {
    this.setData({
      description: e.detail.value
    })
  },
  photoChoose(e) {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]
        uploadFile('https://hfextreme.cn/api/upload_photos', 'photo', tempFilePath)
          .then((data) => {
            const tmp = this.data.photos
            tmp.push(data.url)
            this.setData({
              photos: tmp
            })
          })
      }
    })
  },
  submit: function (e) {
    request('https://hfextreme.cn/api/trainings', {
      type: this.data.index,
      trained_at: this.data.date,
      consumption_time: this.data.time,
      distance: this.data.distance,
      description: this.data.description,
      photos: this.data.photos
    }, 'POST', '保存中...')
      .then((res) => {
        console.log(res)
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000,
          mask: true
        })
        wx.navigateBack()
      })
      .catch((err) => {
        wx.showToast({
          title: '服务异常，稍后重试',
          icon: 'loading',
          duration: 2000
        })
      })
  },
  cancel(e) {
    wx.navigateBack()
  }
})