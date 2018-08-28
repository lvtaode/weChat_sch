const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function regexConfig() {
  var reg = {
    email: /^[.\n]+$/,
    phone: /^1(3|4|5|7|8)\d{9}$/
  }
  return reg;
}
module.exports = {
  formatTime: formatTime,
  regexConfig: regexConfig
}


