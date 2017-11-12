<template>
  <div id="app">
    <alerts></alerts>
    <account-bar></account-bar>
    <nav>
      <router-link :to="{name: 'translate'}">Translate</router-link>
      <router-link :to="{name: 'test-vocables'}">Test</router-link>
      <router-link :to="{name: 'add-vocables'}">New</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  import AccountBar from './AccountBar'
  import Alerts from './alerts/Alerts'
  export default {
    components: {Alerts, AccountBar}
  }
</script>

<style>
body {
  margin: 0;
  font-size: 2rem;
  font-family: -apple-system, BlinkMacSystemFont,
               'avenir next', avenir,
               helvetica, 'helvetica neue',
               Ubuntu,
               'segoe ui', arial,
               sans-serif;
}
.page {
  text-align: center;
  /* nesting for the need to test postcss */
  code {
    background-color: #f0f0f0;
    padding: 3px 5px;
    border-radius: 2px;
  }
}
</style>
