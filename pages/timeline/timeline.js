// pages/timeline.js
const { request } = require('../../utils/network.js')
const { isTimelineDirty, setTimelineDirty } = require('../../utils/util.js')

Page({
  data: {
    trainings: [],
    lastPage: 0,
    currentPage: 0,
    isAllLoaded: false
  },

  onLoad() {
    this.refresh()
  },

  onShow () {
    isTimelineDirty().then(() => this.refresh())
  },

  onReachBottom () {
    this.loadNew()
  },

  addTraining() {
    wx.navigateTo({
      url: '/pages/training/training'
    })
  },

  refresh() {
    this.setData({
      currentPage: 0,
      isAllLoaded: false,
      trainings: []
    })
    this.loadNew()

    setTimelineDirty(false)
  },

  loadNew() {
    if (this.data.isAllLoaded) {
      return
    }
    request(`https://hfextreme.cn/api/timeline?page=${this.data.currentPage + 1}`)
      .then((res) => {
        let temp = this.data.trainings
        temp = temp.concat(res.data.data)

        this.setData({
          trainings: temp,
          currentPage: res.data.meta.current_page,
          lastPage: res.data.meta.last_page,
          isAllLoaded: res.data.last_page === res.data.current_page
        })
      })
  },

  previewPhotos(e) {
    const photos = e.currentTarget.dataset.photos
    const photo = e.currentTarget.dataset.photo
    wx.previewImage({
      current: photo,
      urls: photos
    })
  }
})