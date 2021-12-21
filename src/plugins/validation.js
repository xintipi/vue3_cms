import { defineRule, Form, Field, ErrorMessage } from 'vee-validate'
import { required, email, confirmed, min, numeric } from '@vee-validate/rules'

// Define the rule
defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('confirmed', confirmed)
defineRule('numeric', numeric)

const validation = (app) => {
  app.component('Field', Field)
  app.component('Form', Form)
  app.component('ErrorMessage', ErrorMessage)
}

export default validation
