import * as path from "node:path";
import * as crypto from "node:crypto";

import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(process.cwd(), "tmp"));
  },
  filename(req, file, cb) {
    // file.originalname = profile-pic.png
    const extname = path.extname(file.originalname); // .png
    const basename = path.basename(file.originalname, extname); // profile-pic
    const suffix = crypto.randomUUID();

    cb(null, `${basename}_${suffix}${extname}`);
  },
});

export default multer({ storage });
