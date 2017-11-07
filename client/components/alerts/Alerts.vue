<template>
  <div id="alerts">
    <alert :alert="alert" v-for="(alert, i) in alerts" :key="`alert-${i}`"></alert>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Alert from './Alert'
  export default {
    components: {Alert},
    name: 'Alerts',
    computed: {
      ...mapGetters(['alerts'])
    }
  }
</script>

<style>
  #alerts {
    position: fixed;
    top: 16px;
    left: 50%;
    width: 310px;
    margin-left: -155px;
  }
</style>