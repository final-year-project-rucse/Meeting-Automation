import React from 'react'

const Input = (props) =>{
  return (
    <div className='input_container'>
        <label for="">{props.placeholder}</label>
        <input type={props.type} placeholder={props.placeholder} name={props.name} value={props.value} onChange={props.handler} />
    </div>
  )
}

export default Input