import React from 'react'
import './Newsletter.css'

const Newsletter = () => {
  return (
    <div className='news-letter'>
          <h1>Get Exclusive Offer On Your Email</h1>
          <p>Subscribe to our newsletter and and stay updated</p>
          <div>
              <input type='email' placeholder='Your Email id' />
              <button>Subscribe</button>
          </div>
    </div>
  )
}

export default Newsletter
