const express = require("express");
const router = express.Router();

// @route    POST api/auth/sign-up
// @desc     Cria novo usuário
// @access   Public
router.post("/sign-up", async (req, res) => {
  try {
    const user = req.body;
    res.status(response.status).json({ data: response.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
