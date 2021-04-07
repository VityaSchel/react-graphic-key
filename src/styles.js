const pointSize = 50
const spanSize = 10

export default {
  grid: {
    width: 'fit-content',
    userSelect: 'none',
    position: 'relative'
  },

  row: {
    width: 'fit-content',
    fontSize: 0
  },

  point: {
    width: pointSize+'px',
    height: pointSize+'px',
    display: 'inline-block',
    margin: '20px',
  },

  selected_point: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  unselected_point: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  svg: {
    position: 'absolute',
    opacity: 0,
    top: 0,
    left: 0,
    pointerEvents: 'none'
  },

  pointSpanSelected: {
    display: 'block',
    borderRadius: '50%',
    width: spanSize + 'px',
    height: spanSize + 'px',
    backgroundColor: '#000',
    border: '1px solid #000'
  },

  pointSpanUnselected: {
    display: 'block',
    borderRadius: '50%',
    width: spanSize + 'px',
    height: spanSize + 'px',
    backgroundColor: 'transparent',
    border: '1px solid #000'
  }
}