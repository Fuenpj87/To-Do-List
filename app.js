const express = require('express')
const redis = require("redis")
const bodyParser = require('body-parser')

const app = express()
const path = require("path");
const client = redis.createClient()
app.use(bodyParser.urlencoded({extended: true}))

function saveItemToRedis(res, req){
    client.rpush("things_to_do", req.body.message, redis.print)
    req.redirect('/')     
}
function getItemsFromList(res){
    client.lrange('things_to_do', 0, -1, function (error, items) {
        res.send(items)
      })
} 


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'))
})
app.post('/add_item_to_list', (req, res) => saveItemToRedis(res, req))
app.get('/get_items_in_list', (req, res) => getItemsFromList(res))

app.listen(3000, () => console.log('Example app listening on port 3000!'))



