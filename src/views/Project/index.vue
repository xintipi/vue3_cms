<template>
  <div id="ProjectIndex">
    <Search />

    <!-- Table -->
  </div>
</template>

<script>
import { defineComponent } from 'vue'

// import conponents relative
import Search from '@/views/Project/-components/Search'

export default defineComponent({
  name: 'ProjectPage',

  components: {
    Search
  }
})
</script>

<style scoped></style>
