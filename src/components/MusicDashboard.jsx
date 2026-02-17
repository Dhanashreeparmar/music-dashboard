import React from 'react'
import SearchBar from './SearchBar'
import Sidebar from './Sidebar'
import MainCard from './maincard'

const MusicDashboard = () => {
  return (
    <div className="bg-black pb-20 md:min-h-screen md:pb-0">
      <SearchBar />
      <div className="md:flex md:items-start">
        <Sidebar />
        <div className="flex-1">
          <MainCard />
        </div>
      </div>
    </div>
  )
}

export default MusicDashboard
