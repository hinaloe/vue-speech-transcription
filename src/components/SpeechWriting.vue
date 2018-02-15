<template>
  <div v-if="!$store.state.support">
    <p>お使いのブラウザはwebkitSpeechRecognitionをサポートしていません。</p>
    <p>推奨ブラウザ：Google Chrome (最新版)</p>
  </div>
  <div v-else>
    <div class="field">
      <div class="control">
        <textarea class="textarea" v-model="message" ref="editor" rows="16"></textarea>
      </div>
      <div>
        Queue: {{queue}}
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button class="button" v-if="!rec" @click="play"><icon name="circle" color="red"/></button>
        <button class="button" v-else @click="pause"><icon name="pause"/></button>
        <button class="button" @click="download">download as text file</button>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/circle'
import 'vue-awesome/icons/pause'
import Icon from 'vue-awesome/components/Icon.vue'

export default {
  components: {Icon},
  name: 'speech-writing',
  data () {
    return {
      /** @type {SpeechRecognition} */
      speech: null,
      rec: false,
      queue: ''
    }
  },
  mounted () {
    if (!('webkitSpeechRecognition' in window)) {
      this.$store.commit('support', false)
      return
    }

    // eslint-disable-next-line
    this.speech = new window.webkitSpeechRecognition()
    this.speech.addEventListener('start', this.onStart)
    this.speech.addEventListener('error', this.onError)
    this.speech.addEventListener('result', this.onMessage)
    this.speech.addEventListener('end', this.onEnd)

    this.speech.lang = 'ja'
    this.speech.continuous = true
    this.speech.interimResults = true

    if (this.rec) {
      this.speech.start()
    }
  },
  beforeDestroy () {
    if (this.speech) {
      const speech = this.speech
      this.speech = null
      speech.abort()
    }
  },
  computed: {
    message: {
      get () {
        return this.$store.state.message
      },
      set (msg) {
        this.$store.commit('updateMessage', msg)
      }
    }
  },
  methods: {
    onStart () {
      this.$store.commit('log', '録音を開始しました')
    },
    onEnd () {
      this.$store.commit('log', '録音を終了しました')
      if (this.speech && this.rec) {
        this.speech.start()
      }
    },
    /**
     * A error
     * @param err {SpeechRecognitionError}
     */
    onError (err) {
      console.error(err)
      this.$store.commit('log', {message: `エラー (${err.message}) : ${err.error}`, type: 'danger'})
    },
    /**
     *
     * @param event {SpeechRecognitionEvent}
     */
    onMessage (event) {
      // for (const result of event.results) {
      console.log('speechResult', event)

      if (event.results[event.resultIndex].isFinal) {
        this.queue = ''
        this.$store.commit('push', event.results[event.resultIndex][0].transcript)
        if (document.activeElement !== this.$refs.editor) {
          this.$nextTick().then(() => {
            this.$refs.editor.scrollTop = this.$refs.editor.scrollHeight
          })
        }
      } else {
        this.queue = event.results[event.resultIndex][0].transcript
      }
      // }
    },
    play () {
      this.rec = true
      this.speech.start()
    },
    pause () {
      this.rec = false
      this.speech.abort()
    },
    download () {
      const blob = new Blob([this.$store.state.message], {type: 'text/plain'})
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = ''
      a.click()
    }
  }
}
</script>

<style scoped>

</style>
