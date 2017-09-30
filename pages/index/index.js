//index.js
var util = require('../../utils/util.js')
Page({
  data: {
    rankings: [],
    period: 'month'
  },
  onShow() {
    this.refresh()
  },
  changePeriod(event) {
    this.setData({
      period: event.currentTarget.dataset.period
    })

    this.refresh()
  },
  getType() {
    if(this.data.period === 'month') return 2
    if(this.data.period === 'week') return 1
    //else Day
    return 0;
  },
  goStats(e) {
    console.log(e)
  },
  refresh() {
    const self = this

    wx.getStorage({
      key: 'token',
      success: function (res) {
        const token = res.data

        wx.showLoading({
          title: '加载中...',
        })

        wx.request({
          url: 'https://hfextreme.cn/api/rankings',
          method: 'GET',
          header: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          data: {
            'type': self.getType()
          },
          success(res) {
            self.setData({
              rankings: res.data.data
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
