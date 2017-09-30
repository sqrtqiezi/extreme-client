var util = require('../../utils/util.js')
Page({
  data: {
    userName: '',
    trainings: []
  },
  addTraining() {
    wx.navigateTo({
      url: '/pages/training/training'
    })
  },
  deleteTraining(e) {
    const id = e.currentTarget.dataset.id
    const self = this

    wx.showLoading({
      title: '正在删除...',
    })

    // 读取 token
    wx.getStorage({
      key: 'token',
      success(res) {
        const token = res.data

        // 删除记录
        wx.request({
          url: 'https://hfextreme.cn/api/trainings/' + id ,
          header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          method: 'DELETE',
          success(res) {
            self.refresh()
          },
          complete() {
            wx.hideLoading()
          }
        })
      }
    })
  },
  onLoad(option) {
    console.log(option.query)
  },
  onShow() {
    self = this
    wx.showLoading({
      title: '加载中...',
    })
    this.refresh()
  },
  previewPhotos(e) {
    const photos = e.currentTarget.dataset.photos
    const photo = e.currentTarget.dataset.photo
    wx.previewImage({
      current: photo,
      urls: photos
    })
  },

  refresh() {
    // 读取 token
    wx.getStorage({
      key: 'token',
      success: function (res) {
        const token = res.data

        // 获取用户信息
        wx.request({
          url: 'https://hfextreme.cn/api/trainings',
          header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          success: (res) => {
            self.setData({
              trainings: res.data.data
            })
          },
          complete() {
            wx.hideLoading()
          }
        })
      },
    })
  }
})