import { Routes, Route } from 'react-router'
import SignupPage from './pages/SignupPage'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<ChatPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  )
}

export default App