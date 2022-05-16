import Vue from "vue";

/**
 *  value-format日期格式化
 * 20200803120000 --> 2020-08-03 12:00:00
 */
 Vue.filter('timeFilter', function (value) {
    const reg = /([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/g.exec(
      value
    )
    if (reg) {
      return `${reg[1]}-${reg[2]}-${reg[3]} ${reg[4]}:${reg[5]}:${reg[6]}`
    } else {
      return '0000-00-00 00:00:00'
    }
  })
  /**
   * 时间戳日期格式化
   */
  Vue.filter('formatTimeToDate', function (val, format,type) {
    if (!val) {
      return '-'
    }
    const date = new Date(val)
    if (date.toString() === 'Invalid Date') {
      return null
    } else {
      const year = date.getFullYear()
      const month =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : '0' + (date.getMonth() + 1)
      const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
      let hour,minutes,seconds
      if(type == 0 || !type){
         hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
         minutes =
          date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
           seconds =
          date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
      }
      else{
         hour = 23
         minutes = 59
         seconds = 59
          
      }
      switch (format) {
        case 'yyyy':
          return year
        case 'yyyy-MM':
          return year + '-' + month
        case 'yyyy-MM-dd':
          return year + '-' + month + '-' + day
        case 'yyyyMM':
          return '' + year + month
        default:
          return (
            year +
            '-' +
            month +
            '-' +
            day +
            ' ' +
            hour +
            ':' +
            minutes +
            ':' +
            seconds
          )
      }
    }
  })
  /**
   * 时间戳日期格式化 yyyy-mm-dd
   */
  Vue.filter('formatToDate', function (val, format) {
    if (!val) {
      return '-'
    }
    const date = new Date(val)
    if (date.toString() === 'Invalid Date') {
      return null
    } else {
      const year = date.getFullYear()
      const month =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : '0' + (date.getMonth() + 1)
      const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
      switch (format) {
        case 'yyyy':
          return year
        case 'yyyy-MM':
          return year + '-' + month
        case 'yyyy-MM-dd':
          return year + '-' + month + '-' + day
        case 'yyyyMM':
          return '' + year + month
        default:
          return (
            year +
            '-' +
            month +
            '-' +
            day
          )
      }
    }
  })
  /**
   * 返回一个月的开始时间和结束时间
   */
  Vue.filter('formatMonth', function (val) {
    const date = new Date(val)
    if (date.toString() === 'Invalid Date') {
      return null
    } else {
      const dateArr = []
      const year = date.getFullYear()
      const month =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : '0' + (date.getMonth() + 1)
      dateArr[0] = year + '-' + month + '-01'
      date.setMonth(date.getMonth() + 1)
      date.setDate(0)
      dateArr[1] = year + '-' + month + '-' + date.getDate()
      return dateArr
    }
  })
  
  
  /**
   * 去掉小数点后最后为0的字符串
   * @param str
   */
  let splitZero = (str) => {
    let returnStr = parseFloat(str).toString()
    if (returnStr == '0') {
      return '.00'
    }
    returnStr = returnStr.substr(1)
    if (returnStr.length < 3) {
      returnStr = returnStr + '0'
    }
    return returnStr
  }
  
  /**
   * 格式化金额，保留两位小数
   * value--要被过滤的值
   * _currency--单位
   * decimals--小数点后几位
   * split0--是否去除小数点后最后为0的字符串
   */
  let digitsRE = /(\d{3}(?=\d))/g
  Vue.filter('formatAmount', function (value, _currency, decimals, split0) {
    if (!value) {
      return '0.00'
    }
    if (typeof value === 'string') value = value.replace(new RegExp(',', 'gm'), '')
    value = parseFloat(value)
    if (!isFinite(value) || !value && value !== 0) return '-'
    // 设置货币单位名称
    _currency = _currency != null ? _currency : ''
    // 表示要保留的小数位2
    decimals = decimals != null ? decimals : 2
    let stringified = Math.abs(value).toFixed(decimals)
    let _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
    let i = _int.length % 3
    let head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : ''
    let _float = decimals ? stringified.slice(-1 - decimals) : ''
    if (split0) _float = splitZero(_float)
    let sign = value < 0 ? '-' : ''
    let returnTest = '' // 返回的字符串
    if (_currency === '￥') {
      returnTest = sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float
    } else {
      returnTest = sign + head + _int.slice(i).replace(digitsRE, '$1,') + _float + _currency
    }
    return returnTest
  })
  
  /**
   * 电子账户查询冻结金额限制
   */
  Vue.filter('formatFreezeAmount', function (val) {
    if (val.acIoFg !== '1') {
      return '-'
    } else {
      const value = Math.round(parseFloat(val.frozenAmount) * 100) / 100
      const valueArr = value.toString().split('.')
      if (valueArr.length === 1) {
        return value.toString() + '.00'
      } else {
        if (valueArr[1].length >= 2) {
          return value
        } else {
          return value.toString() + '0'
        }
      }
    }
  })

  /**
   * 电子账账户-日期选择- 20201002 -> 2020-10-02
   */
  Vue.filter('formatEaccountDate', function (val) {
    if (val) {
      let y = val.substr(0, 4)
      let m = val.substr(4, 2)
      let d = val.substr(6, 2)
      return y + '-' + m + '-' + d
    }
    return '-'
  })
  /**
   * 电子账账户-时间- 20201104133504 ->2020-11-04 13：35：04
   */
  Vue.filter('formatExamineTime', function (val) {
    let result = ''
    if (val) {
      val = val.toString()
      let y = val.substr(0, 4)
      let M = val.substr(4, 2)
      let d = val.substr(6, 2)
      let h = val.substr(8, 2)
      let m = val.substr(10, 2)
      let s = val.substr(12, 2)
      result = y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s
    }
    return result
  })
// 格式化千分位
  Vue.filter('NumFormat', function (value) {
    if (!value) return ' '
  
    var intPart = Number(value).toFixed(0) // 获取整数部分
  
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  
    return intPartFormat
  })
  /**
   * 是否存在数据
   */
  Vue.filter('dataExist', function (val) {
    if (val) {
      return val
    } else {
      return '-'
    }
  })
  /**
   * 将数组转成映射关系
   * @param arrList {array} 用于转化的数据源
   * @param value {string} 映射key值
   * @param custValue {string} 自定义映射的value字段名
   * @param custText {string} 自定义映射的text字段名
   * @return 返回映射对应的值
   */
  Vue.filter('listMap', function (List, value, custValue, custText) {
    let obj = {}
    List.forEach(item => {
      obj[item[custValue || 'value']] = item[custText || 'text']
    })
    return obj[value] || value || '';
  })
  