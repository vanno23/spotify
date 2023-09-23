const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  changeUserData,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.put("/changeUserData", changeUserData);

module.exports = router;
