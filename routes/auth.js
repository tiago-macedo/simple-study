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
router.get("/sign-in", async (req, res) => {
	/*
	* Expects:
	* {
	* 	email: <username>
	* 	password: <password>
	* }
	*
	*/
	try {
		console.log("I have recieved a user, trying to enter.")
		console.log(req.body)
		const email = req.body.email;
		const password = req.body.password;
		const users = db.collection("users");
		var response = null;

		const querySnapshot = await users.where("email", "==", email).get()
		console.log("the snapshot is:")
		console.log(querySnapshot)
		const user = querySnapshot[0];
		console.log("the user is:")
		console.log(user)
		if ( !user ) {
			console.log("no user")
			response = {
				code: 200,
				data: "Wrong user"
			}
		}
		else if ( !checkpassword(password, user.password) ) {
			console.log("bad pass")
			response = {
				code: 200,
				data: "Wrong password"
			}
		}
		

		// If a known user gave correct password, let them in
		if (!response) {
			response = {
				code: 200,
				data: "😎 I'm in."
			}
		}

		// Send the response
		res.status(response.code).json({ data: response.data });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
  });

module.exports = router;
