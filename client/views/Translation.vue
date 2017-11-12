<template>
  <div>
    <form @submit.prevent="onTranslate">
      <input type="text" v-model="sourceText" required/>
      <input type="submit" value="Translate" />
    </form>
    <div class="powered-by">Powered by <a href="http://api.yandex.com/dictionary">Yandex.Dictionary</a></div>
    <translation-results></translation-results>
  </div>
</template>

<script>
  import TranslationResults from '../components/translation/TranslationResults'
  export default {
    components: {TranslationResults},
    name: 'Translation',
    data () {
      return {
        sourceText: ''
      }
    },
    methods: {
      onTranslate () {
        this.$store.dispatch('translate', {text: this.sourceText})
      }
    }
  }
</script>

<style>
  .powered-by {
    font-size: 1rem;
  }
</style>