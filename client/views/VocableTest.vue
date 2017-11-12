<template>
  <div>
    <template v-if="currentTestVocable">
      <current-test-vocable></current-test-vocable>
      <template v-if="!currentResultStatus">
        <form @submit.prevent="onSolveVocable">
          <input v-model="targetTranslation" type="text" required/>
          <input value="Weiter" type="submit"/>
        </form>
      </template>
      <template v-else>
        <div>{{targetTranslation}}</div>
        <div>Status: {{currentResultStatus}}</div>
        <form @submit.prevent="getNextVocable">
          <input type="submit" value="Next"/>
        </form>
      </template>
    </template>
    <template v-else>
      <template v-if="loadingTest">Loading Test...</template>
      <template v-else>Could not load any vocables :(</template>
    </template>
  </div>
</template>

<script>
  import CurrentTestVocable from '../components/vocables/CurrentTestVocable'
  import {mapGetters} from 'vuex'
  export default {
    components: {CurrentTestVocable},
    name: 'VocableTest',
    data () {
      return {
        targetTranslation: ''
      }
    },
    computed: {
      ...mapGetters(['currentTestVocable', 'loadingTest', 'currentResultStatus', 'currentVocableTest']),
      resultText () {
        if (this.currentResultStatus === 'failed') {
          return 'Falsch'
        } else if (this.currentResultStatus === 'solved') {
          return 'Richtig'
        }
      }
    },
    methods: {
      getNextVocable () {
        this.targetTranslation = ''
        this.$store.dispatch('nextTestVocable')
      },
      onSolveVocable () {
        this.$store.dispatch('solveVocableTranslation', {
          id: this.currentTestVocable.id,
          translation: this.targetTranslation,
          testId: this.currentVocableTest.id
        })
      },
      startTest () {
        this.$store.dispatch('startVocableTest')
      }
    },
    mounted () {
      this.startTest()
    }
//    ,
//    beforeRouteEnter (to, from, next) {
//      next(vm => {
//        vm.startTest()
//      })
//    }
  }
</script>
