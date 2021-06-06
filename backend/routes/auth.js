const express = require("express");
const authRouter = express.Router();
const admin = require('firebase-admin');
const { hashPassword, checkPassword } = require("../utils/password");

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

// @route    POST api/auth/sign-up
// @desc     Cria novo usuário
// @access   Public
authRouter.post("/sign-up", async (req, res) => {
  try 
  {
	  const user = req.body;

	  const doc =
	  {
		  email: user.email,
		  password: hashPassword(user.password),
		  isStudent: user.isStudent || false,
		  isProfessor: user.isProfessor || false,
	  };


	  const result = await db.collection('users').doc(user.email).set(doc);

	  res.status(200).json({ msg: "Usuário cadastrado com sucesso!" });
  } 
  catch (error) 
  {
    console.log("An error has occurred: ", error);

    res.status(500).json({ error });
  }
});

// @route    GET api/auth/sign-in
// @desc     Loga o usuário
// @access   Public
authRouter.get("/sign-in", async (req, res) => {
	try 
	{
		let response = false;

		console.log("request querystring: ", req.query);
		
		const { email, password } = req.query;

		const users = db.collection('users')

		const querySnapshot = await users.doc(email).get();

		const user = querySnapshot.data();

		if ( !user ) 
		{
			response = {
				code: 404,
				data: "Wrong user"
			}
		}
		else 
		{
			const match = await checkPassword(password, user.password);
			if ( !match ) {
				response = {
					code: 403,
					data: "Wrong password"
				}
			}
		}

		// If a known user gave correct password, let them in
		if (!response) {
			response = {
				code: 200,
				data: "Login successful"
			}
		}
		
		res.status(response.code).json({msg: response.data});

	} 
	catch (error) 
	{
		console.log(error);
		res.status(500).json({ error });
	}
  });

module.exports = authRouter;
