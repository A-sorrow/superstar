/*
 * @Author: chenghei
 * @Date: 2022-05-13 21:20:34
 * @LastEditors: chenghei
 * @LastEditTime: 2022-05-13 21:20:34
 * @Descripttion: 
 */
/**
 * 时间格式转换
 * xxxx-xx-xx
 */
 export function formartDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
};
/**
 * el-cascader 数据格式
 * xxxx-xx-xx
 */
export function transRegion (regionInfo) {
  if (!regionInfo) {
    return null
  }
  let regionId = regionInfo.regionId
  let regionName = regionInfo.name
  // eslint-disable-next-line no-undef
  let children = _.map(regionInfo.children, child => {
    return transRegion(child)
  })
  var res = {
    label: regionName,
    value: regionId,
    children: children
  }
  return res
}
/**
 * 获取当前时间毫秒
 * xxxx-xx-xx
 */
export function Newtiem () {
  let date = new Date()
  var y = date.getFullYear() // 获取完整的年份(4位,1970-????)
  var m = date.getMonth() + 1 // 获取当前月份(0-11,0代表1月)
  var d = date.getDate() // 获取当前日(1-31)
  var t = date.getTime() // 获取当前时间(从1970.1.1开始的毫秒数)
  var h = date.getHours() // 获取当前小时数(0-23)
  var min = date.getMinutes() // 获取当前分钟数(0-59)
  var s = date.getSeconds() // 获取当前秒数(0-59)
  var ms = date.getMilliseconds() // 获取当前毫秒数(0-999)

  return y + m + d + t + h + min + s + ms
}
/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate (data, id = 'id', pid = 'parentId') {
  var res = []
  var temp = {}
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}

export function getID () { //  获取GUID （全球唯一标识符）
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0
    var v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}
