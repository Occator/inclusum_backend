const mongoose = require("mongoose");

const uploadAvatarSchema = new mongoose.Schema({
    url: {
    type: String,
    },
    user_id: {
    type: String,
    },
});

module.exports = mongoose.model("uploadAvatar", uploadAvatarSchema);
