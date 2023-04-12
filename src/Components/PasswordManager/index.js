import {Component} from 'react'
import {v4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    showPassword: false,
    searchPassword: '',
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  deletePassword = id => {
    const {passwordsList} = this.state
    const updatedPasswordList = passwordsList.filter(
      eachPassword => id !== eachPassword.id,
    )

    this.setState({passwordsList: updatedPasswordList})
  }

  onClickAddButton = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state

    const newPassword = {
      id: v4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onChangeSearchPassword = event => {
    event.preventDefault()
    const {passwordsList} = this.state
    const updatedList = passwordsList.filter(
      eachPassword =>
        event.target.value.toLowerCase() === eachPassword.website.toLowerCase(),
    )

    this.setState({
      searchPassword: event.target.value,
      passwordsList: updatedList,
    })
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  render() {
    const {
      passwordsList,
      websiteInput,
      usernameInput,
      passwordInput,
      showPassword,
      searchPassword,
    } = this.state

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="password-manager-container">
          <form
            className="add-password-container"
            onSubmit={this.onClickAddButton}
          >
            <h1 className="heading">Add New Password</h1>
            <div className="input-container">
              <div className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="icon"
                />
              </div>
              <input
                type="text"
                value={websiteInput}
                onChange={this.onChangeWebsiteInput}
                placeholder="Enter Website"
              />
            </div>
            <div className="input-container">
              <div className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="icon"
                />
              </div>
              <input
                type="text"
                value={usernameInput}
                onChange={this.onChangeUsernameInput}
                placeholder="Enter Username"
              />
            </div>
            <div className="input-container">
              <div className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="icon"
                />
              </div>
              <input
                type="password"
                value={passwordInput}
                onChange={this.onChangePasswordInput}
                placeholder="Enter Password"
              />
            </div>
            <div className="button-container">
              <button type="submit" className="add-button">
                Add
              </button>
            </div>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="image"
          />
        </div>
        <div className="password-show-container">
          <div className="header-container">
            <div className="container">
              <h1 className="heading">Your Passwords</h1>
              <div className="span-count">
                <p className="count">{passwordsList.length}</p>
              </div>
            </div>
            <div className="search-container">
              <div className="icon-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="icon"
                />
              </div>
              <input
                type="search"
                value={searchPassword}
                onChange={this.onChangeSearchPassword}
                placeholder="Search"
              />
            </div>
          </div>
          <hr />
          <div className="show-password-container">
            <div className="container">
              <input
                type="checkbox"
                id="showPassword"
                value={showPassword}
                onChange={this.onClickShowPassword}
                className="check-input"
              />
              <label htmlFor="showPassword" className="text">
                Show Passwords
              </label>
            </div>
          </div>
          {passwordsList.length === 0 ? (
            <div className="no-password-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="image"
              />
              <p className="heading">No Passwords</p>
            </div>
          ) : (
            <ul className="passwords-container">
              {passwordsList.map(eachPassword => (
                <PasswordItem
                  key={eachPassword.id}
                  passwordDetails={eachPassword}
                  deletePassword={this.deletePassword}
                  showPassword={this.showPassword}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
