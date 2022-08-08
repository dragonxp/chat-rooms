import { useNavigate, Link } from 'react-router-dom'
import { useCollection } from '../../hooks/useCollection'
import Avatar from '../../components/Avatar'
import { useAuthContext } from '../../hooks/useAuthContext'

// styles
import './Home.css'

export default function Home() {
	const navigate = useNavigate()
	const { isPending, error, documents } = useCollection('chatrooms')
	const { user } = useAuthContext()

	if (isPending) {
		return (
			<div className='home'>
				<p className='loading'>Loading...</p>
			</div>
		)
	}

	return (
		<div className='home'>
			{<h2>Hey, {user.displayName}</h2>}
			<div className='chatroom-list'>
				{documents && documents.map((doc) => (
					<Link to={`/chatroom/${doc.id}`} key={doc.id}>
						<h4>{doc.title}</h4>
						<p>{doc.description}</p>
						<p className='created-by'>created by {doc.createdBy.displayName}</p>
					</Link>
				))}
			</div>

			<button className='btn' onClick={() => navigate('/create')}>Create a Chatroom</button>
		</div>
	)
}