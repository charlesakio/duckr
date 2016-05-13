import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { container, navContainer, link } from './styles.css'

Navigation.propTypes = ActionLinks.propTypes = NavLinks.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
}

function NavLinks ({isAuthed}) {
  return isAuthed === true
  ? <ul>
      <li><Link className={link} to='/'>{'Home'}</Link></li>
    </ul>
  : <noscript />
}

function ActionLinks ({isAuthed}) {
  return isAuthed === true
  ? <ul>
      <li>NEW DUCK</li>
      <li><Link to='/logout' className={link}>{'Logout'}</Link></li>
    </ul>
  : <ul>
      <li><Link className={link} to='/' className={link}>{'Home'}</Link></li>
      <li><Link className={link} to='/auth' className={link}>{'Authenticated'}</Link></li>
    </ul>
}

export default function Navigation ({isAuthed}) {
  return (
    <div className={container}>
      <nav className={navContainer}>
        <NavLinks isAuthed={isAuthed} />
        <ActionLinks isAuthed={isAuthed} />
      </nav>
    </div>
  )
}
