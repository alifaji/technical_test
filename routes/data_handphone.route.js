const controller = require('../controllers/data_handphone.controller')
const { authJwt } = require("../middleware")

module.exports = function(app) {
	
	app.get('/input',[authJwt.verifyToken],controller.formInput)
	app.post('/api/create',controller.create)
	app.post('/api/update',controller.update)
	app.get('/output',[authJwt.verifyToken],controller.formOutput)
	app.get('/api/generateNumber',controller.generateNumber)
	app.get('/api/getId/:id',controller.getId)
	app.post('/api/delete',[authJwt.verifyToken],controller.delete)

	app.get('/',[authJwt.verifyTokenLogin])

}