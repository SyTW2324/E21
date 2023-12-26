import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: {
        type: String,
        required: true,
        minlength: 3
    },
    userName: {
        type: String,
        required: true,
        minlength: 3
    }
});

const CommentModel = mongoose.model('Comment', commentSchema);

export default CommentModel;