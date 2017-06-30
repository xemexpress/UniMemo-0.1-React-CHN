import React from 'react'
import { Link } from 'react-router'

const LoggedOutView = props => {
  if(!props.currentUser){
    return (
      <ul className='nav navbar-nav pull-xs-right'>
        <li className='nav-item'>
          <Link to='login' className='nav-link'>
            登入
          </Link>
        </li>

        <li className='nav-item'>
          <Link to='register' className='nav-link'>
            註冊
          </Link>
        </li>
      </ul>
    )
  }
  return null
}

class LoggedInView extends React.Component {
  constructor(){
    super()
    this.state = {
      expanded: false
    }

    this.handleExpand = ev => {
      ev.preventDefault()
      if(this.state.expanded){
        this.setState({ expanded: false })
      }else{
        this.setState({ expanded: true })
      }

      setTimeout(()=>{
        this.setState({ expanded: false })
      }, 10000)
    }
  }

  componentDidMount(){
    document.addEventListener('wheel', ev => {
      if(this.state.expanded){
        this.setState({ expanded: false })
      }
    })
  }

  render(){
    if(this.props.currentUser){
      return (
        <ul id='myTopNav' className={this.state.expanded ? 'nav navbar-nav pull-xs-right topnav expanded' : 'nav navbar-nav pull-xs-right topnav'}>
          <li className='nav-item'>
            <Link to='/' className='nav-link'>
              主頁
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='requestEditor' className='nav-link'>
              <i className='ion-compose'></i>&nbsp;散出委託
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='giftEditor' className='nav-link'>
              <i className='ion-android-happy'></i>&nbsp;分享順便
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='settings' className='nav-link'>
              <i className='ion-gear-a'></i>&nbsp;個人資料
            </Link>
          </li>

          <li className='nav-item'>
            <Link to={`@${this.props.currentUser.username}/taken`} className='nav-link'>
              <img
                className='user-pic'
                src={this.props.currentUser.proPic || 'https://photouploads.com/images/350646.png'}
                alt={this.props.currentUser.username} />
              {this.props.currentUser.username}
            </Link>
          </li>

          <li className='nav-item nav-link icon' onClick={this.handleExpand}>
            {
              this.state.expanded ?
              <i className='ion-close-round'></i>
              // <span>&#9747;</span>  // Cross
              :
              <i className='ion-navicon-round'></i>
              // <span>&#9776;</span>  // Burger Bar
            }
          </li>

        </ul>
      )
    }
    return null
  }
}

const Header = props => {
  return (
    <nav className='navbar navbar-sticky-top navbar-light'>
      <div className='container'>

        <Link to='/' className='navbar-brand'>
          {props.appName}
        </Link>

        <LoggedOutView currentUser={props.currentUser} />
        <LoggedInView currentUser={props.currentUser} />

      </div>
    </nav>
  )
}

export default Header
