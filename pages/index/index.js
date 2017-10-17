//index.js
const { request } = require('../../utils/network.js')

Page({
  data: {
    rankings: [],
    period: 'month'
  },

  onLoad() {
    this.refresh()
  },

  onPullDownRefresh() {
    console.log('pull down refresh')
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
  refresh() {
    const self = this
    request('https://hfextreme.cn/api/rankings', {
      'type': self.getType()
    }).then(function(res) {
      self.setData({
        rankings: res.data.data
      })

      wx.stopPullDownRefresh()
    })
  }
})
