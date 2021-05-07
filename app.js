const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('server success')
})

app.listen(3000, () => {
  console.log('server is running on https://localhost:3000')
})