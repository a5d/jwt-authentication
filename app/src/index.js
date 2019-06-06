import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      'auth': false,
      'email': '',
      'password': ''
    }

    this.submitForm = this.submitForm.bind(this)
    this.cancelForm = this.cancelForm.bind(this)
    this.updateInput = this.updateInput.bind(this)
  }

  updateInput(e) {
    this.setState({[e.currentTarget.name]: e.currentTarget.value})
  }

  submitForm(e) {
    e.preventDefault()
    this.setState({'auth': true})
  }

  cancelForm() {
    this.setState({'auth': false})
  }

  render() {
    if (this.state.auth === false) {
      return <div>
        <form onSubmit={this.submitForm}>
          <p><input
            name='email'
            onChange={this.updateInput}
            placeholder='E-mail'
            type="text"
            value={this.state.email}
          />
          </p>
          <p><input
            name='password'
            onChange={this.updateInput}
            placeholder='Пароль'
            type="password"
            value={this.state.password}
          /></p>
          <p>
            <button type="submit">Отправить</button>
          </p>
        </form>
      </div>
    } else {
      return <div>
        <p>Отправлено</p>
        <p>
          <button onClick={this.cancelForm}>Назад</button>
        </p>
      </div>
    }
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))