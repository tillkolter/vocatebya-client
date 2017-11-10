<template>
  <div>
    {{currentTestVocable.word.word}}
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'CurrentTestVocable',
    computed: {
      ...mapGetters(['currentTestVocable'])
    }
  }
</script>
