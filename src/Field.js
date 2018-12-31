import React from 'react'

const inputStyles = valid => {
  return {
    display: 'block',
    padding: '10px',
    fontSize: '2em',
    borderColor: valid ? 'inherit' : 'red'
  }
}

const Field = props => {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ fontSize: '1.5em' }}>{ props.label }:</span>
      <input type='text' name={props.fieldName}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
        style={inputStyles(props.valid)} />
      { !props.valid &&
        <div style={{ color: 'red' }}>{ props.message }</div>
      }
    </label>
  )
}

export default Field
