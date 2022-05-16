export default {
    /**
	 * 要传给后台的值，转义成中文
	 * @param val-需要转义的值(key:'value',value:'key')
	 * @param transType-需要转义的映射
	 */
	valueFilter(val, transType = null) {
		if (transType) {
			if (val) {
				return val === '' ? '请选择' : dict[transType].filter(item => {
					return val === item.key || val === item._key
				})[0].value;
			}
		} else {
			return val === '' ? '请选择' : val;
		}
	},
	/**
	 * 要传给后台的值，转义成中文
	 * @param val-需要转义的值(key:'text',value:'value')
	 * @param transType-需要转义的映射
	 */
	valueFilter2(val, transType = null) {
		if (transType) {
			if (val) {
				return val === '' ? '请选择' : dict[transType].filter(item => {
					return val === item.value
				})[0].text;
			}
		} else {
			return val === '' ? '请选择' : val;
		}
	},
	// 银行卡过滤前4后4
	bankCardPeel: (value, type = 'A') => {
		if (!value || value.length === 0) return '-'
		if (type == 'A') {
			return '****************' + value.substr(-4, 4)
		} else if (type == 'B') {
			return value.substr(0, 4) + '********' + value.substr(-4, 4)
		}
		else if (type == 'C') {
			return value.substr(0, 4) + '****************'
		}

	},
	bankCardPeelSpace: (value, step) => {
		if (!value || value.length === 0) return '-'
		let str = ''
		for (let i = 0; i < value.length; i++) {
			if ((i != 0) && ((i % step) == 0)) {
				str = str + ' ' + value[i]
			} else {
				str = str + value[i]
			}
		}
		return str

	},
	// bankCardPeel2: (value) => {
	// 	if (!value || value.length === 0) return '-'
	// 	let re = /^[\u4E00-\u9FA5]/
	// 	if (re.test(value)) {
	// 		return value
	// 	}
	// },
	// 银行卡过滤 银行名称加卡号后4位
	bankCardNameLastFour: (input, bankName = '江西农商银行', str = '尾号') => {
		return isEmpty(input) ? '' : bankName + '(' + str + input.substring(input.length - 4) + ')';
	},
	//手机号格式脱敏
	phonePeel: (value) => {
		if (!value) return;
		if (value.indexOf('*') > -1) return value;
		return value.substr(0, 3) + '*****' + value.substr(-3, 3)
	},
	moneyTypePeel: (value) => {
		switch (value) {
			case '301':
				return '人民币'
			case '302':
				return '美元'
			case '303':
				return '英镑'
			case '304':
				return '欧元'
			case '305':
				return '港币'
			case '306':
				return '加拿大元'
			case '307':
				return '卢布'
			case '308':
				return '日元'
			case '309':
				return '澳门元'
			case '310':
				return '新西兰元'
			case '311':
				return '挪威克朗'
			case '312':
				return '菲律宾比索'
			case '313':
				return '新加坡元'
			case '314':
				return '瑞典克朗'
			case '315':
				return '瑞士法郎'
			case '316':
				return '泰国珠'
		}
	},
	//金额过滤器
	currency: (value, _currency, decimals, split0, zeroFormat) => {
		let digitsRE = /(\d{3})(?=\d)/g
		if (value === 0 || value === '0' || value === '0.00' || value === '0.0') {
			return zeroFormat ? '0.00' : 0
		}
		if (typeof value === 'string') value = value.replace(new RegExp(',', 'gm'), '');
		value = parseFloat(value);
		if (!isFinite(value) || !value && value !== 0) return '-';
		// 设置货币单位名称
		_currency = _currency != null ? _currency : '¥';
		// 表示要保留的小数位2表示保留两位小数
		decimals = decimals != null ? decimals : 2;
		let stringified = Math.abs(value).toFixed(decimals);
		let _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
		let i = _int.length % 3;
		let head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
		let _float = decimals ? stringified.slice(-1 - decimals) : '';
		/**
		 * 去除小数点后最后为0的字符串
		 * @param str
		 * @returns {*}
		 */
		let splitZero = (str) => {
			let returnStr = parseFloat(str).toString();
			if (returnStr == '0') {
				return '.00';
			}
			returnStr = returnStr.substr(1);
			if (returnStr.length < 3) {
				returnStr = returnStr + '0'
			}
			return returnStr;
		};
		if (split0) _float = splitZero(_float);
		let sign = value < 0 ? '-' : '';
		let returnTest = ''; // 返回的字符串
		if (_currency === '¥') {
			returnTest = sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
		} else {
			returnTest = sign + head + _int.slice(i).replace(digitsRE, '$1,') + _float + _currency;
		}
		return returnTest;
	},

	/**
	 * 身份证 后4位
	 */
	idNo: (value) => {
		if (value == '' || value == null) {
			return ''
		}
		let idNo = String(value)
		let str2 = idNo.substr(-4, 4)
		if (idNo.length > 15) {
			idNo = "***************" + str2
		} else {
			idNo = "************" + str2
		}
		return idNo
	},
	// 性别
	sexFilter: (val) => {
		let _list = dict.sex.filter(item => item.key === val)
		return _list.length > 0 ? _list[0].value : '-'
	},
	// 民族
	nationFilter: (val, value = 'key') => {
		let returnValue = value == 'key' ? 'value' : 'key';
		let _list = dict.nation.filter(item => item[value] === val)
		return _list.length > 0 ? _list[0][returnValue] : '-'
	},
	// 职业
	jobsFilter: (val, nullText) => {
		let msg = '';
		if (!val || val === '' || val === null) {
			msg = nullText || '-';
		} else {
			let i = val.substr(0, 1);
			let list1 = dict.job.filter(item => item.index == i);
			if (list1.length > 0) {
				if (list1[0].value == val) {
					msg = list1[0].name;
				} else {
					let list2 = list1[0].list.filter(item => item.value == val);
					if (list2.length > 0) {
						msg = list2[0].name
					} else {
						// 若val为三级职业，则找到二级职业即可
						let str = val.substr(0, 3);
						let list3 = list1[0].list.filter(item => item.value.substr(0, 3) == str);
						msg = list3.length > 0 ? list3[0].name : '-'
					}
				}
			} else {
				msg = '-'
			}
		}
		return msg;
	},
	taxTypeFilter: (val) => {
		let msg = '';
		if (!val || val === '' || val === null) {
			msg = '-';
		} else {
			let item = dict.taxTypeList.find(item => item.value == val)
			if (item) {
				msg = item.name
			}
		}
		return msg
	},
	// 姓名过滤器，保留前1后1、两字则保留前1（姓）
	filterName: (value) => {
		if (!String(value).length) return ''
		let filterName = ''
		let name = String(value)
		let firstName = name.substr(0, 1)
		let lastName = name.substr(-1, 1)
		if (name.length == 1) {
			filterName = firstName
		} else if (name.length == 2) {
			filterName = '*' + lastName
		} else if (name.length > 2) {
			let xing = ''
			for (let i = 1; i <= name.length - 2; i++) {
				xing += '*'
			}
			if (xing.length > 2) {
				xing = '**'
			}
			filterName = firstName + xing + lastName
		}
		return filterName
	},
	// 时间格式
	dateFormat: (val, formatType = 'yyyy-MM-dd') => {
		if (!Number(val)) {
			return new Date(val).format(formatType);
		}
		return new Date(Number(val)).format(formatType);
	},
	dateFormat3Normal: (value) => {
		const reg = /([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/g.exec(
			value
		)
		if (reg) {
			return `${reg[1]}年${reg[2]}月${reg[3]}日 ${reg[4]}:${reg[5]}:${reg[6]}`
		} else {
			return '0000年00月00日 00:00:00'
		}
	},
	/**
	 * 时间yyyyMMddHHmmss => yyyy-MM-dd HH:mm:ss
	 * @param {*} value
	 * @returns
	 */
	dateFormat4Normal: (value) => {
		const reg = /([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/g.exec(
			value
		)
		if (reg) {
			return `${reg[1]}-${reg[2]}-${reg[3]} ${reg[4]}:${reg[5]}:${reg[6]}`
		} else {
			return '0000-00-00 00:00:00'
		}
	},
	// 地址格式脱敏
	addressFilter: (value) => {
		if (value == '' || value == null) {
			return ''
		}
		let address = String(value);
		if (address.length < 6) {
			if (address.length > 3) {
				address = address.substr(0, 1) + '**' + address.substr(-2, 2)
			}
		} else if (address.length < 10) {
			address = '****' + address.substr(-5, 5)
		} else {
			address = address.replace(address.substr(-9, 4), '****')
		}
		return address;
	},
	moneySmallToBig: (n) => {
		if (n === '') return '零元整';
		let fraction = ['角', '分'];
		let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
		let unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
		let head = n < 0 ? '欠' : '';
		n = Math.abs(n);
		let s = '';
		for (let i = 0; i < fraction.length; i++) {
			s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
		}
		s = s || '整';
		n = Math.floor(n);
		for (let i = 0; i < unit[0].length && n > 0; i++) {
			let p = '';
			for (let j = 0; j < unit[1].length && n > 0; j++) {
				p = digit[n % 10] + unit[1][j] + p;
				n = Math.floor(n / 10);
			}
			s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
		}
		return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
	},
	// 贷款期限filter
	loanTermFilter(val) {
		let returnVal = ''
		if (val) {
			let unit = val.slice(0, 1)
			if (unit === 'D') {
				returnVal = val.slice(1) + '天'
			} else if (unit === 'M') {
				let m = val.slice(1)
				if (m.slice(0, 1) == '0') {
					m = m.slice(1)
				}
				returnVal = m + '个月'
			} else if (unit === 'Y') {
				returnVal = val.slice(1) + '年'
			}
		} else {
			returnVal = val
		}
		return returnVal
	},
	// 渠道filter
	channelFilter(val) {
		let channelList = [
			{ name: '本行柜面', value: '01' },
			{ name: '本行ATM', value: '02' },
			{ name: '本行POS', value: '03' },
			{ name: '网上银行', value: '04' },
			{ name: '电话银行', value: '05' },
			{ name: '他行ATM', value: '08' },
			{ name: '他行柜面', value: '09' },
			{ name: '他行POS', value: '10' },
			{ name: '信贷管理系统', value: '29' },
			{ name: '国际业务', value: '33' },
			{ name: '手机银行', value: '34' },
			{ name: '票据系统', value: '39' },
			{ name: 'E百福', value: '52' },
			{ name: '智能柜台', value: '57' },
			{ name: '移动营销', value: '59' },
			{ name: '微银行', value: '64' },
			{ name: '秒贷', value: '75' },
			{ name: '供应链', value: '76' },
			{ name: '赣服通', value: 'A6' },
			{ name: '微信小程序', value: '22' },
			{ name: '支付宝小程序', value: '23' },
		]
		let item = channelList.find(item => item.value == val)
		return item ? item.name : '其他渠道'
	},
	// 数字进行单位转换
	// unit1 单位
	// unit2 倍数
	numberExchange(val, unit1 = '万', unit2) {
		let num = Number(val)
		if (isNaN(num)) return ''
		let arr = {
			'十': 10,
			'百': 100,
			'千': 1000,
			'万': 10000
		}
		if (!unit2) {
			return (num / arr[unit1]) + '' + unit1
		}
		return (num / unit2) + '' + unit1
	},
	/**
	 * 加法运算，避免数据相加小数点后产生多位数和计算精度损失。
	 *
	 * @param num1 加数1
	 * @param num2 加数2
	 */
	numAdd(num1, num2) {
		let baseNum, baseNum1, baseNum2
		try {
			baseNum1 = num1.toString().split('.')[1].length
		} catch (e) {
			baseNum1 = 0
		}
		try {
			baseNum2 = num2.toString().split('.')[1].length
		} catch (e) {
			baseNum2 = 0
		}
		baseNum = Math.pow(100000, Math.max(baseNum1, baseNum2))
		return (num1 * baseNum + num2 * baseNum) / baseNum
	},


	/**
	 * 减法运算，避免数据相减小数点后产生多位数和计算精度损失。
	 *
	 * @param num1 被减数
	 * @param num2 减数
	 */
	numSub(num1, num2) {
		let baseNum, baseNum1, baseNum2
		let precision// 精度
		try {
			baseNum1 = num1.toString().split('.')[1].length
		} catch (e) {
			baseNum1 = 0
		}
		try {
			baseNum2 = num2.toString().split('.')[1].length
		} catch (e) {
			baseNum2 = 0
		}
		baseNum = Math.pow(10, Math.max(baseNum1, baseNum2))
		precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2
		return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision)
	},
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
}