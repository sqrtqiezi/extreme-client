function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function fakeUsers() {
  return [
    { wx_id: '1', user_name: '郭建国',
      score: '755', swim: 3.5, cycle: 110, run: 42,
      avatar: 'http://wx.qlogo.cn/mmopen/zpbvFd9icACPYvQfZO25EHorMb1gCa33oGaAXdYXBiczwaZJEUuQ1t2sV3ka2TYByHWoSgN7hktSkIqWYZ6GicyRIDwQsNxfPVH/0' },
    { wx_id: '2', user_name: '藜杖藤冠',
      score: '755', swim: 3.5, cycle: 110, run: 42,
      avatar: 'http://wx.qlogo.cn/mmopen/zpbvFd9icACPXk5p8UaVsgMFMoybVD5BJSSOziamxibYLRFonZ3a1d9qEn8Y2giaHGZLyyiaqKEoN5e4kfm24zomSwdmNa2Ulic9jO/0'},
    { wx_id: '3', user_name: '俊杰',
      score: '755', swim: 3.5, cycle: 110, run: 42,
      avatar: 'http://wx.qlogo.cn/mmopen/zpbvFd9icACPXk5p8UaVsgGI3AQsQPKibsxlSFlh7obticxibLkUPHV3ygEYU6zGUs0icjVb65p2mc0OvtkChypiaeRvPDVgkr0MVib/0'},
    { wx_id: '4', user_name: '咖啡',
      score: '755', swim: 3.5, cycle: 110, run: 42,
      avatar: 'http://wx.qlogo.cn/mmopen/zpbvFd9icACPXgtgd2yeCCNhYUSE5ibm7suPaQwB1v2c7KvcKZegFGGibkJFwQH4upoZVhdIvgZM5fUjU0QeSnR5zBYe80jjJys/0'},
    { wx_id: '5', user_name: '郭建国',
      score: '755', swim: 3.5, cycle: 110, run: 42,
      avatar: 'http://wx.qlogo.cn/mmopen/zpbvFd9icACPYvQfZO25EHorMb1gCa33oGaAXdYXBiczwaZJEUuQ1t2sV3ka2TYByHWoSgN7hktSkIqWYZ6GicyRIDwQsNxfPVH/0' },
    { wx_id: '6', user_name: '藜杖藤冠',
      score: '755', swim: 3.5, cycle: 110, run: 42,
      avatar: 'http://wx.qlogo.cn/mmopen/zpbvFd9icACPXk5p8UaVsgMFMoybVD5BJSSOziamxibYLRFonZ3a1d9qEn8Y2giaHGZLyyiaqKEoN5e4kfm24zomSwdmNa2Ulic9jO/0'},
    { wx_id: '7', user_name: '俊杰',
      score: '755', swim: 3.5, cycle: 110, run: 42,
      avatar: 'http://wx.qlogo.cn/mmopen/zpbvFd9icACPXk5p8UaVsgGI3AQsQPKibsxlSFlh7obticxibLkUPHV3ygEYU6zGUs0icjVb65p2mc0OvtkChypiaeRvPDVgkr0MVib/0'},
    { wx_id: '8', user_name: '咖啡',
      score: '755', swim: 3.5, cycle: 110, run: 42,
      avatar: 'http://wx.qlogo.cn/mmopen/zpbvFd9icACPXgtgd2yeCCNhYUSE5ibm7suPaQwB1v2c7KvcKZegFGGibkJFwQH4upoZVhdIvgZM5fUjU0QeSnR5zBYe80jjJys/0'},
    { wx_id: '9', user_name: '郭建国',
      score: '755', swim: 3.5, cycle: 110, run: 42,
      avatar: 'http://wx.qlogo.cn/mmopen/zpbvFd9icACPYvQfZO25EHorMb1gCa33oGaAXdYXBiczwaZJEUuQ1t2sV3ka2TYByHWoSgN7hktSkIqWYZ6GicyRIDwQsNxfPVH/0' },
    { wx_id: '10', user_name: '藜杖藤冠',
      score: '755', swim: 3.5, cycle: 110, run: 42,
      avatar: 'http://wx.qlogo.cn/mmopen/zpbvFd9icACPXk5p8UaVsgMFMoybVD5BJSSOziamxibYLRFonZ3a1d9qEn8Y2giaHGZLyyiaqKEoN5e4kfm24zomSwdmNa2Ulic9jO/0'},
    { wx_id: '11', user_name: '俊杰',
      score: '755', swim: 3.5, cycle: 110, run: 42,
      avatar: 'http://wx.qlogo.cn/mmopen/zpbvFd9icACPXk5p8UaVsgGI3AQsQPKibsxlSFlh7obticxibLkUPHV3ygEYU6zGUs0icjVb65p2mc0OvtkChypiaeRvPDVgkr0MVib/0'},
    { wx_id: '12', user_name: '咖啡',
      score: '755', swim: 3.5, cycle: 110, run: 42,
      avatar: 'http://wx.qlogo.cn/mmopen/zpbvFd9icACPXgtgd2yeCCNhYUSE5ibm7suPaQwB1v2c7KvcKZegFGGibkJFwQH4upoZVhdIvgZM5fUjU0QeSnR5zBYe80jjJys/0'}
  ]
}

function fakeEvents() {
  return [
    {
      event_id: 1, time: '7月31日', type: 'swim', distance: 1.5,
      message: '留给中国队的时间已经不多了;留给中国队的时间已经不多了;留给中国队的时间已经不多了;留给中国队的时间已经不多了;留给中国队的时间已经不多了',
      photos: [
        'http://otqwyfqfu.bkt.clouddn.com/event1.png',
        'http://otqwyfqfu.bkt.clouddn.com/event2.png',
        'http://otqwyfqfu.bkt.clouddn.com/event3.png'
      ]
    },
    {
      event_id: 2, time: '7月31日', type: 'run', distance: 10.2,
      message: '留给中国队的时间已经不多了',
      photos: [
        'http://otqwyfqfu.bkt.clouddn.com/event3.png',
        'http://otqwyfqfu.bkt.clouddn.com/event4.png',
        'http://otqwyfqfu.bkt.clouddn.com/event5.png',
        'http://otqwyfqfu.bkt.clouddn.com/event1.png'
      ]
    },
    {
      event_id: 3, time: '7月31日', type: 'cycle', distance: 82.2,
      message: '留给中国队的时间已经不多了',
      photos: [
        'http://otqwyfqfu.bkt.clouddn.com/event1.png',
        'http://otqwyfqfu.bkt.clouddn.com/event2.png',
        'http://otqwyfqfu.bkt.clouddn.com/event3.png',
        'http://otqwyfqfu.bkt.clouddn.com/event4.png',
        'http://otqwyfqfu.bkt.clouddn.com/event5.png',
        'http://otqwyfqfu.bkt.clouddn.com/event1.png'
      ]
    },
    {
      event_id: 4, time: '7月31日', type: 'run', distance: 10,
      message: '留给中国队的时间已经不多了',
      photos: [
        'http://otqwyfqfu.bkt.clouddn.com/event2.png',
        'http://otqwyfqfu.bkt.clouddn.com/event3.png',
        'http://otqwyfqfu.bkt.clouddn.com/event4.png'
      ]
    }
  ];
}

module.exports = {
  formatTime: formatTime,
  fakeUsers: fakeUsers,
  fakeEvents: fakeEvents
}
