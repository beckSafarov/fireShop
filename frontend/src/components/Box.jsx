import React from 'react'

const Box = ({ hidden, className, children }) => {
  return !hidden ? <div className={className}>{children}</div> : <></>
}

Box.defaultProps = {
  hidden: false,
  className: '',
  style: {},
}

export default Box
