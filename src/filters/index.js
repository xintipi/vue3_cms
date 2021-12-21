import moment from 'moment'

export default {
  formartDate(value) {
    if (!value) return ''
    return `${moment(new Date(value)).format('YYYY/MM/DD')}`
  }
}
