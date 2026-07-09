import React from 'react'
import investmentlogo from '../images/investmentlogo.png'
import '../index.css'

export const Header = () => {
  return (
    <header>
        <img src={investmentlogo} id='headerImg' className='header' alt="logo" />
        <h1>Meet your Financial InvestMate</h1>

    </header>
  )
}
