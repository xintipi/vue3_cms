const clickOutSide = (app) => {
  app.directive('click-outside', {
    beforeMount(el, binding) {
      el.eventSetDrag = () => {
        el.setAttribute('data-dragging', 'yes')
      }
      el.eventClearDrag = () => {
        el.removeAttribute('data-dragging')
      }
      el.eventOnClick = (event) => {
        const dragging = el.getAttribute('data-dragging')
        // Check that the click was outside the el and its children, and wasn't a drag
        if (!(el === event.target || el.contains(event.target)) && !dragging) {
          // call method provided in attribute value
          binding.value(event)
        }
      }
      document.addEventListener('touchstart', el.eventClearDrag)
      document.addEventListener('touchmove', el.eventSetDrag)
      document.addEventListener('click', el.eventOnClick)
      document.addEventListener('touchend', el.eventOnClick)
    },
    unmounted(el) {
      document.removeEventListener('touchstart', el.eventClearDrag)
      document.removeEventListener('touchmove', el.eventSetDrag)
      document.removeEventListener('click', el.eventOnClick)
      document.removeEventListener('touchend', el.eventOnClick)
      el.removeAttribute('data-dragging')
    }
  })
}

export default clickOutSide
