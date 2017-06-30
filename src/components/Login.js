import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import ListErrors from './common/ListErrors'
import agent from '../agent'

import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes'

const mapStateToProps = state => ({
  ...state.auth
})

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value => dispatch({
    type: UPDATE_FIELD_AUTH,
    key: 'email',
    value
  }),
  onChangePassword: value => dispatch({
    type: UPDATE_FIELD_AUTH,
    key: 'password',
    value
  }),
  onSubmit: (email, password) => dispatch({
    type: LOGIN,
    payload: agent.Auth.login(email, password)
  }),
  onUnload: () => dispatch({
    type: LOGIN_PAGE_UNLOADED
  })
})

class Login extends React.Component {
  constructor(){
    super()
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value)
    this.changePassword = ev => this.props.onChangePassword(ev.target.value)
    this.submitForm = (email, password) => ev => {
      ev.preventDefault()
      this.props.onSubmit(email, password)
    }
  }

  componentWillUnmount(){
    this.props.onUnload()
  }

  render(){
    const email = this.props.email
    const password = this.props.password

    return (
      <div className='auth-page'>
        <div className='container page'>
          <div className='row'>
            <div className='col-md-6 offset-md-3 col-xs-12'>

              <h1 className='text-xs-center'>
                登入
              </h1>

              <p className='text-xs-center'>
                <small>未註冊？</small>
                <Link to='register'>
                  立即註冊
                </Link>
              </p>

              <ListErrors errors={this.props.errors} />

              <form onSubmit={this.submitForm(email, password)}>
                <fieldset>

                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      type='email'
                      placeholder='電子郵件'
                      value={email}
                      onChange={this.changeEmail} />
                  </fieldset>

                  <fieldset className='form-group'>
                    <input
                      className='form-control form-control-lg'
                      type='password'
                      placeholder='密碼'
                      value={password}
                      onChange={this.changePassword} />
                  </fieldset>

                  <button
                    className='btn btn-lg btn-primary pull-xs-right'
                    type='submit'
                    disabled={this.props.inProgress}>
                    登入
                  </button>

                </fieldset>
              </form>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
