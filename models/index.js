const config = require("../config/db.config.js")

const Sequelize = require("sequelize")
const sequelize = new Sequelize(
	config.DB,
	config.USER,
	config.PASS,
	{
		host: config.HOST,
		dialect: config.dialect,
		operatorAliases: false,
		pool: {
			max: config.pool.max,
			min: config.pool.min,
			acquire: config.pool.acquire,
			idle: config.pool.idle
		}
	}
)

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db._data_handphone = require('./_data_handphone.model')(sequelize, Sequelize)

module.exports = db