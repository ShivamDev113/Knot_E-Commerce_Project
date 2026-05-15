const multer=require('multer')

const storage=multer.diskStorage({
    filename:function(req,file,callback) {
        callback(null,file.originalname)
    }
})

const upload = multer({storage})

module.exports=upload   


/* Multer is a Node.js middleware that we use for handling file uploads in Express applications.
By default, Express can’t handle multipart/form-data — which is the format browsers use when uploading files. Multer parses this incoming file data, stores it temporarily or permanently (depending on our setup), and makes the uploaded files easily accessible inside req.file or req.files*/