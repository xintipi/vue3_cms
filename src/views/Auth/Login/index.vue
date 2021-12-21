<template>
  <div id="Login">
    <h1>Login</h1>
    <div>
      <a-input v-model:value="value" placeholder="Basic usage" />
      <a-button type="primary">Primary Button</a-button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const value = ref('')
    return {
      value
    }
  }
})
</script>
