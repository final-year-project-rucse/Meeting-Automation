import React from 'react'

const Button = (props) => {
  return (
    <div className='btn_container'>
        <button className='btn_global'>{props.title}</button>
    </div>
  )
}

export default Button