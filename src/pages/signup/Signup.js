import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

// styles
import './Signup.css'

export default function Signup() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [displayName, setDisplayName] = useState('')
	const [thumbnail, setThumbnail] = useState('')
	const [thumbnailError, setThumbnailError] = useState(null)

	const { isPending, error, signup } = useSignup()
	
	const handleSubmit = (e) => {
		e.preventDefault()
		signup(email, password, displayName, thumbnail)
	}

	const handleFileChange = (e) => {
		setThumbnailError(null)
        let imgFile = e.target.files[0]

        if (!imgFile) return setThumbnailError('Please select a file')
        if (!imgFile.type.includes('image')) return setThumbnailError('Selected File must be an image')
        if (imgFile.size > 102400) return setThumbnailError('File size must not exceed 100KB')

        setThumbnailError(null)
        setThumbnail(imgFile)
        console.log('thumbnail updated', imgFile)
	}

	return (
		<form className='auth-form' onSubmit={handleSubmit}>
			<h2>Signup</h2>
			<label>
				<span>Email</span>
				<input 
					type="email" 
					required
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
			</label>
			<label>
				<span>Password</span>
				<input 
					type="password" 
					required
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
			</label>
			<label>
				<span>Display Name</span>
				<input 
					type="text" 
					required
					onChange={(e) => setDisplayName(e.target.value)}
					value={displayName}
				/>
			</label>
			<label>
				<span>Profile Thumbnail</span>
				<input 
					type="file" 
					required
					onChange={handleFileChange}
				/>
				{thumbnailError && <p className='error'>{thumbnailError}</p>}
			</label>
			{isPending && <button className='btn' disabled>Signing up..</button>}
			{!isPending && <button className="btn">Signup</button>}
			{error && <p className='error'>{error}</p>}
		</form>
	)
}