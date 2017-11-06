<template>
  <div id="account-nav"><div id="account-nav__name">Hello <em>{{userName}}</em>!</div></div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'AccountBar',
    computed: {
      ...mapGetters(['userName'])
    }
  }
</script>

<style lang="scss">
  #account-nav {
    &__name {
      float: right;
    }
  }
</style>
