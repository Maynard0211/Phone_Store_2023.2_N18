import React from 'react'
import Banner from '../Components/Banner/Banner'
import Popular from '../Components/Popular/Popular'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import MenuBottomTabs from '../Components/MenuBottomTabs/MenuBottomTabs'

import './CSS/Home.css'

function Home() {
  return (
    <div className='home'>
      <Banner />
      <NewCollections />
      <Popular category={1} />
      <Popular category={2} />
      <NewsLetter />
      <MenuBottomTabs active={'Home'} />
    </div>
  )
}

export default Home