import React, {Component} from 'react'

class LogoutPage extends Component {
  componentDidMount() {
    this.logOut()
  }

  logOut() {
    fetch(process.env.API_URL + 'logout', {
      method: 'POST',
      credentials: "include",
      headers: {'content-type': 'application/json'}
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.error(data.error)
        } else {
          this.props.onLogouted()
        }

      })
      .catch(console.error);
  }

  render() {
    if (this.props.auth === true) {
      return <div>
        <p>Выход...</p>
      </div>
    }

    return <div>
      <p>Вы вышли</p>
    </div>
  }
}

export default LogoutPage
