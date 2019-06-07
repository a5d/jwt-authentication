import React, {Component} from 'react'

class LogoutPage extends Component {
  componentDidMount() {
    this.logOut()
  }

  logOut() {
    fetch('http://localhost:3000/api/logout', {
      method: 'POST',
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
      .catch(e => console.error(e));
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