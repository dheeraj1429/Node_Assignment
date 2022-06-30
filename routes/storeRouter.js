const express = require("express");
const multer = require("multer");
const router = express();
const storeControllers = require("../controllers/storeControllers");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "image" || file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            cb(null, "./uploads/images");
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage }).single("image");

router.post("/upload-book", upload, storeControllers.uploadBook);
router.post("/delete/:authorId/:id", storeControllers.deleteBook);

module.exports = router;
