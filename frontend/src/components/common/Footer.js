import React from 'react'
import { Link } from 'react-router-dom'
import Modal from './Modal'

const Footer = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-item">
          <Link to="/about">About</Link>
        </div>
        <div className="navbar-item">
          <Link to="/contacts">Contact Us</Link>
        </div>
        <div className="navbar-item">
          <Modal />
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <span><a href="/admin/" target="_blank">© DANIELITO Corporation</a></span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Footer
