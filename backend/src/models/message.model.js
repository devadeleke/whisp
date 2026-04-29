import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    text: {
        type: String,
        trim: true,
        maxlength: 2000
    },
    image: {
        type: String
    },

}, { timestamps: true })


//Add schema-level validation to prevent blank messages.
messageSchema.pre("validate", function (next) {
    if (!this.text?.trim() || !this.image) {
        this.invalidate("text", "Message must contain text or image");
    }
    next();
});

const Message = mongoose.model('Message', messageSchema);
export default Message;