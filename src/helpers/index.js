import { forEach, isEmpty } from 'lodash-es'

const convertPagination = (pagination, position = 'top') => {
  return {
    defaultCurrent: 1,
    defaultPageSize: 30,
    current: pagination.pageNumber,
    total: pagination.totalRecords,
    totalPage: pagination.totalPages,
    pageSize: pagination.pageSize,
    position: position
  }
}

const deleteEmptyValue = (object) => {
  forEach(Object.keys(object), (key) => {
    if (typeof object[key] === 'object' && !isEmpty(object[key])) {
      object[key] = deleteEmptyValue(object[key])
    } else if (
      (typeof object[key] !== 'boolean' && [undefined, '', null].includes(object[key])) ||
      (typeof object[key] === 'object' && isEmpty(object[key]))
    ) {
      delete object[key]
    }
  })
  return object
}

export default {
  convertPagination,
  deleteEmptyValue
}
