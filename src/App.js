import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// styles
import './App.css'

// pages and components
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Chatroom from './pages/chatroom/Chatroom'
import Navbar from './components/Navbar'

function App() {
	const { user, isAuthReady } = useAuthContext()

	return (
		<div className="App">
			{isAuthReady && (
				<BrowserRouter>
					<div className="container">
						<Navbar />
						<Routes>
							<Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
							<Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
							<Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
							<Route path='/chatroom/:id' element={user ? <Chatroom /> : <Navigate to='/login' />} />
						</Routes>
					</div>
				</BrowserRouter>
			)}
		</div>
	);
}

export default App
