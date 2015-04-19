var Promise = require('bluebird')
var request = require('request-json')
var client = request.createClient('http://localhost:8080');

module.exports = {
	createUser: function (name) {
		return new Promise(function (resolve, reject) {
			client.put('/users', {
				username: name
			}, function (err, response, body) {
				resolve(body.uri)
			});
		});
	},
	loginUser: function(id) {
		return new Promise(function (resolve, reject) {
			client.post('/users/' + id + '/login', null, function (err, response, body) {
				resolve(body.userToken)
			});
		})
	},
	createGame: function(name, userToken) {
		return new Promise(function (resolve, reject) {
			client.post('/games', {
				name: name,
				userToken: userToken
			}, function (err, response, body) {
				resolve(body.id)
			});
		});
	},
	joinGame: function(id, userToken) {
		return new Promise(function (resolve, reject) {
			client.post('/games/' + id + '/join', {
				userToken: userToken
			}, function (err, response, body) {
				resolve(true)
			});
		});
	},
	startGame: function(id, userToken) {
		return new Promise(function (resolve, reject) {
			client.post('/games/' + id + '/start', {
				userToken: userToken
			}, function (err, response, body) {
				resolve(body)
			});
		});
	}
}