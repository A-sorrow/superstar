<template>
  <div>
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script>
export default {
  data() {
    return {
      restaurants: [],
      state: '',
      timeout: null,
      history: [],
      list: [],
    }
  },
  methods: {
    loadAll() {
      return this.history
    },
    querySearchAsync(queryString, cb) {
      this.list = []
      let arr = ['云A04j', '云A56', '云A5ad', '云Esss5'] //   这里的["xx","xx"]替换成后端返回的数据比如res.data
      arr.forEach((e) => {
        this.list.push({ value: e })
      })
      if (queryString == '') {
        this.history = this.unique(this.history)
        var restaurants = this.history
        var results = restaurants
      } else {
        var restaurants = this.list
        var results = restaurants
      }
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1500 * Math.random())
    },
    handleSelect(item) {
      this.history.push(item)
      localStorage.setItem('history', JSON.stringify(this.history))
    },
    // 去除重复的历史记录
    unique(arr) {
      const res = new Map()
      return arr.filter((arr) => !res.has(arr.value) && res.set(arr.value, 1))
    },
  },
  mounted() {
    let history = JSON.parse(localStorage.getItem('history'))
    if (history) {
      this.history = history
    } else {
      this.history = []
    }
    this.restaurants = this.loadAll()
  },
}
</script>
