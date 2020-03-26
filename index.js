const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000



var db = [];


const app = express();
// get all todos
app.get('/api/get', (req, res) => {
  res.status(200).send(db)
});



app.use(express.json())
app.post(
  '/api/addme',
  (req, res) => {
  	db.push(req.body)
  	res.json(req.body)
  }
)



app
  .use(express.static(path.join(__dirname, 'public')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


