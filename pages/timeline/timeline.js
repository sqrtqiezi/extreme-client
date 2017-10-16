// pages/timeline.js
const { request } = require('../../utils/network.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    trainings: [],
    last_page: 0,
    current_page: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.loadNew()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {
    this.loadNew()
  },

  isAllLoaded() {
    return this.data.last_page === this.data.current_page
      && this.data.last_page !== 0;
  },

  loadNew() {
    if (this.isAllLoaded()) {
      return
    }
    const page = this.data.current_page + 1
    request(`https://hfextreme.cn/api/timeline?page=${page}`)
      .then((res) => {
        let temp = this.data.trainings
        temp = temp.concat(res.data.data)

        this.setData({
          trainings: temp,
          current_page: res.data.meta.current_page,
          last_page: res.data.meta.last_page,
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