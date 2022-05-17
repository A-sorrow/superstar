<template>
  <div class="about">
    <h1>This is an about page,我是子组件！</h1>
    <div>
      <h2>
        {{ dataObj.name | judgeNothing }}今年{{
          dataObj.age | judgeNothing
        }}岁的{{ dataObj.sex | judgeSex }}孩！
      </h2>
      <input type="text" placeholder="输入" v-model="inputValue" />
      <button @click.prevent="sendMsg">发送</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  props: {
    deep:true,
    dataObj: {
      name:'',
      age:'',
      sex:''
    },
  },
  data() {
    return {
      inputValue: '',
    }
  },
  methods: {
    // 给父组件传递输入的内容
    sendMsg() {
      this.$emit('sendFun', this.inputValue)
    },
  },
  filters: {
    // 判空
    judgeNothing(val) {
      if (!val) return '--'
      return val
    },
    // 判性别
    judgeSex(val) {
      if (!val) return '--'
      switch (val) {
        case 1:
          return '男'
        case 2:
          return '女'
        default:
          break
      }
    },
  },
}
</script>

<style scoped lang="scss">
.about {
  border: 1px dashed rgb(0, 255, 183);
  background-color: #cfedf3;
  button {
    margin-left: 0.5rem;
  }
}
</style>
