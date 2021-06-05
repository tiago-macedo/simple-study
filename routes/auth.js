const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');
const { hashPassword, checkPassword } = require("../utils/password");

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

// @route    POST api/auth/sign-up
// @desc     Cria novo usuário
// @access   Public
router.post("/sign-up", async (req, res) => {
  try {
    const user = req.body;
    await db.collection('users').doc(user.email).set({
      email: user.email,
      password: hashPassword(user.password),
      isStudent: user.isStudent || false,
      isProfessor: user.isProfessor || false,
    });
    res.status(200).json({ msg: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// @route    POST api/auth/sign-in
// @desc     Loga o usuário
// @access   Public
router.post("/sign-in", async (req, res) => {
	/*
	* Expects:
	* {
	* 	email: <username>
	* 	password: <password>
	* }
	*
	*/
	try {
		const {email, password} = req.body;

		const querySnapshot = await await users.doc(email).get();
		const user = querySnapshot.data();
		if ( !user ) {
			response = {
				code: 200,
				data: "Wrong user"
			}
		}
		else {
			const match = await checkPassword(password, user.password);
			if ( !match ) {
				response = {
					code: 200,
					data: "Wrong password"
				}
			}
		}

		// If a known user gave correct password, let them in
		if (!response) {
			response = {
				code: 200,
				data: "😎 I'm in."
			}
		}

    if(!checkPassword(password, user.password)) {
      return res.status(401).json({msg: "Wrong password"})
    }
		
    res.status(200).json({msg: "Login successful"});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
  });

module.exports = router;
