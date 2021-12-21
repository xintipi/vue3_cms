import { configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import dictionary from '@/enums/validations.enum'

import i18n from '@/locale'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ja from '@vee-validate/i18n/dist/locale/ja.json'

const configureValidation = (app) => {
  app.mixin({
    created() {
      const messages = {
        en: { ...en.messages, ...dictionary.en },
        ja: { ...ja.messages, ...dictionary.ja }
      }

      const locale = i18n.global.locale

      configure({
        validateOnInput: true,
        generateMessage: localize(`${locale}`, {
          messages: { ...messages[locale] }
        })
      })
    }
  })
}

export default configureValidation
