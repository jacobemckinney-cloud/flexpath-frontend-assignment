import React, { useState } from "react";
import {Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
function App() {
  const [results, setResults] = useState([]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <Link className="navbar-brand ms-4" to ="/">
          User Behavior Data
        </Link>
        <Link className="nav-link text-light" to="/search">
        Search Through Dataset
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route 
          path="/search" 
          element={<Search results={results} setResults={setResults} />}
/>
      </Routes>
    </div>
  );
}

export default App;
