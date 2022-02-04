module.exports = (sequelize, Sequelize) => {
	const _data_handphone = sequelize.define("_data_handphone", {

        id:{
            type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
        },
        email:{
        	type: Sequelize.TEXT,
			defaultValue: null,
			allowNull: true
        },
        provider: {
        	type: Sequelize.TEXT,
        	defaultValue: null,
        	allowNull:null
        },
        phone_number: {
        	type: Sequelize.TEXT,
        	defaultValue:null,
        	allowNull:null
        },
        status: {
        	type: Sequelize.STRING,
        	defaultValue:null, 
        	allowNull:null
        },

    })
    
    return _data_handphone;
}