<template>
  <a-layout class="main">
    <app-sidebar />
    <a-layout class="main__content">
      <app-header>
        <slot name="header" />
      </app-header>

      <a-layout-content>
        <a-config-provider>
          <router-view />
        </a-config-provider>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { defineComponent } from 'vue'

import AppSidebar from './App/AppSidebar'
import AppHeader from './App/AppHeader'

export default defineComponent({
  name: 'MainLayout',

  components: {
    AppSidebar,
    AppHeader
  }
})
</script>

<style lang="scss">
.header.is-collapse {
  left: 66px;
  transition: transform 0.3s ease-in-out, left 0.3s ease-in-out;
}

.main {
  height: 100vh;
}
</style>
