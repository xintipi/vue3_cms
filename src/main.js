import { createApp } from 'vue'

import store from '@/store'
import router from '@/router'
import i18n from '@/locale'

import directives from '@/directives'
import globalComponents from '@/plugins/ant.design'
import validation from '@/plugins/validation'
import configureValidation from '@/mixins/validation.mixin'
import globalFilters from '@/filters'

import App from '@/App.vue'

// global css
import '@/styles/main.scss'

const app = createApp(App)

app.config.globalProperties.$filters = globalFilters

directives(app)

// register plugins
// eslint-disable-next-line prettier/prettier
app.use(i18n)
  .use(router)
  .use(store)

// register ant-design as global components
globalComponents(app)

// register vee validate
validation(app)

// global mixin
configureValidation(app)

// mount app
app.mount('#app')
