import { useEffect, useState } from 'react'
import { useFirestore } from '../../hooks/useFirestore'
import { Timestamp } from 'firebase/firestore'
import { useAuthContext } from '../../hooks/useAuthContext'

export default function ChatForm({ documents, id }) {
    const [comment, setComment] = useState('')
    const { updateDocument, response } = useFirestore()
    const { user } = useAuthContext()

    useEffect(() => {
        if (response.success) {
            setComment('')
        }
    }, [response.success])

    const handleSubmit = (e) => {
        e.preventDefault()

        const author = {
            displayName: user.displayName,
            uid: user.uid,
            photoURL: user.photoURL
        }
        const commentToAdd = {
            content: comment,
            author,
            id: Math.random(),
            createdAt: Timestamp.now()
        }

        const path = `chatrooms/${id}`
        updateDocument(path, {
            comments: [...documents.comments, commentToAdd]
        })
    }

    return (
        <form className='comment-form' onSubmit={handleSubmit}>
            <label>
                <textarea
                    required
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                ></textarea>
            </label>
            {response.isPending && <button className='btn' disabled>Adding Comment..</button>}
            {!response.isPending && <button className='btn'>Add Comment</button>}
            {response.error && <p className='error'>{response.error}</p>}
        </form>
    )
}