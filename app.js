const express = require('express')
const app = express()
const sequelize = require('./database/db')
require('./database/asociations')
const port = process.env.PORT || 3000

app.use(express.urlencoded({extended: false}))
app.use(express.json())



app.use('/api/posts', require('./routes/posts'))
app.use('/api/users', require('./routes/users'))
app.use('/api/address', require('./routes/address'))


app.listen(port,'192.168.1.87', () => {
  console.log(`Example app listening at http://localhost:${port}`)

  sequelize.sync({force:false})
  .then(()=>{
      console.log('conectado')
  })
  .catch((e)=>{
      console.log(`Se produjo un error ${e}`)
  })
})