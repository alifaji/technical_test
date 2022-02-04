const db = require('../models')
const _data_handphone = db._data_handphone
const ejs = require('ejs')
const { encrypt, decrypt } = require('../middleware/crpyto');

exports.formInput = (req, res) => {

	res.render('../form/input.ejs')

}

exports.formOutput = async (req, res) => {

	let data_genap = await _data_handphone.findAll({
		where: {
			status: 'genap'
		}
	})

	await data_genap.forEach((val, item) => {
		data_genap[item].dataValues.phone_number = decrypt(JSON.parse(data_genap[item].dataValues.phone_number))
	})

	let data_ganjil = await _data_handphone.findAll({
		where: {
			status: 'ganjil'
		}
	})

	await data_ganjil.forEach((val, item) => {
		data_ganjil[item].dataValues.phone_number = decrypt(JSON.parse(data_ganjil[item].dataValues.phone_number))
	})

	res.render('../form/output.ejs',{data_ganjil:data_ganjil,data_genap:data_genap})

}

exports.generateNumber = (req, res) => {

	let response = { code: 200, message: 'Success generate number', phone_number:0, provider:'', status: true}

	response.phone_number = Math.floor(Math.random() * 1000000000)

	let provider = ['xl','telkomsel','im3','tri']

	response.provider = provider[Math.floor(Math.random()*provider.length)];

	res.status(200).send(response)

}

exports.create = (req, res) => {
	let response = { code: 500, message: 'Internal server error!', data: {}, status: false }
	

	let param = {
		provider: JSON.stringify(encrypt(req.body.provider)),
		phone_number: JSON.stringify(encrypt(req.body.no_handphone))
	}

	if(parseInt(req.body.no_handphone) % 2 == 0) {
		param.status = "genap"
	} else{
		param.status = "ganjil"
	}

	_data_handphone.create(param).then(result => {
		if(result == null) {
			return res.status(500).send(response)
		}

		response.data.id = result.id
		response.data.provider = req.body.provider
		response.data.phone_number = req.body.no_handphone
		response.data.status = param.status

		response.message = "Add data success"
		response.code = 200
		response.status = true,

		res.status(200).send(response)
	})
}

exports.getId = (req, res) => {
	let response = { code: 404, message: 'Data not found!', data: [], status: false }

	_data_handphone.findOne({
		where: {
			id: req.params.id
		}
	}).then(result => {
		if(result == null) {
			return res.status(404).send(response)
		}

		result.dataValues.phone_number = decrypt(JSON.parse(result.dataValues.phone_number))
		result.dataValues.provider = decrypt(JSON.parse(result.dataValues.provider))

		response.message = "ok"
		response.code = 200
		response.status = true
		response.data = result

		res.status(200).send(response)
	})
}

exports.update = (req, res) => {

	let response = { code: 500, message: 'Internal server error!', data: {}, status: false }

	let param = {
		phone_number: JSON.stringify(encrypt(req.body.no_handphone))
	}

	if(parseInt(req.body.no_handphone) % 2 == 0) {
		param.status = "genap"
	} else{
		param.status = "ganjil"
	}

	_data_handphone.update(param,{
		where: {
			id: req.body.id
		}
	}).then(result => {
		if(result == null) {
			return res.status(500).send(response)
		}

		response.data.phone_number = req.body.no_handphone
		response.data.status = param.status
		response.data.id = req.body.id
		response.message = "Update data success"
		response.code = 200
		response.status = true,

		res.status(200).send(response)
	})
}

exports.delete = (req, res) => {
	let response = { code: 500, message: 'Internal server error!', data: {}, status: false }

	_data_handphone.destroy({
		where: {
			id: req.body.id
		}
	}).then(result => {
		if(result == null){
			return res.status(500).send(response)
		}

		response.data.id = req.body.id
		response.message = "Delete Success"
		response.code = 200
		response.status = true

		res.status(200).send(response)
	})
}