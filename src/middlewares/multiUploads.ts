import multer from "multer";

//* OPTIONAL FEATURE
//* Middleware to intercept multi-form-data by writing the files to local

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads" + Date.now());
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

export const multi_upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error("Only .pdf format are allowed!");
      err.name = "ExtensionError";
      return cb(err);
    }
  },
}).fields([
  { name: "field_1", maxCount: 1 },
  { name: "field_2", maxCount: 1 },
]);

// https://stackoverflow.com/questions/36096805/uploading-multiple-files-with-multer-but-from-different-fields
// https://stackoverflow.com/questions/39350040/uploading-multiple-files-with-multer
// https://www.tutsmake.com/file-upload-in-mongodb-using-node-js/
