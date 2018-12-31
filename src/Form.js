import React from 'react'
import Field from './Field'

const dateRegex = /([0-9]{4})-([0-9]{2})-([0-9]{2})/

class Form extends React.Component {
  state = {
    name: this.props.name || '',
    nameError: '',
    nameDirty: false,

    dateOfBirth: this.props.dateOfBirth || '',
    dateOfBirthError: '',
    dateOfBirthDirty: false,
  }

  submitForm = e => {
    e.preventDefault()
    Promise.all([this.isNameValid(this.state.name), this.isDateOfBirthValid(this.state.dateOfBirth)])
    .then(([nameValid, dobValid]) => {
      if (nameValid && dobValid) {
        const form = {
          name: this.state.name,
          dateOfBirth: this.state.dateOfBirth
        }
        this.props.onSubmit(form)
      }
    })
  }

  setNameError (nameError) {
    this.setState({ nameError })
    return !nameError
  }

  // a name is valid if it's a string that has a first and last name
  isNameValid (name) {
    if (typeof name !== 'string') {
      return this.setNameError('Please enter your full name')
    }
    if (name.trim().indexOf(' ') === -1) {
      return this.setNameError('Please enter both first and last name')
    }
    return this.setNameError('')
  }

  setDateOfBirthError (dateOfBirthError) {
    this.setState({ dateOfBirthError })
    return !dateOfBirthError
  }

  // a date of birth is valid if it's YYYY-MM-DD and in the past
  isDateOfBirthValid (dateOfBirth) {
    const match = dateOfBirth.match(dateRegex)
    if (!match) {
      return this.setDateOfBirthError('Please enter your date of birth in YYYY-MM-DD format')
    }
    const [, y, m, d] = match
    const dt = new Date(Number(y), Number(m) - 1, Number(d))

    // catches dates that roll over, eg 2010-55-99 => 2014-10-07
    if (dt.toISOString().slice(0,10) !== dateOfBirth) {
      return this.setDateOfBirthError('The date entered is not valid')
    }
    if (dt >= new Date()) {
      return this.setDateOfBirthError('Your date of birth must be in the past')
    }
    return this.setDateOfBirthError('')
  }

  updateName = e => {
    const name = e.target.value
    this.setState({ name })
    // if the name is dirty, trigger validation
    if (this.state.nameDirty) {
      this.isNameValid(name)
    }
  }

  onNameBlur = e => {
    this.setState({ nameDirty: true })
    this.isNameValid(this.state.name)
  }

  updateDateOfBirth = e => {
    const dateOfBirth = e.target.value
    this.setState({ dateOfBirth })
    if (this.state.dateOfBirthDirty) {
      this.isDateOfBirthValid(dateOfBirth)
    }
  }

  onDateOfBirthBlur = e => {
    this.setState({ dateOfBirthDirty: true })
    this.isDateOfBirthValid(this.state.dateOfBirth)
  }

  render () {
    return (
      <form method='post' onSubmit={this.submitForm}>
        <Field label='Name'
          value={this.state.name}
          onChange={this.updateName}
          onBlur={this.onNameBlur}
          error={this.state.nameError} />
        <Field label='Date of Birth'
          placeholder='YYYY-MM-DD'
          value={this.state.dateOfBirth}
          onChange={this.updateDateOfBirth}
          onBlur={this.onDateOfBirthBlur}
          error={this.state.dateOfBirthError} />
        <input type='submit' value='Submit' style={{ fontSize: '1.5em' }} />
      </form>
    )
  }
}

export default Form
