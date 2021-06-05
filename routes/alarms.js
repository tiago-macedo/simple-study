const { response } = require("express");
const express = require("express");
const alarmsRouter = express.Router();
const admin = require('firebase-admin');
const { hashPassword, checkPassword } = require("../utils/password");

const db = admin.firestore();

// @route    GET api/alarms/
// @desc     Retorna dados dos alarmes de um usuário
// @access   Public
alarmsRouter.get("/", async (req, res) => {
	/*
	 * Expects:
	 * {
	 *   email: <user-email>
	 * }
	 * 
	 */
	try {
		const email = req.body.email;
		const alarms = db.collection('alarms');
		const data = { alarms: [] };

		// Find user's alarms
		const my_alarms = await alarms.where('email', '==', email).get();
		my_alarms.forEach((alarm) => {
			data.alarms.push(alarm.data());
		});

		res.status(200).json(data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

module.exports = alarmsRouter;
