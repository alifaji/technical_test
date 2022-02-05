const controller = require('../controllers/data_handphone.controller')
const { authJwt } = require("../middleware")

module.exports = function(app) {
	
	app.get('/input',[authJwt.verifyToken],controller.formInput)
	app.post('/api/create',[authJwt.verifyToken],controller.create)
	app.post('/api/update',[authJwt.verifyToken],controller.update)
	app.get('/output',[authJwt.verifyToken],controller.formOutput)
	app.get('/api/generateNumber',[authJwt.verifyToken],controller.generateNumber)
	app.get('/api/getId/:id',[authJwt.verifyToken],controller.getId)
	app.post('/api/delete',[authJwt.verifyToken],controller.delete)

	app.get('/',[authJwt.verifyTokenLogin])

}