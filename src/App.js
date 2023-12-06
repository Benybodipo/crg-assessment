import React from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom' 
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
