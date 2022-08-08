import { useParams } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import { useDocument } from '../../hooks/useDocument'
import ChatForm from './ChatForm'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

// styles
import './Chatroom.css'

export default function Chatroom() {
    const { id } = useParams()
    const { isPending, error, documents } = useDocument('chatrooms', id)

    return (
        <div className='chatroom'>
            {isPending && <p className='loading'>Loading Comments...</p>}
            {error && <p className='error'>{error}</p>}
            {documents && (
                <div className='comments'>
                    {!documents.comments.length && <p>No comments to show yet !</p>}
                    <ul>
                        {documents.comments.length !== 0 && documents.comments.map((comment) => (
                            <li key={comment.id}>
                                <div className='comment-author'>
                                    <Avatar src={comment.author.photoURL} />
                                    <p>{comment.author.displayName}</p>
                                </div>
                                <div className='comment-date'>
                                    <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}</p>
                                </div>
                                <div className='comment-content'>
                                    <p>{comment.content}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <ChatForm documents={documents} id={id} />
        </div>
    )
}