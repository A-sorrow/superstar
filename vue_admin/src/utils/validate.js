/**
 * 表单校验规则
 * */
export default {
  /**
   * 验证手机号格式
   * */
  checkPhone(phone) {
    if (!phone || phone === 'undefined' || phone.length === 0) {
      return false
    }
    if (phone.indexOf('*') >= 0) {
      return true
    }
    let reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
    return reg.test(phone)
  },
  /**
   * 时间比较器
   * 开始时间不能大于结束时间
   * */
  timeCompare(beginTime, endTime) {
    let begin = beginTime.replace(/-/g, '/');
    let end = endTime.replace(/-/g, '/');
    return (new Date(begin).getTime() > new Date(end).getTime()) ? false : true
  },
  /**
   * 邮箱格式校验
   * */
  checkEmail(val) {
    let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    return reg.test(val);
  },
  /**
   * 邮政编码
   * */
  postalCode(val) {
    let reg = /^[0-9]{6}$/;
    return reg.test(val);
  },
  /**
   * 验证身份证号码格式
   * @param phone
   * @returns {boolean}
   */
  checkIdCard(value) {
    let weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //十七位数字本体码权重
    let validate = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']; //mod11,对应校验码字符值

    if (value.length < 18) {
      return false;
    }

    let sum = 0;
    let mode = 0;

    for (let i = 0; i < 17; i++) {
      sum = sum + (value.split('')[i] - 0) * weight[i];
    }
    mode = sum % 11;
    if (validate[mode] === value.split('')[17]) {
      return true;
    }
    return false;
  },
}
