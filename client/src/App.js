import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Account from './Components/Account/Account'
import FavoriteList from './Components/FavoriteList/FavoriteList'
import Home from './Components/Home/Home'
import MediaDetail from './Components/MediaDetail/MediaDetail'
import MediaList from './Components/MediaList/MediaList'
import Navbar from './Components/Navbar/Navbar'
import NotFound from './Components/NotFound/NotFound'
import Person from './Components/Person/Person'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/media/:mediaType' element={<MediaList />} />
        <Route path='/media/:mediaType/:mediaId' element={<MediaDetail />} />
        <Route path='/media/person/:id' element={<Person />} />
        <Route path='/favorites' element={<FavoriteList />} />
        <Route path='/account' element={<Account />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
