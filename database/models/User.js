const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db')

class User extends Model { }

User.init({
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notNull:{
        msg:"El campo no puede ser nulo"
      },
      isAlpha:{
        args:true,
        msg:"Solo se aceptan letras"
      },
      len:{
        args:[5,100],
        msg:"El nombre debe tener al menos 3 y 100 caracteres"
      }
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      isEmail:{
        args:true,
        msg:"No tiene el formato de email"
      }
    }
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate:{
      isNumeric:{
        args:true,
        msg:"La edad debe tener solo números"
      },
      min: {
        args: 1,
        msg:"No puede tener menos de 1 año"
      },
      max:{
        args: 100,
        msg:"No puede tener más de 100 años"
      }
    }
  },
  role:{
    type:DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate:{
      isNumeric:{
        args:true,
        msg:"Los roles solo son números"
      }
    }
  }
}, {
  sequelize,
  modelName: 'User',
  timestamps: false
});

module.exports = User;