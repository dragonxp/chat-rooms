import { Link, useNavigate } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

// styles and assets
import './Navbar.css'
import Chat from '../assets/chat.svg'

export default function Navbar() {
    const { isPending, logout } = useLogout()
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const handleLogout = (e) => {
        e.preventDefault()
        logout()
    }

    const handleClick = (e) => {
        e.preventDefault()
        navigate('/')
    }

    return (
        <div className='navbar'>
            <ul>
                <li className='logo' onClick={handleClick}>
                    <img width="50" height="50" src={Chat} alt="site logo" />
                    <span>Chat Room</span>
                </li>

                {!user && (
                    <>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/signup'>Signup</Link></li>
                    </>
                )}

                {user && (
                    <li>
                        {isPending && <button className='btn' disabled>Logging out..</button>}
                        {!isPending && <button className='btn' onClick={handleLogout}>Logout</button>}
                    </li>
                )}
            </ul>
        </div>
    )
}