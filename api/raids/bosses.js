const raid_bosses = require('../../public/raid-bosses.json')

module.exports = (req, res) => {
	res.json(raid_bosses)
}
