import React from 'react';
import{ BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import CodeReview from './pages/Code-Review.jsx';
import Notes from './pages/Notes.jsx';  

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="code-review" element={<CodeReview />} />
          <Route path="notes" element={<Notes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
