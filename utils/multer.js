const multer = require('multer');

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        
        // The function should call `cb` with a boolean
        // to indicate if the file should be accepted

        if (!file.mimetype.match(/jpe||jpeg||png||gif$i/)) {
            return cb(new Error('File is not supported'), false);
        }
       
        // To accept the file pass `true`, like so:
        cb(null, true)

   
    }
});

