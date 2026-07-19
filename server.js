const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {
    const url = "http://192.168.31.177:3000/uploads/" + req.file.filename;

    res.json({
        success: true,
        url: url
    });
});

app.listen(3000, () => {
    console.log("MORA Server running on port 3000");
});
