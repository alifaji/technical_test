module.exports = {
	HOST: "localhost",
	USER: "alif",
	PASS: "password",
	DB: "technical_test",
	dialect: "postgres",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
}