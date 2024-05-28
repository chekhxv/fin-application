import React from 'react'

const  ToggleButton = ({showPassword, onClick, className}) => {
  return (
    <button className={className} onClick={onClick}>
        {showPassword ? 'Show' : 'Hide'};
    </button>
  )
}

export default ToggleButton;
