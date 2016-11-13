var express = require('express')
    ,app = express()
    ,path =  require('path')

app.use(express.static('./public'));
app.get('/', function(req, res) {
    res.sendfile('./public/index.html')
})

module.exports = app