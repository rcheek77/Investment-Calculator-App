import React from 'react'
import investmentlogo from '../images/investmentlogo.png'
import '../index.css'

export const Header = ({title ="Meet your Fincnail InvestMate", subtitle="Welcome to the Investment Calculator App"}) => { // default set to prevent the header from being completely blank if you forget to pass a prop
  return (
    <header className='header-container'>
        <img src={investmentlogo} id='headerImg' className='header-logo' alt="logo" />
        <div className='header-text'>
          <h1>{title}</h1>
          <p id='subtitle'>{subtitle}</p>
        </div>

    </header>
  )
}
