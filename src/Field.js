import React from 'react'

const inputStyles = error => {
  return {
    display: 'block',
    padding: '10px',
    fontSize: '2em',
    borderColor: error
      ? 'red'
      : 'inherit'
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
        style={inputStyles(props.error)} />
      { props.error !== '' &&
        <div style={{ color: 'red' }}>{ props.error }</div>
      }
    </label>
  )
}

export default Field
