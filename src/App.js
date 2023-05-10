import React from 'react';
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import DateYear from './pages/DateYear';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dateyear' element={<DateYear/>}/>
    </Routes>
    </>
  );
}

export default App;