<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input placeholder="German *" v-model="germanReading" type="text"/>
      <select v-model="wordType">
      </select>
      <input placeholder="Russian *" v-model="russianReading" type="text"/>
      <input type="submit"/>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'CreateVocables',
    data () {
      return {
        germanReading: undefined,
        russianReading: undefined,
        wordType: undefined
      }
    },
    mounted () {

    },
    methods: {
      onSubmit () {
        this.$store.dispatch('createVocable', {
          'word': {
            'word': this.germanReading,
            'type': 1
          },
          'translation': this.russianReading
        })
      }
    }
  }
</script>
