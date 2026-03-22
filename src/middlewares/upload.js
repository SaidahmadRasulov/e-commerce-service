import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import multer from "multer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Loyiha ildizi (`backend/`) dagi `uploads` — `cwd` dan mustaqil */
export const uploadsDir = path.join(__dirname, "..", "..", "uploads");

fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + ext;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Only images allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
});
