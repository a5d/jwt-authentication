import React, {ChangeEvent, Component, FormEvent} from "react";
import validateEmail from "../service/validateEmail";

export interface Props {
  logIn?: () => void,
  auth?: boolean,
  complete?: boolean,
  submitForm?: () => void,
  updateInput?: () => void
}

export interface State {
  email?: string,
  password?: string,
  error?: string,
  emailError?: string,
  passwordError?: string,
  complete?: boolean
}

export interface Page {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void,
  updateInput: (e: ChangeEvent<HTMLInputElement>) => void,
}

export const withData = (View: React.ComponentType<Props>, getService: (payload: object) => Promise<{error: string}>) => {
  return class extends Component<Props, State> {
    constructor(props: Props) {
      super(props)

      this.state = {
        'email': '',
        'password': '',
        'error': '',
        'emailError': '',
        'passwordError': '',
        'complete': false
      }

      this.submitForm = this.submitForm.bind(this)
      this.updateInput = this.updateInput.bind(this)
      this.validateForm = this.validateForm.bind(this)
    }

    updateInput(e: ChangeEvent<HTMLInputElement>) {
      const {name, value} = e.currentTarget
      this.setState({[name]: value})
    }

    validateForm() {
      const {email, password} = this.state
      let sendForm = true;

      if (email) {
        if (!validateEmail(email)) {
          this.setState({emailError: 'Wrong email'})
          sendForm = false
        } else {
          this.setState({emailError: ''})
        }
      }

      if (password) {
        if (password.length < 5 || password.length > 10) {
          this.setState({passwordError: 'Wrong password length 5-10'})
          sendForm = false
        } else {
          this.setState({passwordError: ''})
        }
      }

      return sendForm
    }

    submitForm(e: FormEvent<HTMLFormElement>) {
      const {email, password} = this.state
      const {logIn} = this.props

      e.preventDefault()

      if (this.validateForm()) {
        getService({email, password})
          .then(data => {
            if (data.error) {
              this.setState({error: data.error})
            } else {
              logIn()
              this.setState({complete: true})
            }
          })
          .catch(console.error)
      }
    }

    render() {
      return <View
        submitForm={this.submitForm}
        updateInput={this.updateInput}
        {...this.props}
      />
    }
  }
}
