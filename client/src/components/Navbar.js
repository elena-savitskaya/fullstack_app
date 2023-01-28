import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    navigate('/')
  }

  return (
    <nav>
      <div className="nav-wrapper cyan darken-1" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">Profile</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to="/create">Tasks</NavLink></li>
          <li><NavLink to="/links">Calendar</NavLink></li>
          <li><NavLink to="/links">Files</NavLink></li>
          <li><a href="/" onClick={logoutHandler}>Sign out</a></li>
        </ul>
      </div>
    </nav>
  )
}
