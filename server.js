const fs = require("fs");
const path = require("path");
const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.set("trust proxy", true);

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

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
    const url = req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;

    res.json({
        success: true,
        url: url
    });
});


app.get("/", (req, res) => {
  res.send("MORA Server is running");
});

app.listen(3000, () => {
    console.log("MORA Server running on port 3000");
});


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});
