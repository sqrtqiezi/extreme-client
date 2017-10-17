const { request } = require('../../utils/network.js')
const { isCurrentUser } = require('../../utils/util.js')
Page({
  data: {
    userName: '',
    userId: 0,
    trainings: [],
    isCurrentUser: false,
    commentValue: '',
    validator: {
      invalid: false,
      message: ''
    }
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
        console.log(comment)
        if (comment.owner.id !== res.data) {
          return
        }

        wx.showActionSheet({
          itemList: ['删除'],
          success(res) {
            if (res.tapIndex === 0) {
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