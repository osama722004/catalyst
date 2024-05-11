const express = require("express");
const router = express.Router();
const usersController = require("../controller/auth-controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  validateUser,
  handleValidationErrors,
} = require("../middleware/userValidationSchema");

router
  .route("/register")
  .post(validateUser, handleValidationErrors, usersController.register);
router.route("/login").post(usersController.login);
// router.route('/logout')
//             .get(usersController.logout)
router
  .route("/profile")
  .post(upload.single("file"), usersController.uploadProfileImage);

module.exports = router;
