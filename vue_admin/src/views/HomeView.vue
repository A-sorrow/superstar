<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <AboutViewVue :dataObj="formData" @sendFun="getSon"></AboutViewVue>
    <p style="font-size: 30px; color: brown">我是子组件传递过来的{{ tip }}</p>
    <one></one>
    <two></two>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import AboutViewVue from './AboutView.vue'
import one from '@/components/one.vue'
import two from '@/components/two.vue'
export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    AboutViewVue,
    one,
    two,
  },
  data() {
    return {
      formData: {
        name: '张三',
        age: '44',
        sex: 1,
      },
      tip: '',
    }
  },
  methods: {
    getSon(val) {
      if (!val) return '--'
      this.tip = val
    },
  },
}
</script>
