import { commentModels } from "../models/comments.models.js";
import { usersModels } from "../models/users.models.js";
import { resend } from "../config/resend.js";

export const getComments = async (req, res) => {
    const { id } = req.params

    try {

        const comments = await commentModels.find({ news_id: id }).populate('user_id');
        if (!comments) {
            return res.status(404).json({ message: "error al buscar comentarios" })
        }

        res.status(200).json(comments);

    } catch (error) {
        console.error("error al obtener los comentarios", error);
        res.status(500).json({ message: "error en el servidor", error: error });
    }
}

export const addComment = async (req, res) => {

    const { id } = req.params;
    const { comments, user_id } = req.body
    try {
        const newComment = await commentModels.create({
            news_id: id,
            user_id: user_id,
            comments: comments
        });
        if (!newComment) {
            return res.status(404).json({ message: "error al crear comentario" })
        }

        const user = await usersModels.findById({ _id: user_id });
        if (user) {
            const email = user.email;
            if (email) {
                const {data, error} = await resend.emails.send({
                    from: 'Acme <bandadelriosali@revista-urbana.com>',
                    to: [`${email}`],
                    subject: 'NOVEDADES',
                    html: '<strong>¿Quieres recibir nuestras ultimas noticias a diario?</strong>',
                });

                if(error){
                    console.log("error en resend", {error})
                }

                console.log("data en resend",{data})
            }
        }

        res.status(200).json(newComment);
    } catch (error) {
        console.error("error al crear comentario", error)
        res.status(500).json({ message: "error en el servidor", error: error });
    }
}

export const deleteComments = async (req, res) => {
    const { id } = req.params;

    try {
        const comment = await commentModels.findByIdAndDelete(id);
        if (!comment) {
            res.status(404).json({ message: "error al eliminar comentario" })
        }

        res.status(200).json({ message: "mensaje eliminado correctamente" });

    } catch (error) {
        res.status(500).json({ message: "error en el servidor", error: error });
    }
}






