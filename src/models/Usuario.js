const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('usuario', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        hashPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: { 
            type: DataTypes.STRING,
            defaultValue: "User",
        },
        imgUrl:{
            type: DataTypes.TEXT,
            defaultValue: "https://wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg",
        },
    },
        {
            paranoid: true,
        }
    )
}
