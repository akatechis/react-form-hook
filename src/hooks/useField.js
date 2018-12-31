import { useState } from 'react'

const useField = (
  initialValue,
  validation
) => {
  const [value, dispatchValue] = useState(initialValue || '')
  const [error, dispatchError] = useState('')
  const [dirty, dispatchDirty] = useState(false)

  const onBlur = e => {
    dispatchDirty(true)
    dispatchError(validation(value))
  }

  const onChange = e => {
    const newVal = e.target.value
    dispatchValue(newVal)
    if (dirty) {
      dispatchError(validation(newVal))
    }
  }

  const validate = () => {
    return Promise.resolve(validation(value))
      .then(err => {
        dispatchError(err)
        return !err
      })
  }

  return {
    onChange, onBlur, value, error, dirty, validate
  }
}

export default useField
