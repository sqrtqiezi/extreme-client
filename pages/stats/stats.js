const { request } = require('../../utils/network.js')

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
    request(`https://hfextreme.cn/api/trainings/${id}`, {},'DELETE')
      .then((res) => {
        this.refresh()
      })
  },
  onLoad(option) {
    
  },
  onShow() {
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
    request('https://hfextreme.cn/api/trainings')
      .then((res) => {
        this.setData({
          trainings: res.data.data
        })
      })
  }
})