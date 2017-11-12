<template>
  <div>
    <div>
      {{currentTestVocable.vocable.word.word}}
    </div>
    <div>
      {{ `${currentTestVocable.position + 1}/${currentVocableTest.count}` }}
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'CurrentTestVocable',
    computed: {
      ...mapGetters(['currentTestVocable', 'currentVocableTest'])
    }
  }
</script>
