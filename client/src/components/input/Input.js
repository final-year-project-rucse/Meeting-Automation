import React from 'react'

const Input = (props) =>{
  return (
    <div className='input_container'>
        <label className='input_container_label' for="">{props.placeholder}</label>
        <input  type={props.type} name={props.name}  />
    </div>
  )
}


export default Input
