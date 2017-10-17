const { request } = require('../../utils/network.js')
const { isCurrentUser } = require('../../utils/util.js')
Page({
  data: {
    userName: '',
    userId: 0,
    trainings: [],
    isCurrentUser: false
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
    this.setData({
      userId: option.id
    })

    isCurrentUser(option.id)
      .then(() => {
        this.setData({
          isCurrentUser: true,
          userName: '我'
        })
      })
      .catch(() => {
        this.setData({
          userName: option.name
        })
      })
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
    request(`https://hfextreme.cn/api/user/${this.data.userId}/trainings`)
      .then((res) => {
        this.setData({
          trainings: res.data.data
        })
      })
  }
})