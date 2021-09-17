const Address = require('./models/Address')
const Post = require('./models/Post')
const User = require('./models/User')

User.hasOne(Address, { 
    as: "domicilio",
    foreignKey:"residenteId"
});
Address.belongsTo(User,{
    as:"residente"
});



User.hasMany(Post,{
    as: "publicaciones",
    foreignKey:"autorId"
})

Post.belongsTo(User,{
    as:"autor"
})