const { response } = require("express");
const express = require("express");
const classesRouter = express.Router();
const admin = require('firebase-admin');
const { hashPassword, checkPassword } = require("../utils/password");

const db = admin.firestore();

// @route    GET api/classes/
// @desc     Retorna array de códigos de matérias que já foram cursadas pelo aluno
// @access   Public
classesRouter.get("/", async (req, res) => {
	try {
		const email = req.query.email;
		const users = db.collection('users');
		const data = { classes: [] };

		// Find user's classes
		const user = (await users.doc(email).get()).data();
		user.classes.forEach((c) => {
			data.classes.push(c);
		});

		res.status(200).json(data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

// @route    POST api/classes/
// @desc     Adiciona matéria à lista de matérias completadas pelo usuário.
// @access   Public
classesRouter.post("/", async (req, res) => {
	/*
	 * Expects:
	 * {
	 *  	email: <user-email>,
	 *  	class_code: <class-code>
	 * }
	 * 
	 */
	try {
		let response = null;
		const {email, class_code} = req.body;
		const userRef = db.collection('users').doc(email);
		const user = await userRef.get();

		if (!user.exists) {
			res.status(404).json(
				{ "msg": "User not found." }
			)
			return
		}

		// Get current classes list
		let list = user.data().classes;
		// If class list doesn't exist, create it
		if (!list) {
			list = [];
		}
		// Append new class code
		list.push(class_code);

		const result = await userRef.set({
			classes: list
		});

		if (!response) {
			response = {
				status: 200,
				data: result
			}
		}

		res.status(response.status).json(response.data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

module.exports = classesRouter;
