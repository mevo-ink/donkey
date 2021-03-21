const hideScrollBar = {
  /* Works on Chrome, Edge, and Safari */
  '::-webkit-scrollbar': {
    display: 'none'
  },
  /* Works on Firefox */
  '&': {
    scrollbarWidth: 'none'
  }
}

export default hideScrollBar
