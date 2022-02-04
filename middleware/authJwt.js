const jwt = require("jsonwebtoken")
const config = require("../config/auth.config")

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

verifyToken = (req, res, next) => {
	let response = { message: "No Token Provided!", code: 403, status: false, data: {} }
	let token = localStorage.getItem('token')
	
	if (!token) {
		// return res.status(403).send(response)
		return 	res.redirect('/')
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			response.message = "Error token format"
			response.code = 401

			return 	res.redirect('/')
		}

		req.userId = decoded.id
		
		next()
	})
}

verifyTokenLogin = (req, res, next) => {
	let response = { message: "No Token Provided!", code: 403, status: false, data: {} }
	let token = localStorage.getItem('token')
	
	if (!token) {
		// return res.status(403).send(response)
		return 	res.render('../form/login.ejs')
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			response.message = "Error token format"
			response.code = 401

			return 	res.render('../form/login.ejs')
		}

		res.redirect('/input')
	})
}

const authJwt = {
	verifyToken,
	verifyTokenLogin
}

module.exports = authJwt