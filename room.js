let alphabet = 'abcdefghijklmnopqrstuvwxyz';


function randLetter() {
	let r = Math.floor(Math.random() * alphabet.length);
	return alphabet.substring(r, r+1);
}

var rooms = {};

module.exports = {

	addConnection: function(connection) {
		var room = rooms[connection.room];
		if(room) {
			for(var i = 0; i < room.connections.length; i++) {
				if(room.connections[i].sender_id === connection.sender_id &&
					room.connections[i].reciever_id === connection.reciever_id) {
					room.connections[i] = connection;
					return;
				}
			}
			room.connections.push(connection);
		}
	},

	addRoom: function(room) {
		room.users = [];
		room.connections = [];
		rooms[room.id] = room;
		console.log('Added room: ' + room.name + ', ' + room.id);
	},

	addUser: function(obj) {
		var room = rooms[obj.room];
		if(room) {
			for(var i = 0; i < room.users.length; i++) {
				if(room.users[i].id === obj.id) {
					return;
				}
			}
			room.users.push({ id: obj.id});
		}
	},

	createId: function (name) {
		var id = '';
		if(!name) {
			for(var i = 0; i < 9; i++) {
				id += randLetter();
			}
			id = id.substring(0,3) + '-' + id.substring(3,6) + '-' + id.substring(6,9);
		} else {
			id = name.toLowerCase().split(' ').join('-');
			id = id.replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o');
		}
		console.log('Generated id: ' + id);
		return id;
	},

	exists: function(id) {
		return !!rooms[id];
	},

	getRoom: function(id) {
		return rooms[id];
	},

	getRooms: function() {
		return rooms;
	}

};