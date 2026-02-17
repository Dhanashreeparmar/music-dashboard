import React from 'react'
import SearchBar from './SearchBar'
import Sidebar from './Sidebar'
import MainCard from './maincard'

const MusicDashboard = () => {
  return (
    <>
     <div className=' bg-black pb-20 md:pb-0'>
    <SearchBar />
    <div className='d-flex items-center'>
    <Sidebar />
    <MainCard />
    </div>
    </div>
    </>
  )
}

export default MusicDashboard
