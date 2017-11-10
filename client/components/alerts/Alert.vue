<template>
  <transition name="fade-from-bottom">
    <div v-if="showAlert" :class="['alert', alert.level]">{{alert.message}}</div>
  </transition>
</template>

<script>
  export default {
    name: 'Alert',
    props: ['alert'],
    data () {
      return {
        showAlert: true
      }
    },
    mounted () {
      let vm = this
      setTimeout(() => { vm.showAlert = false }, 3000)
    }
  }
</script>

<style lang="scss">
  .alert {
    width: 100%;
    height: 32px;
    line-height: 32px;
    padding: 8px 16px;
    margin-bottom: 8px;
    text-align: center;
    font-size: .85rem;
    &:last-child {
      margin-bottom: inherit;
    }
    &.warn {
      background-color: orange;
    }
    &.error {
      background-color: red;
    }
    &.info {
      background-color: blue;
      color: #fff;
    }
    &.success {
      background-color: green;
      color: #fff;
    }
  }
  .fade-from-bottom-enter-active, .fade-from-bottom-leave-active {
    transition-property: margin-top, opacity;
    transition-duration: .5s;
  ;
  }
  .fade-from-bottom-enter {
    margin-top: 50%;
    opacity: 0;

  }
  .fade-from-bottom-leave-to {
    margin-top: -56px;
    opacity: 0;
  }
</style>
