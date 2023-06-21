const uploadAvatar = require('../schemas/UploadAvatar');

const getAvatar = async (req, res) => {
    try {
        const avatar = User.find();
        return res.status(200).json({avatar});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error});
    }
    };

const uploadAvatarImage = async (req, res) => {
    try {
    if (req.file && req.file.path) {
    const user_id = req.user._id;
    const image = new Image({
        url: req.file.path, 
        user_id: user_id
    });
    await image.save()
    return res.status(200).json({msg: "image successfully saved"})
    } else {
    console.log(req.file);
    return res.status(422).json({error: "invalid format"})
    }
    } catch (error) {
    console.log("req.file.path", req.file.path)
    return res.status(500).json({error});
    }
    }

module.exports = {uploadAvatarImage, getAvatar};