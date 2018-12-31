import React from 'react'
import Field from './Field'

const dateRegex = /([0-9]{4})-([0-9]{2})-([0-9]{2})/

class Form extends React.Component {
  state = {
    name: this.props.name || '',
    nameValid: true,
    nameMessage: '',
    nameDirty: false,

    dateOfBirth: this.props.dateOfBirth || '',
    dateOfBirthValid: true,
    dateOfBirthMessage: '',
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

  // a name is valid if it's a string that has a first and last name
  isNameValid (name) {
    if (typeof name !== 'string') {
      this.setState({
        nameMessage: 'Please enter your full name',
        nameValid: false
      })
      return false
    }
    if (name.trim().indexOf(' ') === -1) {
      this.setState({
        nameMessage: 'Please enter both first and last name',
        nameValid: false
      })
      return false
    }
    this.setState({ nameMessage: '', nameValid: true })
    return true
  }

  // a date of birth is valid if it's YYYY-MM-DD and in the past
  isDateOfBirthValid (dateOfBirth) {
    const match = dateOfBirth.match(dateRegex)
    if (!match) {
      this.setState({
        dateOfBirthMessage: 'Please enter your date of birth in YYYY-MM-DD format',
        dateOfBirthValid: false
      })
      return false
    }
    const [, y, m, d] = match
    const dt = new Date(Number(y), Number(m) - 1, Number(d))

    // catches dates that roll over, eg 2010-55-99 => 2014-10-07
    if (dt.toISOString().slice(0,10) !== dateOfBirth) {
      this.setState({
        dateOfBirthMessage: 'The date entered is not valid',
        dateOfBirthValid: false
      })
      return false
    }
    if (dt >= new Date()) {
      this.setState({
        dateOfBirthMessage: 'Your date of birth must be in the past',
        dateOfBirthValid: false
      })
      return false
    }
    this.setState({ dateOfBirthMessage: '', dateOfBirthValid: true })
    return true
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
          valid={this.state.nameValid} message={this.state.nameMessage} />
        <Field label='Date of Birth'
          placeholder='YYYY-MM-DD'
          value={this.state.dateOfBirth}
          onChange={this.updateDateOfBirth}
          onBlur={this.onDateOfBirthBlur}
          valid={this.state.dateOfBirthValid} message={this.state.dateOfBirthMessage} />
        <input type='submit' value='Submit' />
      </form>
    )
  }
}

export default Form
