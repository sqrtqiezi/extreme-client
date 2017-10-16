//index.js
const util = require('../../utils/util.js')
const { request } = require('../../utils/network.js')

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
    request('https://hfextreme.cn/api/rankings', {
      'type': self.getType()
    }).then(function(res) {
      self.setData({
        rankings: res.data.data
      })
    })
  }
})
