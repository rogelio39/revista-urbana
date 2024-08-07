import { useContext, useEffect, useRef, useState } from "react"
import { CommentContext } from "../../context/CommentsContext";
import getCookiesByName from "../../utils/utils";
import PropTypes from 'prop-types'


const Comments = ({ news_id }) => {
    // const [newComment, setNewComment] = useState([]);
    const formRef = useRef();
    const { comments, createComments } = useContext(CommentContext);
    const [allComents, setAllComments] = useState([]);
    const textAreaRef = useRef()
    const [error, setError] = useState('')
    const [updateComment, setUpdateComment] = useState(false)
    useEffect(() => {
        const getComments = async () => {
            const fetchComments = await comments(news_id);
            setUpdateComment(true)
            if (fetchComments) {
                setAllComments(fetchComments)
            }
        }

        getComments();

    }, [updateComment])


    const updateComments = () => {
        setUpdateComment(!updateComment)
    }


    const handleComments = async (e) => {
        e.preventDefault();
        const userData = localStorage.getItem('user');
        if (!userData) {
            setError('No estas registrado, no puedes comentar. Si quieres dejar tu comentario registrate')
            return
        }
        const user = JSON.parse(userData)
        const token = getCookiesByName('jwtCookie');
        const formData = new FormData(formRef.current)
        const data = Object.fromEntries(formData);
        if (data) {
            const newsComment = await createComments(news_id, user._id, data.comentarios, token);
            if (newsComment) {
                textAreaRef.current.value = ''
            }
        }
    }

    return (
        <>
            {
                error ? (<p className="bg-red-300 p-1 rounded text-center mb-16">{error}</p>) : <form ref={formRef} onSubmit={handleComments} className='bg-indigo-400 flex flex-col p-2 max-w-screen-lg mt-4 mb-16'>
                    <label htmlFor="comentarios">Deja tu comentario</label>
                    <textarea ref={textAreaRef} name="comentarios" id="comentarios"></textarea>
                    <button onClick={updateComments} className="bg-indigo-200 w-32 rounded m-auto mt-2 hover:bg-indigo-900 hover:text-white hover:border-2 hover:border-indigo-100" type="submit">ENVIAR COMENTARIO</button>
                </form>
            }


            {
                allComents && (
                    allComents.map((comment) =>
                    (<div className="bg-indigo-200 p-1 m-2 border-2  border-indigo-500" key={comment._id}>
                        <p>Usuario: {comment.user_id ? `${comment.user_id.first_name} ${comment.user_id.last_name}` : 'Usuario desconocido'}</p>
                        <p>{comment.comments}</p>
                    </div>)
                    )
                )
            }

        </>

    )
}


Comments.propTypes = {
    news_id: PropTypes.string
}

export default Comments
