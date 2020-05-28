const raid_bosses = require('../../data/raid-bosses.json')

module.exports = (req, res) => {
	res.json(raid_bosses)
}
