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
      <input type='text'
        value={props.scope.value}
        onChange={props.scope.onChange}
        onBlur={props.scope.onBlur}
        placeholder={props.placeholder}
        style={inputStyles(props.scope.error)} />
      { props.error !== '' &&
        <div style={{ color: 'red' }}>{ props.scope.error }</div>
      }
    </label>
  )
}

export default Field
