<template>
  <div>
    <navbar/>
    <div id="app" class="container">
      <speech-writing/>
      <logview/>
    </div>
  </div>
</template>

<script>

import 'bulma/css/bulma.css'
import SpeechWriting from './components/SpeechWriting'
import Logview from '@/components/logview'
import Navbar from '@/components/navbar'

export default {
  name: 'App',
  components: {
    Navbar,
    Logview,
    SpeechWriting
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
