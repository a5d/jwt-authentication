import React, {ChangeEvent, Component, FormEvent} from 'react';
import validateEmail from '../service/validateEmail';

/**
 * Параметры компонента
 */
export interface IPropsWithData {
  logIn?: () => void;
  auth?: boolean;
  complete?: boolean;
  submitForm?: () => void;
  updateInput?: () => void;
}

/**
 * Состояние компонента
 */
export interface IStateWithData {
  email?: string;
  password?: string;
  error?: string;
  emailError?: string;
  passwordError?: string;
  complete?: boolean;
}

export interface IPageWithData {
  submitForm: (event: FormEvent<HTMLFormElement>) => void;
  updateInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const withData = (View: React.ComponentType<IPageWithData>, getService: (payload: object) => Promise<{error: string}>) => {

  class ComponentWithData extends Component<IPropsWithData, IStateWithData> {
    constructor(props: IPropsWithData) {
      super(props);

      this.state = {
        complete: false,
        email: '',
        emailError: '',
        error: '',
        password: '',
        passwordError: '',

      };
    }

    updateInput = (e: ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.currentTarget;
      this.setState({[name]: value});
    }

    validateForm = () => {
      const {email, password} = this.state;
      let sendForm = true;

      if (email) {
        if (!validateEmail(email)) {
          this.setState({emailError: 'Wrong email'});
          sendForm = false;
        } else {
          this.setState({emailError: ''});
        }
      }

      if (password) {
        if (password.length < 5 || password.length > 10) {
          this.setState({passwordError: 'Wrong password length 5-10'});
          sendForm = false;
        } else {
          this.setState({passwordError: ''});
        }
      }

      return sendForm;
    }

    submitForm = (e: FormEvent<HTMLFormElement>) => {
      const {email, password} = this.state;
      const {logIn} = this.props;

      e.preventDefault();

      if (this.validateForm()) {
        getService({email, password})
          .then(data => {
            if (data.error) {
              this.setState({error: data.error});
            } else {
              logIn();
              this.setState({complete: true});
            }
          });
      }
    }

    render() {
      return (
        <View
          submitForm={this.submitForm}
          updateInput={this.updateInput}
          {...this.props}
        />
      );
    }
  }

  return ComponentWithData;
};
