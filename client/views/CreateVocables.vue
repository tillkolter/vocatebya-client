<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input placeholder="German *" v-model="germanReading" type="text" required/>
      <select v-model="wordType" required>
        <option value="" disabled selected>Wähle eine Wortart...</option>
        <option :value="wordTypes[wordType]" v-for="wordType in Object.keys(wordTypes)">{{wordType}}</option>
      </select>
      <input placeholder="Russian *" v-model="russianReading" type="text" required/>
      <input type="submit"/>
    </form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'CreateVocables',
    data () {
      return {
        germanReading: undefined,
        russianReading: undefined,
        wordType: undefined
      }
    },
    computed: {
      ...mapGetters(['wordTypes'])
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
