import React from 'react';
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import DateYear from './pages/DateYear';
import Profile from "./pages/Profile.js";
import Auth from './Auth'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dateyear' element={<DateYear/>}/>
      <Route path="/oauth" element={<Auth/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
    </>
  );
}

export default App;