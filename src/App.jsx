import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import BookingForm from './components/BookingForm';
import './index.css';
import Home from './pages/home';

function App() { 
  const [user, setUser] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [availableCars, setAvailableCars] = useState([]);
  
  useEffect(() => {
    axios.get('/vehicle-reservation-system/api/customers/')
      .then(response => setCustomers(response.data))
      .catch(error => console.error('Error fetching customers:', error));
  }, []);

  useEffect(() => {
    axios.get('/vehicle-reservation-system/api/cars/available')
      .then(response => setAvailableCars(response.data))
      .catch(error => console.error('Error fetching cars:', error));
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/admin" element={<AdminDashboard customers={customers} />} />
          <Route path="/book" element={<BookingForm availableCars={availableCars} />} />
          <Route path="/profile" element={<Profile user={user} />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

