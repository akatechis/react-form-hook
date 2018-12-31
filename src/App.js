import React, { Component } from 'react'
import Form from './Form'

class App extends Component {
  submitForm = form => {
    console.log('Form submitted')
    console.log(form)
  }

  render() {
    return (
      <div style={{ margin: '2em' }}>
        <header>
          <h1>Please fill out the form below</h1>
        </header>
        <Form onSubmit={this.submitForm} />
      </div>
    )
  }
}

export default App
