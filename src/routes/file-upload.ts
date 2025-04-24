import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import protectRoute from "../middleware/auth";
import { uploadTranImg } from "../controllers/file-upload.controller";
import multer from 'multer';

const router = Router();
const upload = multer({
    dest: 'uploads/', // Temporary storage
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files are allowed!'));
      }
      cb(null, true);
    },
  });

router.post("/uploadTranImg", protectRoute(), upload.single('image'), uploadTranImg);

export default router;
