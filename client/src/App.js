import React, { Fragment, useState, useEffect  } from "react";
import './App.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

// Components
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {

const [isAuthenticated, setIsAuthenticated] =useState(false);

const setAuth = (boolean) =>{
  setIsAuthenticated(boolean);
}

async function isAuth(){
  try {
    const response = await fetch("http://localhost:5000/auth/is-verify", {
      method: "GET",
      headers: {token: localStorage.token}
    });

    const parseRes = await response.json();

    parseRes === true ? setIsAuthenticated(true): setIsAuthenticated(false);
    
  } catch (err) {
    console.error(err.message)
  }
}

useEffect(()=>{
  isAuth();
})

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" /> } />
            <Route path="/register" element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/login" /> } />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
