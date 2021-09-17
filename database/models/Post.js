const { Model,DataTypes} = require('sequelize')
const sequelize = require ('../db')

class Post extends Model{}
    
Post.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                notEmpty: true,
                min: 5,
                max: 30
            }
        },
        content: DataTypes.TEXT
},{
    sequelize,
    modelName:"posts",
    timestamps: false
});

module.exports = Post
