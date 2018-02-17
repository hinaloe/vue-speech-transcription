<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <h1 class="navbar-item">文字起こしするやつ</h1>
      <div class="navbar-burger" :class="{'is-active': menu}" @click="menu=!menu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="navbar-menu"  :class="{'is-active': menu}">
      <div class="navbar-end">
        <a class="navbar-item" href="https://github.com/hinaloe/vue-speech-transcription"><icon name="github" scale="1.5"/> github</a>
      </div>
    </div>
  </nav>
</template>

<script>
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/github'

export default {
  components: {Icon},
  name: 'navbar',
  data () {
    return {
      menu: false
    }
  }
}
</script>

<style scoped>

</style>
