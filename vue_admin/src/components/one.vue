<template>
  <div>
    <h1>I am one</h1>
    <button @click="sendSOS">发送求救</button>
  </div>
</template>

<script>
import bus from '@/assets/js/eventBus'

export default {
  name: 'one',
  data() {
    return {
      message: '求救信息：110',
    }
  },
  methods: {
    sendSOS() {
      bus.$emit('SOS', this.message)
    },
  },
}
</script>

<style lang="scss" scoped></style>
