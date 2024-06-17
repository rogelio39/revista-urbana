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

    useEffect(() => {

        const getComments = async () => {
            const fetchComments = await comments(news_id);
            if (fetchComments) {
                setAllComments(fetchComments)
            }
        }

        getComments();

    }, [allComents])



    const handleComments = async (e) => {
        e.preventDefault();
        const userData = localStorage.getItem('user');
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
            <form ref={formRef} onSubmit={handleComments} className='bg-slate-400 flex flex-col p-2 max-w-screen-lg mb-2'>
                <label htmlFor="comentarios">Deja tu comentario</label>
                <textarea ref={textAreaRef} name="comentarios" id="comentarios"></textarea>
                <button className="bg-slate-200 w-32 rounded m-auto mt-2 hover:bg-slate-900 hover:text-white hover:border-2 hover:border-slate-100" type="submit">ENVIAR COMENTARIO</button>
            </form>
            <strong className="m-auto p-1">COMENTARIOS</strong>

            {
                allComents && (
                    allComents.map((comment) =>
                    (<div className="rounded bg-slate-200 mb-3 p-1 border-2 border-slate-500" key={comment._id}>
                        <strong>fecha: {comment.created_at.split('T')[0]}</strong>
                        <p className="bg-slate-200 font-bold p-1 rounded">Usuario: {comment.user_id ? `${comment.user_id.first_name} ${comment.user_id.last_name}` : 'Usuario desconocido'}</p>
                        <p className="ml-4 bg-slate-300 border-2 border-blue-300 p-1 rounded">{comment.comments}</p>
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