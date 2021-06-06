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
	 *  	email: <user-email>
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

// @route    POST api/alarms/
// @desc     Cria novo alarme.
// @access   Public
alarmsRouter.post("/", async (req, res) => {
	/*
	 * Expects:
	 * {
	 *  	email: <user-email>,
	 *  	token: <access-token>,
	 *  	alarm: {
	 * 			name: <alarm-name>,
	 * 			when: <alarm-date-and-time>
	 * 		}
	 * }
	 * 
	 */
	try {
		let response = null;
		const {email, token, alarm} = req.body;
		const alarms = db.collection('alarms');

		// TODO: check token

		// Add the alarm
		const new_alarm = await alarms.add({
			email: email,
			name: alarm.name,
			time: alarm.when,
		});
		const new_alarm_data = (await new_alarm.get()).data()

		if (!response) {
			response = {
				status: 200,
				data: new_alarm_data
			}
		}

		res.status(response.status).json(response.data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
});

module.exports = alarmsRouter;
