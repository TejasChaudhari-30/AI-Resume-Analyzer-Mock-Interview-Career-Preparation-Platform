import multer from "multer";

const storage = multer.diskStorage({ //set a destination storage to store file temporary
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); //
  }
});

export const upload = multer({ storage });
