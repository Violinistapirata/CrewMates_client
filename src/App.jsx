import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route} from 'react-router-dom';

//pages
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import UserPage from './pages/UserPage';
import GroupPage from './pages/GroupPage';
import UserSettingsPage from './pages/UserSettingsPage';
import GroupSettingsPage from './pages/GroupSettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />

      <Routes>
        <Route 
          path="/" 
          element={<LandingPage/>} />
        <Route 
          path="/sign-up" 
          element={<SignUpPage/>} />
        <Route 
          path="/users/:userId" 
          element={<UserPage/>} />
        <Route 
          path="/groups/:groupId" 
          element={<GroupPage/>} />
        <Route 
          path="/settings/users/:userId" 
          element={<UserSettingsPage/>} />
        <Route 
          path="/settings/groups/:groupId" 
          element={<GroupSettingsPage/>} />
        <Route 
          path="*" 
          element={<NotFoundPage/>} />  
      </Routes>

      <Footer />
    </>
  )
}

export default App
