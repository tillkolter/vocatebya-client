<template>
  <div class="page">
    <nav>
      <router-link :to="{name: 'add-vocables'}">New...</router-link>
    </nav>
  </div>
</template>

<script>
import Counter from 'components/Counter'

export default {
  components: {
    Counter
  }
}
</script>
