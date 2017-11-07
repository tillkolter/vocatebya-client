<template>
  <div id="account-nav"><div v-if="isAuthenticated" id="account-nav__name">Hello <em>{{userName}}</em>!</div></div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'AccountBar',
    computed: {
      ...mapGetters(['userName', 'isAuthenticated'])
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
