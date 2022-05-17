<template>
  <div>
      I am two
      接收到兄弟的求救信号：{{message}}
  </div>
</template>

<script>
import bus from '@/assets/js/eventBus'
export default {
name: 'two',
  data() {
    return {
      message: '',
    }
  },
  methods: {

  },
  mounted(){
    bus.$on('SOS',(data) =>{
      this.message = data ? data : '--'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>