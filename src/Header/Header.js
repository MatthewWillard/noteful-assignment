import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
    return(
        <Link to='/' className="header">Noteful</Link>
    )
}

export default Header