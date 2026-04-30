import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { Toaster } from 'react-hot-toast'

import { useAuthStore } from './store/useAuthStore'
import SignupPage from './pages/SignupPage'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import Loader from './components/Loader'

const App = () => {
  const { isCheckingAuth, checkAuth, authUser } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [])

  if (isCheckingAuth) return <Loader />
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden" style={{ background: '#050f08' }} >

      {/* DOT GRID */}
      <div className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(80,220,120,0.13) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />

      {/* FOREST GREEN ORB — top left */}
      <div className="absolute rounded-full pointer-events-none"
          style={{
            width: 380, height: 380,
            background: 'rgba(10, 160, 80, 0.32)',
            filter: 'blur(90px)',
            top: -110, left: -90,
          }} />

          {/* EMERALD ORB — bottom right */}
          <div className="absolute rounded-full pointer-events-none"
              style={{
                width: 300, height: 300,
                background: 'rgba(0, 210, 120, 0.22)',
                filter: 'blur(90px)',
                bottom: -70, right: '4%',
              }} />

          {/* JADE ORB — mid right */}
          <div className="absolute rounded-full pointer-events-none"
              style={{
                width: 230, height: 230,
                background: 'rgba(30, 180, 60, 0.20)',
                filter: 'blur(90px)',
                top: '30%', left: '52%',
              }} />

          {/* MINT ORB — bottom left */}
          <div className="absolute rounded-full pointer-events-none"
              style={{
                width: 180, height: 180,
                background: 'rgba(100, 255, 150, 0.12)',
                filter: 'blur(90px)',
                bottom: '12%', left: '18%',
              }} />

          {/* VIGNETTE */}
          <div className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 35%, rgba(2,8,4,0.70) 100%)',
              }} />

      <Routes>
        <Route path='/' element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to={"/"} />} />
      </Routes>

      <Toaster />
    </div>
  )
} 

export default App