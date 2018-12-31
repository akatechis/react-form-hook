import React from 'react'
import Field from './Field'
import useField from './hooks/useField'

const dateRegex = /([0-9]{4})-([0-9]{2})-([0-9]{2})/
const incomeRegex = /^[0-9]+(\.[0-9]{2})?$/

// a date of birth is valid if it's YYYY-MM-DD and in the past
const isDateOfBirthValid = dateOfBirth => {
  const match = dateOfBirth.match(dateRegex)
  if (!match) {
    return 'Please enter your date of birth in YYYY-MM-DD format'
  }
  const [, y, m, d] = match
  const dt = new Date(Number(y), Number(m) - 1, Number(d))

  // catches dates that roll over, eg 2010-55-99 => 2014-10-07
  if (dt.toISOString().slice(0,10) !== dateOfBirth) {
    return 'The date entered is not valid'
  }
  if (dt >= new Date()) {
    return 'Your date of birth must be in the past'
  }
  return ''
}

const isNameValid = name => {
  if (typeof name !== 'string') {
    return 'Please enter your full name'
  }
  if (name.trim().indexOf(' ') === -1) {
    return 'Please enter both first and last name'
  }
  return ''
}

const isIncomeValid = income => {
  if (typeof income !== 'string') {
    return 'Please enter your yearly income'
  }
  if (!incomeRegex.test(income)) {
    return 'Please enter only the amount'
  }
  return ''
}

const Form = props => {
  const dobField = useField(props.dateOfBirth || '', isDateOfBirthValid)
  const nameField = useField(props.name || '', isNameValid)
  const incomeField = useField(props.income || '', isIncomeValid)

  const submitForm = e => {
    e.preventDefault()
    return Promise.all([
      nameField.validate(),
      dobField.validate(),
      incomeField.validate(),
    ])
    .then(([nameValid, dobValid]) => {
      if (nameValid && dobValid) {
        const form = {
          name: nameField.value,
          dateOfBirth: dobField.value,
          income: incomeField.value,
        }
        props.onSubmit(form)
      }
    })
  }

  return (
    <form method='post' onSubmit={submitForm}>
      <Field label='Name'
        value={nameField.value}
        onChange={nameField.onChange}
        onBlur={nameField.onBlur}
        error={nameField.error} />
      <Field label='Income'
        value={incomeField.value}
        onChange={incomeField.onChange}
        onBlur={incomeField.onBlur}
        error={incomeField.error} />
      <Field label='Date of Birth'
        placeholder='YYYY-MM-DD'
        value={dobField.value}
        onChange={dobField.onChange}
        onBlur={dobField.onBlur}
        error={dobField.error} />
      <input type='submit' value='Submit' style={{ fontSize: '1.5em' }} />
    </form>
  )
}


export default Form
