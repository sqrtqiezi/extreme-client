// pages/timeline.js
const { request } = require('../../utils/network.js')
const { isTimelineDirty, setTimelineDirty } = require('../../utils/util.js')

Page({
  data: {
    trainings: [],
    lastPage: 0,
    currentPage: 0,
    isAllLoaded: false,
    commentValue: null,
    validator: {
      invalid: false,
      message: ''
    }
  },

  onLoad() {
    console.log('Page Timeline Loaded')
    this.loadNew(true)
  },

  onShow () {
    console.log('Page Timeline show')
    isTimelineDirty().then(() => this.this.loadNew(true))
  },

  onReachBottom () {
    console.log('Page Timeline reach bottom')
    this.loadNew()
  },

  onPullDownRefresh() {
    console.log('Page Timeline pull down refresh')
    wx.stopPullDownRefresh()
    this.loadNew(true)
  },

  addTraining() {
    wx.navigateTo({
      url: '/pages/training/training'
    })
  },

  loadNew(refresh = false) {
    if(this.data.isLoading) {
      return
    } else {
      this.setData({
        isLoading: true
      })
    }

    if (!refresh && this.data.isAllLoaded) {
      return
    }
    if (refresh) {
      this.setData({
        currentPage: 0,
        isAllLoaded: false,
        trainings: []
      })
      setTimelineDirty(false)
    }
    
    request(`https://hfextreme.cn/api/timeline?page=${this.data.currentPage + 1}`)
      .then((res) => {
        console.log('Timeline data loaded')

        let temp = this.data.trainings
        temp = temp.concat(res.data.data)

        this.setData({
          trainings: temp,
          currentPage: res.data.meta.current_page,
          lastPage: res.data.meta.last_page,
          isAllLoaded: res.data.meta.last_page === res.data.meta.current_page
        })

        this.setData({
          isLoading: false
        })
      }).catch(() => {
        this.setData({
          isLoading: false
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
  },

  checkComment(value) {
    if (!value || value.lenght === 0) {
      this.showError('评论内容不可以为空')
      return false
    }
    return true
  },

  showError(message) {
    this.setData({
      validator: {
        invalid: true,
        message: message
      }
    })

    setTimeout(() => {
      this.resetValidator()
    }, 2000)
  },

  resetValidator() {
    this.setData({
      validator: {
        invalid: false,
        message: ''
      }
    })
  },

  submitComment(e) {
    const id = e.target.dataset.id
    const text = e.detail.value

    if (!this.checkComment(text)) {
      return
    }

    request(`https://hfextreme.cn/api/trainings/${id}/comments`, {
      'text': text
    }, 'POST')
      .then(() => {
        const self = this

        wx.getStorage({
          key: 'nick_name',
          success(res) {
            let temp = self.data.trainings
            const index = temp.findIndex((item) => {
              return item.id === id
            })
            temp[index].comments.push({
              id: -1,
              owner: {
                nick_name: res.data
              },
              text: text
            })
            self.setData({
              trainings: temp,
              commentValue: null
            })
          },
        })
      })
  },

  deleteComment(e) {
    const comment = e.target.dataset.comment,
      training = e.target.dataset.training,
      self = this
    
    console.log(comment)
    console.log(training)

    if (comment.id === -1) {
      return
    }
    wx.getStorage({
      key: 'user_id',
      success(res) {
        if (comment.owner.id !== res.data) {
          return
        }

        wx.showActionSheet({
          itemList: ['删除'],
          success(res) {
            if(res.tapIndex === 0) {
              request(`https://hfextreme.cn/api/comments/${comment.id}`, {}, 'DELETE')
                .then(() => {
                  console.log('deleted')

                  const trainings = self.data.trainings

                  const idx = trainings.findIndex((item) => {
                    return item.id === training.id
                  })

                  const idx2 = trainings[idx].comments.findIndex((item) => {
                    return item.id === comment.id
                  })
                  
                  trainings[idx].comments.splice(idx2, 1)

                  self.setData({
                    trainings: trainings
                  })
                })
            }
          },
          fail: function (res) {
            console.log(res.errMsg)
          }
        })
      },
    })
  }
})