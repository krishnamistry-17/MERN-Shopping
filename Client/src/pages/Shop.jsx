import React from 'react'
import Hero from '../components/Hero/Hero'
import Popular from '../components/Popular/Popular'
import Offers from '../components/Offers/offers'
import NewCollection from '../components/NewCollection/NewCollection'
import Newsletter from '../components/NewsLetter/Newsletter'


const Shop = () => {
//   const [auth,setAuth]=useAuth()
  return (
    <div>
      
      <Hero />
      <Popular />
      <Offers />
      <NewCollection />
      <Newsletter/>
    </div>
  )
}

export default Shop
