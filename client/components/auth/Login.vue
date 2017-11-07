<template>
  <div>
    <form @submit.prevent="onLogin">
      Login: <input name="login" v-model="login" type="text"/><br>
      Password: <input name="password" v-model="password" type="password"/><br>
      <input type="submit" value="Login" />
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        login: '',
        password: ''
      }
    },
    methods: {
      onLogin () {
        this.$store.dispatch('login', { username: this.login, password: this.password }).then(
          data => {
            this.$router.push('/')
          }
        )
      }
    }
  }
</script>
