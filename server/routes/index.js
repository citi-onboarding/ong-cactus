const cors = require('cors');
const path = require('path');

const apiTicket = require('../views/Ticket');

exports = module.exports = function (app) {
	app.use(cors())

	app.get('/', function (req, res) {
		res.sendFile.join(__dirname, '../public/index.html')
	})


	app.get('/api/ticket', apiTicket.getTicket)
	app.get('*', (req, res) => {
		res.redirect('/');
    });
}