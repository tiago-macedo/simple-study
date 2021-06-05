const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');
const { hashPassword, checkPassword } = require("../utils/password");

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

// @route    GET api/alarms/<id-user>
// @desc     Retorna dados dos alarmes de um usuário
// @access   Public
router.get("/alarms/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
