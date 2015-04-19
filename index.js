var requests = require('./requests');
var randomstring = require('randomstring');

var data = {}

requests.createUser(randomstring.generate(8))
.then(function (uri) {
	data.user1 = uri;
	return requests.createUser(randomstring.generate(8))
})
.then(function (uri) {
	data.user2 = uri;
	console.log('Created player ' + data.user1 + ' and ' + data.user2 + '.')
	return requests.loginUser(data.user1)
})
.then(function (userToken) {
	data.token1 = userToken;
	return requests.loginUser(data.user2);
})
.then(function (userToken) {
	data.token2 = userToken;
	console.log('Logged in player ' + data.user1 + ' (' + data.token1 + ') and ' + data.user2 + ' (' + data.token2 + ')');
	return requests.createGame(randomstring.generate(8), data.token1);
})
.then(function (gameUri) {
	data.gameUri = gameUri
	console.log('Created game ' + data.gameUri + ' by player ' + data.user1);
	return requests.joinGame(data.gameUri, data.token2);
})
.then(function () {
	console.log('Player ' + data.user2 + ' joined game ' + data.gameUri)
	return requests.startGame(data.gameUri, data.token1);
})
.then(function (game) {
	console.log('Printing game DTO...')
	console.dir(game, {
		depth: 10
	})
})