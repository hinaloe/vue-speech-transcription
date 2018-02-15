<template>
    <div>
      <div v-for="log in logs" :key="log.key" :class="['message', `is-${log.type}`]">
        <div class="message-body">{{log.message}}</div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'logview',
  computed: {
    logs () {
      return this.$store.state.log.slice().reverse()
    }
  }
}
</script>

<style scoped>

</style>
