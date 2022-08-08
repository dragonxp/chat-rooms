import { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'

// styles
import './Create.css'

export default function Create() {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const navigate = useNavigate()
	const { user } = useAuthContext()
	const { addDocument, response } = useFirestore()

	const handleSubmit = (e) => {
		e.preventDefault()
		const createdBy = {
			displayName: user.displayName,
			photoURL: user.photoURL,
			id: user.uid
		}

		addDocument({ title, description, createdBy, comments: [] })
	}

	useEffect(() => {
		if (response.success) {
			console.log(response.document)
			navigate('/')
		}
	}, [response.success])

	return (
		<form className='create-form' onSubmit={handleSubmit}>
			<h2 className='page-title'>Create a Chat room</h2>
			<label>
				<span>Chat room Title</span>
				<input
					type="text"
					required
					onChange={(e) => setTitle(e.target.value)}
					value={title}
				/>
			</label>
			<label>
				<span>Chat room Description</span>
				<textarea
					required
					onChange={(e) => setDescription(e.target.value)}
					value={description}
				></textarea>
			</label>
			{response.isPending && <button className='btn' disabled>Creating Room..</button>}
			{!response.isPending && <button className='btn'>Create Room</button>}
			{response.error && <p className='error'>{response.error}</p>}
		</form>
	)
}