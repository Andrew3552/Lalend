import React from 'react'
import Logo from '../../assets/IMG/Logo.png'

import './Header.scss'

function Header() {
  return (
    <div>
        <img className='logo' src={Logo} alt="logo" />
    </div>
  )
}

export default Header