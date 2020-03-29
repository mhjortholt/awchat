var Room = require('./room');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;


const app = express();


app.use(express.json());

app.post('/api/create', (req, res) => {
  	var name = req.body.name;
  	// TODO Check for existing room-names
  	var id = Room.createId(name);
  	if(!name) name = 'Chat-BAR';
  	console.log('Creating room with name: ' + name);
  	let room = {
  		id: id,
  		name: name
  	}
  	Room.addRoom(room);
  	res.status(200).json(room);
});

app.get('/api/get', (req, res) => {
	let id = req.query.id;
	console.log('Getting room with id: ' + id);
  	res.status(200).send(Room.getRoom(id));
});

app.post('/api/join', (req, res) => {
  	Room.addUser(req.body);
  	res.status(200).send();
});

app.post('/api/connect', (req, res) => {
  	Room.addConnection(req.body);
  	res.status(200).send();
});

app.get('/api/admin', (req, res) => {
  res.status(200).send(Room.getRooms());
});

app
  .use(express.static(path.join(__dirname, 'public')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


