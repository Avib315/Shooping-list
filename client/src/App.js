import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react"
import ListDisplay from './Pages/ListDisplay';
import OrderFrom from './Pages/OrderForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderComplete from './Pages/OrderComplete';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListDisplay />} />
        <Route path="/order" element={<OrderFrom />} />
        <Route path="/orderFinish" element={<OrderComplete />} />
      </Routes>
    </Router>
  );
}

export default App;