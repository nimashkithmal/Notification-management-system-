import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import AddNotification from './components/AddNotification';
import NotificationDisplay from './components/NotificationDisplay';
import UpdateNotification from './components/UpdateNotification';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/add" element={<AddNotification />} />
                        <Route path="/notifications" element={<NotificationDisplay />} />
                        <Route path="/update/:id" element={<UpdateNotification />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;