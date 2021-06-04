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
	* 	username: <username>
	* 	password: <password>
	* }
	*
	*/
	try {
		console.log("I have recieved a user, trying to enter.")
		console.log(req.body)
		const username = req.body.username;
		const password = req.body.password;
		const users = db.collection("users");
		var response = null;

		users.where("email", "==", username)
			.get()
			.then(querySnapshot => {
				user = querySnapshot[0];
				if ( !user ) {
					response = {
						code: 200,
						data: "Wrong password"
					}
				}
				else if ( !checkpassword(password, user.password) ) {
					response = {
						code: 200,
						data: "Wrong password"
					}
				}
			});
		

		// If a known user gave correct password, let them in
		if (!response) {
			response = {
				data: 123456789
			}
			res.status(200).json({ data: response.data });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
  });

module.exports = router;
