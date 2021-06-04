const express = require("express");
const router = express.Router();
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
const firebase_credentials = require("../.firebase_credentials")

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
	apiKey: firebase_credentials.private_key,
	authDomain: firebase_credentials.auth_uri,
	projectId: firebase_credentials.project_id
});

var db = firebase.firestore();  

const db = firebase

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
		const username = req.body.username;
		const password = req.body.password;
		// Find user in DB
		user_is_known = false
		db.collection("users").get().then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				if (doc.user === username || doc.email === username) {
					user_is_known = true;
				}
			});
		});
		if (!user_is_known) {
			response = {
				code = 200,
				data = "Unknown username or email"
			}
		}
		
		// check password

		// temp
		stored_password = "yeah yeah";

		if (password !== stored_password) {
			response = {
				code = 200,
				data = "Wrong password"
			}
		}

		// User gave correct password, let them in
		response = {
			data: 123456789
		}
		res.status(200).json({ data: response.data });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
  });

module.exports = router;
